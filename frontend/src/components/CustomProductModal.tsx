import { useState } from 'react';
import { X } from 'lucide-react';

export interface CustomProductData {
  productType: string;
  description: string;
  quantity: number;
  specialRequirements: string;
}

interface CustomProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomProductData) => void;
}

export function CustomProductModal({ isOpen, onClose, onSubmit }: CustomProductModalProps) {
  const [formData, setFormData] = useState<CustomProductData>({
    productType: '',
    description: '',
    quantity: 1,
    specialRequirements: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Custom Product Request</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Type
              </label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({...formData, productType: e.target.value})}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select a product type</option>
                <option value="custom-iot">Custom IoT Device</option>
                <option value="sensor">Sensor</option>
                <option value="smart-device">Smart Device</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded-md h-24"
                placeholder="Describe your custom product..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requirements (Optional)
              </label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
                className="w-full p-2 border rounded-md h-20"
                placeholder="Any special requirements or notes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
