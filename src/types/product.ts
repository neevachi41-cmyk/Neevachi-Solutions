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
  image: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All Products', count: 39, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', description: 'Browse all our products' },
  { id: 'pcb', name: 'PCB Boards', count: 4, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80', description: 'Printed circuit boards and prototyping' },
  { id: 'microcontrollers', name: 'Microcontrollers', count: 5, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', description: 'Arduino, ESP32, Raspberry Pi and more' },
  { id: 'sensors', name: 'Sensors', count: 4, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80', description: 'Temperature, motion, and environmental sensors' },
  { id: 'communication', name: 'Communication', count: 3, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', description: 'WiFi, Bluetooth, and wireless modules' },
  { id: 'power', name: 'Power Management', count: 3, image: 'https://images.unsplash.com/photo-1616574859793-894a59a3d9c2?w=400&q=80', description: 'Batteries, chargers, and power supplies' },
  { id: 'components', name: 'Components', count: 4, image: 'https://images.unsplash.com/photo-1565439396361-3698684ae5c2?w=400&q=80', description: 'Resistors, capacitors, ICs and more' },
  { id: 'connectors', name: 'Connectors', count: 3, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80', description: 'Wires, cables, and connectors' },
  { id: 'tools', name: 'Tools', count: 3, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80', description: 'Soldering, testing, and assembly tools' },
  { id: 'displays', name: 'Displays', count: 2, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80', description: 'LCDs, OLEDs, and touch screens' },
  { id: 'enclosures', name: 'Enclosures', count: 2, image: 'https://images.unsplash.com/photo-1565439396361-3698684ae5c2?w=400&q=80', description: 'Cases and project boxes' },
  { id: 'iot-kits', name: 'IoT Kits', count: 3, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80', description: 'Complete IoT project kits' },
  { id: 'development', name: 'Development Boards', count: 3, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80', description: 'Development and breakout boards' },
];

// Replace with actual image URLs in production
const IMAGE_BASE = 'https://images.unsplash.com/photo';

export const products: Product[] = [
  // Custom Product
  {
    id: 'custom-1',
    name: 'Custom PCB Design',
    price: 0,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    category: 'all',
    rating: 4.9,
    reviewCount: 0,
    inStock: true,
    isNew: true,
    isCustomProduct: true
  },
  {
    id: 'custom-2',
    name: '3D Printing',
    price: 0,
    image: 'https://images.unsplash.com/photo-1565439396361-3698684ae5c2?w=600&q=80',
    category: 'all',
    rating: 4.9,
    reviewCount: 0,
    inStock: true,
    isNew: true,
    isCustomProduct: true
  },
  
  // PCB Boards
  {
    id: 'pcb-1',
    name: 'FR4 PCB Prototype Board 5x5cm',
    price: 4.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'pcb',
    rating: 4.7,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 'pcb-2',
    name: 'Double-Sided PCB 10x15cm',
    price: 12.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'pcb',
    rating: 4.6,
    reviewCount: 98,
    inStock: true
  },
  {
    id: 'pcb-3',
    name: 'Copper Clad Laminate 10x10cm',
    price: 8.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'pcb',
    rating: 4.5,
    reviewCount: 76,
    inStock: true
  },
  {
    id: 'pcb-4',
    name: 'PCB Etching Kit',
    price: 24.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'pcb',
    rating: 4.8,
    reviewCount: 132,
    inStock: true,
    isNew: true
  },
  
  // Microcontrollers
  {
    id: 'mcu-1',
    name: 'Raspberry Pi 4 Model B 4GB',
    price: 55.99,
    image: `${IMAGE_BASE}-1591486246546-070d6d74acee?w=600&q=80`,
    category: 'microcontrollers',
    rating: 4.9,
    reviewCount: 345,
    inStock: true,
    isNew: true
  },
  {
    id: 'mcu-2',
    name: 'Arduino Uno R3',
    price: 22.99,
    image: `${IMAGE_BASE}-1559817663-8fba5d4b8ace?w=600&q=80`,
    category: 'microcontrollers',
    rating: 4.8,
    reviewCount: 287,
    inStock: true
  },
  {
    id: 'mcu-3',
    name: 'ESP32 WROOM Dev Board',
    price: 8.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'microcontrollers',
    rating: 4.7,
    reviewCount: 198,
    inStock: true
  },
  {
    id: 'mcu-4',
    name: 'Arduino Nano',
    price: 12.99,
    image: `${IMAGE_BASE}-1559817663-8fba5d4b8ace?w=600&q=80`,
    category: 'microcontrollers',
    rating: 4.6,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 'mcu-5',
    name: 'STM32F103 Development Board',
    price: 9.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'microcontrollers',
    rating: 4.5,
    reviewCount: 87,
    inStock: true
  },
  
  // Sensors
  {
    id: 'sensor-1',
    name: 'DHT22 Temperature & Humidity Sensor',
    price: 5.99,
    image: `${IMAGE_BASE}-1581092160562-40aa08e78837?w=600&q=80`,
    category: 'sensors',
    rating: 4.6,
    reviewCount: 234,
    inStock: true
  },
  {
    id: 'sensor-2',
    name: 'PIR Motion Sensor HC-SR501',
    price: 3.99,
    image: `${IMAGE_BASE}-1581092160562-40aa08e78837?w=600&q=80`,
    category: 'sensors',
    rating: 4.5,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'sensor-3',
    name: 'Ultrasonic Sensor HC-SR04',
    price: 4.99,
    image: `${IMAGE_BASE}-1581092160562-40aa08e78837?w=600&q=80`,
    category: 'sensors',
    rating: 4.4,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 'sensor-4',
    name: 'MQ-2 Gas Sensor',
    price: 6.99,
    image: `${IMAGE_BASE}-1581092160562-40aa08e78837?w=600&q=80`,
    category: 'sensors',
    rating: 4.5,
    reviewCount: 98,
    inStock: true
  },
  
  // Communication
  {
    id: 'comm-1',
    name: 'ESP8266 WiFi Module ESP-01',
    price: 4.99,
    image: `${IMAGE_BASE}-1558618666-fcd25c85cd64?w=600&q=80`,
    category: 'communication',
    rating: 4.6,
    reviewCount: 245,
    inStock: true
  },
  {
    id: 'comm-2',
    name: 'HC-05 Bluetooth Module',
    price: 7.99,
    image: `${IMAGE_BASE}-1558618666-fcd25c85cd64?w=600&q=80`,
    category: 'communication',
    rating: 4.5,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'comm-3',
    name: 'NRF24L01 Wireless Module',
    price: 5.99,
    image: `${IMAGE_BASE}-1558618666-fcd25c85cd64?w=600&q=80`,
    category: 'communication',
    rating: 4.4,
    reviewCount: 132,
    inStock: true
  },
  
  // Power Management
  {
    id: 'power-1',
    name: 'Li-Ion Battery 18650 3.7V 2500mAh',
    price: 5.99,
    image: `${IMAGE_BASE}-1616574859793-894a59a3d9c2?w=600&q=80`,
    category: 'power',
    rating: 4.5,
    reviewCount: 198,
    inStock: true
  },
  {
    id: 'power-2',
    name: 'TP4056 Li-Ion Charger Module',
    price: 2.99,
    image: `${IMAGE_BASE}-1583863788434-e58a36330cf0?w=600&q=80`,
    category: 'power',
    rating: 4.6,
    reviewCount: 245,
    inStock: true
  },
  {
    id: 'power-3',
    name: 'XL6009 Boost Converter Module',
    price: 4.99,
    image: `${IMAGE_BASE}-1583863788434-e58a36330cf0?w=600&q=80`,
    category: 'power',
    rating: 4.5,
    reviewCount: 156,
    inStock: true
  },
  
  // Components
  {
    id: 'comp-1',
    name: 'Resistor Kit 1/4W 600pcs',
    price: 9.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'components',
    rating: 4.7,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'comp-2',
    name: 'Capacitor Kit 100pcs',
    price: 12.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'components',
    rating: 4.6,
    reviewCount: 132,
    inStock: true
  },
  {
    id: 'comp-3',
    name: 'LED Kit RGB 5mm 100pcs',
    price: 7.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'components',
    rating: 4.5,
    reviewCount: 98,
    inStock: true
  },
  {
    id: 'comp-4',
    name: 'Transistor Kit NPN/PNP 50pcs',
    price: 8.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'components',
    rating: 4.4,
    reviewCount: 76,
    inStock: true
  },
  
  // Connectors
  {
    id: 'conn-1',
    name: 'Jumper Wires M-M 40pcs',
    price: 4.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'connectors',
    rating: 4.6,
    reviewCount: 287,
    inStock: true
  },
  {
    id: 'conn-2',
    name: 'Breadboard 830 Points',
    price: 6.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'connectors',
    rating: 4.5,
    reviewCount: 234,
    inStock: true
  },
  {
    id: 'conn-3',
    name: 'Dupont Connector Set 100pcs',
    price: 8.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'connectors',
    rating: 4.4,
    reviewCount: 156,
    inStock: true
  },
  
  // Tools
  {
    id: 'tool-1',
    name: 'Digital Multimeter',
    price: 19.99,
    image: `${IMAGE_BASE}-1504148455328-c376907d081c?w=600&q=80`,
    category: 'tools',
    rating: 4.7,
    reviewCount: 198,
    inStock: true
  },
  {
    id: 'tool-2',
    name: 'Soldering Iron Kit 60W',
    price: 24.99,
    image: `${IMAGE_BASE}-1504148455328-c376907d081c?w=600&q=80`,
    category: 'tools',
    rating: 4.6,
    reviewCount: 156,
    inStock: true
  },
  {
    id: 'tool-3',
    name: 'Wire Stripper Cutter',
    price: 7.99,
    image: `${IMAGE_BASE}-1504148455328-c376907d081c?w=600&q=80`,
    category: 'tools',
    rating: 4.5,
    reviewCount: 98,
    inStock: true
  },
  
  // Displays
  {
    id: 'disp-1',
    name: '1602 LCD Display with I2C',
    price: 6.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'displays',
    rating: 4.6,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'disp-2',
    name: 'OLED Display 0.96 inch I2C',
    price: 8.99,
    image: `${IMAGE_BASE}-1558346490-a72e53ae2d4f?w=600&q=80`,
    category: 'displays',
    rating: 4.5,
    reviewCount: 132,
    inStock: true
  },
  
  // Enclosures
  {
    id: 'enc-1',
    name: 'Project Box ABS Plastic 100x60x40mm',
    price: 4.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'enclosures',
    rating: 4.5,
    reviewCount: 98,
    inStock: true
  },
  {
    id: 'enc-2',
    name: 'Aluminum Case for Raspberry Pi',
    price: 9.99,
    image: `${IMAGE_BASE}-1565439396361-3698684ae5c2?w=600&q=80`,
    category: 'enclosures',
    rating: 4.6,
    reviewCount: 76,
    inStock: true
  },
  
  // IoT Kits
  {
    id: 'iot-1',
    name: 'Home Automation Starter Kit',
    price: 89.99,
    image: `${IMAGE_BASE}-1485827404703-89b55fcc595e?w=600&q=80`,
    category: 'iot-kits',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    isNew: true
  },
  {
    id: 'iot-2',
    name: 'Weather Station Kit',
    price: 59.99,
    image: `${IMAGE_BASE}-1485827404703-89b55fcc595e?w=600&q=80`,
    category: 'iot-kits',
    rating: 4.7,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'iot-3',
    name: 'Smart Garden Kit',
    price: 79.99,
    image: `${IMAGE_BASE}-1485827404703-89b55fcc595e?w=600&q=80`,
    category: 'iot-kits',
    rating: 4.6,
    reviewCount: 132,
    inStock: true
  },
  
  // Development Boards
  {
    id: 'dev-1',
    name: 'NodeMCU ESP8266 Dev Board',
    price: 6.99,
    image: `${IMAGE_BASE}-1518770660439-4636190af475?w=600&q=80`,
    category: 'development',
    rating: 4.7,
    reviewCount: 234,
    inStock: true
  },
  {
    id: 'dev-2',
    name: 'Relay Module 5V 2-Channel',
    price: 4.99,
    image: `${IMAGE_BASE}-1518770660439-4636190af475?w=600&q=80`,
    category: 'development',
    rating: 4.6,
    reviewCount: 187,
    inStock: true
  },
  {
    id: 'dev-3',
    name: 'L298N Motor Driver Module',
    price: 5.99,
    image: `${IMAGE_BASE}-1518770660439-4636190af475?w=600&q=80`,
    category: 'development',
    rating: 4.5,
    reviewCount: 156,
    inStock: true
  }
];
