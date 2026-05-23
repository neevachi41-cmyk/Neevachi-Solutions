export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  isCustomProduct?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: 33 },
  { id: 'custom', name: 'Custom Products', count: 1 },
  { id: 'iot-devices', name: 'IoT Devices', count: 8 },
  { id: 'sensors', name: 'Sensors', count: 6 },
  { id: 'smart-home', name: 'Smart Home', count: 6 },
  { id: 'diy-kits', name: 'DIY Kits', count: 5 },
  { id: 'wearables', name: 'Wearables', count: 4 },
  { id: 'industrial-iot', name: 'Industrial IoT', count: 3 },
];

// Replace with actual image URLs in production
const IMAGE_BASE = 'https://images.unsplash.com/photo';

export const products: Product[] = [
  // Custom Product
  {
    id: 'custom-1',
    name: 'Custom IoT Solution',
    price: 0, // Will be calculated based on requirements
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    category: 'custom',
    rating: 4.9,
    reviewCount: 0,
    inStock: true,
    isNew: true,
    isCustomProduct: true
  },
  
  // IoT Devices
  {
    id: 'iot-1',
    name: 'Raspberry Pi 4 Model B',
    price: 75.99,
    image: `${IMAGE_BASE}-1591486246546-070d6d74acee?w=600&q=80`,
    category: 'iot-devices',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    isNew: true
  },
  {
    id: 'iot-2',
    name: 'Arduino Starter Kit',
    price: 89.99,
    image: `${IMAGE_BASE}-1559817663-8fba5d4b8ace?w=600&q=80`,
    category: 'iot-devices',
    rating: 4.7,
    reviewCount: 189,
    inStock: true
  },
  
  // Sensors
  {
    id: 'sensor-1',
    name: 'DHT22 Temperature & Humidity Sensor',
    price: 9.99,
    image: `${IMAGE_BASE}-1581091225374-7a1bcdb1c931?w=600&q=80`,
    category: 'sensors',
    rating: 4.5,
    reviewCount: 132,
    inStock: true
  },
  {
    id: 'sensor-2',
    name: 'PIR Motion Sensor',
    price: 5.99,
    image: `${IMAGE_BASE}-1581091225374-7a1bcdb1c931?w=600&q=80`,
    category: 'sensors',
    rating: 4.3,
    reviewCount: 98,
    inStock: true,
    isOnSale: true
  },
  
  // Smart Home
  {
    id: 'smart-1',
    name: 'Smart LED Bulb RGB',
    price: 24.99,
    originalPrice: 34.99,
    image: `${IMAGE_BASE}-1512917774080-9991f1c4c750?w=600&q=80`,
    category: 'smart-home',
    rating: 4.6,
    reviewCount: 210,
    inStock: true,
    isOnSale: true
  },
  {
    id: 'smart-2',
    name: 'Smart Plug WiFi Outlet',
    price: 19.99,
    image: `${IMAGE_BASE}-1540932239986-301d343c7974?w=600&q=80`,
    category: 'smart-home',
    rating: 4.4,
    reviewCount: 156,
    inStock: true
  },
  
  // DIY Kits
  {
    id: 'diy-1',
    name: 'Home Automation Starter Kit',
    price: 149.99,
    image: `${IMAGE_BASE}-1551434678-e076c223a692?w=600&q=80`,
    category: 'diy-kits',
    rating: 4.7,
    reviewCount: 87,
    inStock: true,
    isNew: true
  },
  {
    id: 'diy-2',
    name: 'Weather Station Kit',
    price: 79.99,
    image: `${IMAGE_BASE}-1493314892510-3f971a206f5c?w=600&q=80`,
    category: 'diy-kits',
    rating: 4.5,
    reviewCount: 64,
    inStock: true
  },
  
  // Wearables
  {
    id: 'wear-1',
    name: 'Smart Watch Pro',
    price: 199.99,
    originalPrice: 249.99,
    image: `${IMAGE_BASE}-1523275336334-6c7ffeef1629?w=600&q=80`,
    category: 'wearables',
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    isOnSale: true
  },
  
  // Industrial IoT
  {
    id: 'iiot-1',
    name: 'Industrial Sensor Node',
    price: 349.99,
    image: `${IMAGE_BASE}-1551288049-bebda4e38cd6?w=600&q=80`,
    category: 'industrial-iot',
    rating: 4.9,
    reviewCount: 42,
    inStock: true
  }
];
