
import { Offer, PlatformSettings } from './types';

export const DEFAULT_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'ساعة ذكية Ultra 2',
    description: 'أفضل عرض على الساعة الذكية الأكثر طلباً بخصم 30%.',
    imageUrl: 'https://picsum.photos/seed/watch/400/300',
    affiliateUrl: 'https://example.com/aff1',
    category: 'إلكترونيات',
    price: '299 ريال'
  },
  {
    id: '2',
    title: 'سماعات AirPods Pro',
    description: 'جودة صوت استثنائية مع خاصية عزل الضجيج.',
    imageUrl: 'https://picsum.photos/seed/audio/400/300',
    affiliateUrl: 'https://example.com/aff2',
    category: 'إكسسوارات',
    price: '850 ريال'
  },
  {
    id: '3',
    title: 'كاميرا احترافية DSLR',
    description: 'وثق أجمل لحظاتك بأعلى جودة ممكنة مع عدسة إضافية.',
    imageUrl: 'https://picsum.photos/seed/camera/400/300',
    affiliateUrl: 'https://example.com/aff3',
    category: 'تصوير',
    price: '4500 ريال'
  }
];

export const INITIAL_SETTINGS: PlatformSettings = {
  adminPassword: 'admin123',
  siteName: 'AffiliateHub',
  ads: {
    headCode: '',
    bodyTopCode: '',
    footerCode: '',
    enabled: true
  }
};
