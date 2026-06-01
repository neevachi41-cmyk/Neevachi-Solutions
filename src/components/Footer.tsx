import { Github, Linkedin, Mail, Twitter, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-8 px-4 bg-[#0E3995] border-t border-[#0E3995] shadow-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/footer Logo.png"
                alt="Neevachi Solutions"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-blue-50 text-sm max-w-md mb-4">
              Transforming ideas into technological reality. We specialize in Robotics,
              Embedded Systems, IoT, PCB Design, and 3D Engineering solutions.
            </p>
            <div className="text-blue-50 text-sm max-w-md mb-4">
              <p className="font-semibold text-white mb-2">Address:</p>
              <p>Flat No. S No 50, Survey Number :50, Office No 1 15/1, Samarth Sankul near Bank of Maharashtra, Pune Pune, MAHARASHTRA, 411041</p>
            </div>
            <div className="text-blue-50 text-sm max-w-md mb-4">
              <p className="font-semibold text-white mb-2">Email:</p>
              <p>info@neevachi.in</p>
            </div>
            <div className="text-blue-50 text-sm max-w-md mb-4">
              <p className="font-semibold text-white mb-2">Contact:</p>
              <p>+91 9922552891, +91 9403497065</p>
            </div>
            <div className="text-blue-50 text-sm max-w-md mb-4">
              <p className="font-semibold text-white mb-2">GSTIN:</p>
              <p>27GYTPM3198G1ZK</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="/services/robotics" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E3995] mr-2"></span>
                Robotics
              </a></li>
              <li><a href="/services/embedded-systems" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E3995] mr-2"></span>
                Embedded Systems
              </a></li>
              <li><a href="/services/iot-solutions" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E3995] mr-2"></span>
                IoT Solutions
              </a></li>
              <li><a href="/services/pcb-design" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E3995] mr-2"></span>
                PCB Design
              </a></li>
              <li><a href="/services/3d-printing" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0E3995] mr-2"></span>
                3D Printing
              </a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                About Us
              </a></li>
              <li><a href="#" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                Projects
              </a></li>
              <li><a href="#" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                Contact
              </a></li>
              <li><a href="#" className="text-sm text-blue-50 hover:text-white transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-200 mr-2"></span>
                Careers
              </a></li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-[#0E3995] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-100">
            © 2024 Neevachi Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-blue-100 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="w-px h-4 bg-blue-400"></span>
            <a href="#" className="text-xs text-blue-100 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
