// seed.js — Run ONCE to populate MongoDB Atlas with sample data
// Usage from /api folder:  node seed.js
// After running, go to https://cloud.mongodb.com → Browse Collections to see the data

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('✅ Connected!\n');

  // ─────────────────────────────────────────────────────────────
  // 1. SLIDER UPDATES
  // ─────────────────────────────────────────────────────────────
  const sliderSchema = new mongoose.Schema({
    title: String, description: String, imageUrl: String,
    link: String, isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, createdAt: { type: Date, default: Date.now }
  });
  const SliderUpdate = mongoose.models.SliderUpdate || mongoose.model('SliderUpdate', sliderSchema);
  await SliderUpdate.deleteMany({});
  await SliderUpdate.insertMany([
    { title: 'Welcome to Neevachi', description: 'Innovative robotics & embedded systems solutions for every industry', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200', link: '/services', isActive: true, order: 1 },
    { title: 'PCB Manufacturing Service', description: 'High-quality PCBs with fast turnaround — delivered in 20 days', imageUrl: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=1200', link: '/pcb-quotation', isActive: true, order: 2 },
    { title: '3D Printing Service', description: 'Professional FDM 3D printing with multiple material options', imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200', link: '/printing-service', isActive: true, order: 3 },
  ]);
  console.log('✅ SliderUpdates — 3 items created');

  // ─────────────────────────────────────────────────────────────
  // 2. SERVICES
  // ─────────────────────────────────────────────────────────────
  const serviceSchema = new mongoose.Schema({
    title: String, description: String, icon: String, imageUrl: String,
    features: [String], isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, createdAt: { type: Date, default: Date.now }
  });
  const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
  await Service.deleteMany({});
  await Service.insertMany([
    { title: 'Robotics Solutions', description: 'Custom robotics systems for industrial and research applications.', icon: 'robot', features: ['Custom robot design', 'Servo & stepper motor control', 'ROS integration', 'Sensor fusion'], isActive: true, order: 1 },
    { title: 'PCB Design & Manufacturing', description: 'End-to-end PCB design and high-quality manufacturing.', icon: 'circuit', features: ['1-4 layer PCBs', 'SMD & through-hole', 'Gerber file support', '20-day delivery'], isActive: true, order: 2 },
    { title: '3D Printing Service', description: 'Professional FDM 3D printing with multiple material options.', icon: 'printer', features: ['PLA, ABS, PETG, TPU', 'High-res printing (0.1mm)', 'Bulk orders welcome', 'Post-processing available'], isActive: true, order: 3 },
    { title: 'IoT Development', description: 'End-to-end IoT solutions from sensor to cloud dashboard.', icon: 'wifi', features: ['ESP32 & Arduino', 'MQTT & REST APIs', 'Cloud dashboard', 'Real-time monitoring'], isActive: true, order: 4 },
    { title: 'Embedded Systems', description: 'Custom firmware and embedded system design.', icon: 'chip', features: ['STM32, AVR, ARM', 'RTOS & bare-metal', 'Low-power design', 'Protocol implementation'], isActive: true, order: 5 },
    { title: 'Technical Consulting', description: 'Expert advice for your electronics and software projects.', icon: 'briefcase', features: ['Feasibility study', 'BOM optimization', 'Design review', 'Prototype support'], isActive: true, order: 6 },
  ]);
  console.log('✅ Services — 6 items created');

  // ─────────────────────────────────────────────────────────────
  // 3. PROJECTS
  // ─────────────────────────────────────────────────────────────
  const projectSchema = new mongoose.Schema({
    title: String, description: String, category: String, year: String,
    image: String, technologies: [String],
    status: { type: String, default: 'Completed' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, createdAt: { type: Date, default: Date.now }
  });
  const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
  await Project.deleteMany({});
  await Project.insertMany([
    { title: 'Autonomous Delivery Robot', description: 'A self-navigating delivery robot using LiDAR and ROS for warehouse logistics.', category: 'Robotics', year: '2024', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', technologies: ['ROS', 'Python', 'LiDAR', 'OpenCV'], status: 'Completed', isActive: true, order: 1 },
    { title: 'Smart Agriculture Monitor', description: 'IoT-based soil and weather monitoring system for precision farming.', category: 'IoT', year: '2024', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800', technologies: ['ESP32', 'MQTT', 'Node.js', 'MongoDB'], status: 'Completed', isActive: true, order: 2 },
    { title: 'Custom PCB for EV Charger', description: 'Designed and manufactured a 4-layer PCB for an electric vehicle charging station.', category: 'PCB Design', year: '2023', image: 'https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=800', technologies: ['Altium Designer', 'STM32', 'CAN Bus'], status: 'Completed', isActive: true, order: 3 },
    { title: '3D Printed Prosthetic Hand', description: 'A low-cost, functional prosthetic hand designed and 3D printed using PLA.', category: '3D Printing', year: '2023', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', technologies: ['Fusion 360', 'PLA', 'Servo Motors'], status: 'Completed', isActive: true, order: 4 },
    { title: 'Industrial Automation Controller', description: 'PLC-based automation system for a manufacturing line with real-time monitoring.', category: 'Embedded Systems', year: '2023', image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=800', technologies: ['PLC', 'SCADA', 'Modbus', 'HMI'], status: 'Completed', isActive: true, order: 5 },
  ]);
  console.log('✅ Projects — 5 items created');

  // ─────────────────────────────────────────────────────────────
  // 4. BLOG POSTS
  // ─────────────────────────────────────────────────────────────
  const postSchema = new mongoose.Schema({
    title: String, content: String, excerpt: String, author: String,
    imageUrl: String, category: String, tags: [String],
    isActive: { type: Boolean, default: true }, createdAt: { type: Date, default: Date.now }
  });
  const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
  await Post.deleteMany({});
  await Post.insertMany([
    {
      title: 'Getting Started with PCB Design',
      content: 'PCB design is the foundation of modern electronics. In this post we cover the basics of schematic capture, footprint assignment, and routing. Whether you are a beginner or an experienced engineer, these fundamentals will help you create reliable PCBs every time. Start with a clear schematic, choose the right stackup, and always run DRC before sending to manufacture.',
      excerpt: 'Learn the basics of PCB design — from schematic to finished board.',
      author: 'Neevachi Team', imageUrl: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=800',
      category: 'PCB', tags: ['PCB', 'Electronics', 'Design'], isActive: true
    },
    {
      title: 'Top 5 3D Printing Materials in 2024',
      content: 'From PLA to TPU, the world of 3D printing materials has expanded dramatically. PLA is easy to print and eco-friendly. ABS is tough and heat-resistant. PETG is chemical-resistant and food-safe. TPU is flexible and rubber-like. ASA is UV-resistant, perfect for outdoor use. Choose based on your application requirements and printer capabilities.',
      excerpt: 'A complete comparison of the most popular FDM 3D printing materials.',
      author: 'Neevachi Team', imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800',
      category: '3D Printing', tags: ['3D Printing', 'Materials', 'FDM'], isActive: true
    },
    {
      title: 'Building Your First IoT Device with ESP32',
      content: 'The ESP32 is one of the most powerful and affordable microcontrollers available today. It features built-in WiFi and Bluetooth, dual-core processor, and supports MicroPython, Arduino IDE, and ESP-IDF. In this tutorial we build a temperature and humidity monitor that publishes data via MQTT and displays it on a real-time dashboard.',
      excerpt: 'Step-by-step guide to building an IoT sensor with ESP32 and MQTT.',
      author: 'Neevachi Team', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
      category: 'IoT', tags: ['IoT', 'ESP32', 'MQTT'], isActive: true
    },
  ]);
  console.log('✅ Blog Posts — 3 items created');

  // ─────────────────────────────────────────────────────────────
  // 5. CONTACTS (sample entries)
  // ─────────────────────────────────────────────────────────────
  const contactSchema = new mongoose.Schema({
    name: String, email: String, message: String,
    createdAt: { type: Date, default: Date.now }
  });
  const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
  await Contact.deleteMany({});
  await Contact.insertMany([
    { name: 'Rahul Sharma', email: 'rahul@example.com', message: 'I need a custom PCB designed for my IoT project. Can you help?' },
    { name: 'Priya Patel', email: 'priya@example.com', message: 'Interested in 3D printing for prototyping. What are the lead times?' },
  ]);
  console.log('✅ Contacts — 2 items created');

  // ─────────────────────────────────────────────────────────────
  console.log('\n🎉 All done! MongoDB Atlas now has these collections:');
  console.log('   → sliderupdates  (3 items)');
  console.log('   → services       (6 items)');
  console.log('   → projects       (5 items)');
  console.log('   → posts          (3 items)');
  console.log('   → contacts       (2 items)');
  console.log('\n📊 View them at: https://cloud.mongodb.com');
  console.log('   Cluster0 → Browse Collections\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err.message);
  console.error(err);
  process.exit(1);
});
