import { Github, Linkedin, Mail, Twitter, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-blue-100 border-t border-blue-200 shadow-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-blue-100">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-heading font-bold text-gray-800">
                Neevachi<span className="text-blue-600">Tech</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-md mb-4">
              Transforming ideas into technological reality. We specialize in Robotics, 
              Embedded Systems, IoT, PCB Design, and 3D Engineering solutions.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-gray-800 mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="/services/robotics" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                Robotics
              </a></li>
              <li><a href="/services/embedded-systems" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                Embedded Systems
              </a></li>
              <li><a href="/services/iot-solutions" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                IoT Solutions
              </a></li>
              <li><a href="/services/pcb-design" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                PCB Design
              </a></li>
              <li><a href="/services/3d-printing" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                3D Printing
              </a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-gray-800 mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                About Us
              </a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                Projects
              </a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                Contact
              </a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></span>
                Careers
              </a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2024 Neevachi Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <span className="w-px h-4 bg-gray-200"></span>
            <a href="#" className="text-xs text-gray-400 hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
