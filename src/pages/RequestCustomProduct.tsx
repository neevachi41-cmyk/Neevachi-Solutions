import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ArrowLeft, Check, Loader2, Plus } from 'lucide-react';
import { customRequestsAPI } from '@/lib/api/admin';

export default function RequestCustomProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    productType: '',
    description: '',
    quantity: 1,
    specialRequirements: '',
    budget: '',
    timeline: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await customRequestsAPI.submitRequest(formData);
      toast.success('Request submitted! Our team will contact you within 24 hours.');
      navigate('/shop');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Shop
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Request Custom Product</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Can't find exactly what you're looking for? Let us create a custom solution tailored to your specific needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              {/* Product Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Type *
                </label>
                <select
                  required
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select product type</option>
                  <option value="robotics">Robotics</option>
                  <option value="embedded-systems">Embedded Systems</option>
                  <option value="iot">IoT Solutions</option>
                  <option value="pcb">PCB Design</option>
                  <option value="3d-printing">3D Printing</option>
                  <option value="cad">CAD/3D Engineering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your custom product requirements in detail..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequirements}
                  onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  placeholder="Any specific materials, dimensions, or technical specifications..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Budget (USD)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g., $500 - $1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Select timeline</option>
                  <option value="urgent">Urgent (1-2 weeks)</option>
                  <option value="standard">Standard (2-4 weeks)</option>
                  <option value="flexible">Flexible (1-2 months)</option>
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                  ) : (
                    <><Plus className="w-5 h-5" /> Submit Request</>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Check className="w-5 h-5" />
              What happens next?
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Our team reviews your request within 24 hours</li>
              <li>• We'll contact you to discuss technical details and feasibility</li>
              <li>• You'll receive a detailed quotation with timeline</li>
              <li>• Upon approval, we begin development and keep you updated</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
