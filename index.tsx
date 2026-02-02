
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Application State
let currentImageBase64: string | null = null;
let selectedStyle: string = '3d-cartoon';
let isProcessing: boolean = false;

// Style Presets
const STYLES = [
    { id: '3d-cartoon', name: '3D كرتون', prompt: 'Convert this image into a 3D Pixar/Disney animation style. Cute, high quality render, 8k resolution.' },
    { id: 'anime', name: 'أنمي ياباني', prompt: 'Transform this image into a high-quality Japanese Anime style. Vibrant colors, clean lines, Studio Ghibli inspired.' },
    { id: 'cyberpunk', name: 'سايبر بانك', prompt: 'Redraw this in a Cyberpunk 2077 style. Neon lights, futuristic city atmosphere, high contrast, sci-fi aesthetic.' },
    { id: 'oil-painting', name: 'لوحة زيتية', prompt: 'Convert this photo into a classic Oil Painting. Visible brush strokes, artistic texture, Van Gogh style.' },
    { id: 'sketch', name: 'رسم قلم رصاص', prompt: 'Turn this into a detailed pencil sketch. Black and white, artistic shading, hand-drawn look.' },
    { id: 'gta', name: 'GTA Style', prompt: 'Transform this into a Grand Theft Auto (GTA) loading screen art style. Vectorized look, bold outlines, saturated colors.' },
];

// Helper: File to Base64 (Standard Format)
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

// UI Rendering Functions
const renderStyles = () => {
    const grid = document.getElementById('style-grid');
    if (!grid) return;

    grid.innerHTML = STYLES.map(style => `
        <div onclick="window.selectStyle('${style.id}')" 
             class="style-card cursor-pointer border-2 border-transparent bg-gray-50 dark:bg-white/5 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all ${selectedStyle === style.id ? 'selected ring-2 ring-violet-500' : ''}">
            <div class="font-bold text-sm text-center">${style.name}</div>
        </div>
    `).join('');
};

const updateUIState = () => {
    const btn = document.getElementById('generate-btn') as HTMLButtonElement;
    const loading = document.getElementById('result-loading');
    const empty = document.getElementById('result-empty');
    const resultImg = document.getElementById('generated-image');
    const actions = document.getElementById('action-buttons');
    
    // Toggle Loading
    if (isProcessing) {
        loading?.classList.remove('hidden');
        btn.disabled = true;
        btn.innerHTML = `<span class="animate-pulse">جاري التحويل...</span>`;
    } else {
        loading?.classList.add('hidden');
        btn.disabled = !currentImageBase64;
        btn.innerHTML = `
            <span class="flex items-center justify-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                تحويل الصورة الآن
            </span>`;
    }

    // Toggle Result Visibility
    if (!isProcessing && resultImg && (resultImg as HTMLImageElement).src && (resultImg as HTMLImageElement).src !== window.location.href) {
        empty?.classList.add('hidden');
        resultImg.classList.remove('hidden');
        actions?.classList.remove('hidden');
        actions?.classList.add('grid');
    } else if (!isProcessing) {
        empty?.classList.remove('hidden');
        resultImg?.classList.add('hidden');
        actions?.classList.add('hidden');
        actions?.classList.remove('grid');
    }
};

// Event Handlers
const handleImageUpload = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        try {
            const base64 = await fileToBase64(file);
            currentImageBase64 = base64;
            
            // Show Preview
            const preview = document.getElementById('image-preview') as HTMLImageElement;
            const placeholder = document.getElementById('upload-placeholder');
            const container = document.getElementById('preview-container');
            
            preview.src = base64;
            placeholder?.classList.add('hidden');
            container?.classList.remove('hidden');
            
            updateUIState();
        } catch (e) {
            alert("حدث خطأ أثناء رفع الصورة");
        }
    }
};

const removeImage = () => {
    currentImageBase64 = null;
    (document.getElementById('image-upload') as HTMLInputElement).value = '';
    document.getElementById('upload-placeholder')?.classList.remove('hidden');
    document.getElementById('preview-container')?.classList.add('hidden');
    updateUIState();
};

const selectStyle = (id: string) => {
    selectedStyle = id;
    renderStyles();
};

const generateImage = async () => {
    if (!currentImageBase64) return alert("الرجاء رفع صورة أولاً");

    isProcessing = true;
    updateUIState();

    const styleObj = STYLES.find(s => s.id === selectedStyle);
    const userPrompt = (document.getElementById('custom-prompt') as HTMLInputElement).value;
    
    // Construct Prompt
    const finalPrompt = `${styleObj?.prompt || ''} ${userPrompt}. Maintain the original composition and subject, just change the artistic style.`;

    try {
        // Clean base64 string for API (remove data:image/xxx;base64, prefix)
        const base64Data = currentImageBase64.split(',')[1];
        const mimeType = currentImageBase64.substring(currentImageBase64.indexOf(':') + 1, currentImageBase64.indexOf(';'));

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    { 
                        inlineData: { 
                            mimeType: mimeType, 
                            data: base64Data 
                        } 
                    },
                    { 
                        text: finalPrompt 
                    }
                ]
            }
        });

        // Extract Image from Response
        let generatedBase64 = null;
        
        if (response.candidates && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    generatedBase64 = part.inlineData.data;
                    break;
                }
            }
        }

        if (generatedBase64) {
            const finalImageSrc = `data:image/png;base64,${generatedBase64}`;
            const resultImg = document.getElementById('generated-image') as HTMLImageElement;
            const downloadBtn = document.getElementById('download-btn') as HTMLAnchorElement;
            
            resultImg.src = finalImageSrc;
            downloadBtn.href = finalImageSrc;
        } else {
            console.error("No image in response", response);
            alert("لم يتمكن الذكاء الاصطناعي من توليد صورة. قد يكون السبب المحتوى أو ضغط الخادم.");
        }

    } catch (error) {
        console.error("AI Error:", error);
        alert("حدث خطأ أثناء المعالجة. يرجى المحاولة مرة أخرى.");
    } finally {
        isProcessing = false;
        updateUIState();
    }
};

// Global Exposure
Object.assign(window as any, {
    handleImageUpload,
    removeImage,
    selectStyle,
    generateImage
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderStyles();
    document.getElementById('image-upload')?.addEventListener('change', handleImageUpload);
    document.getElementById('remove-image')?.addEventListener('click', removeImage);
    document.getElementById('generate-btn')?.addEventListener('click', generateImage);
});
