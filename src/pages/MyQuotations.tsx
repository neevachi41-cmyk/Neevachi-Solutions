import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import { ArrowLeft, CheckCircle, Clock, Download, FileText, Printer, Share2, XCircle, Box, CircuitBoard, Wrench } from 'lucide-react';

import { pcbOrdersAPI, printOrdersAPI, customRequestsAPI } from '@/lib/api/admin';

const MyQuotations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pcb, print, custom

  useEffect(() => {
    fetchQuotations();
  }, [user]);

  const fetchQuotations = async () => {
    try {
      const [pcbOrders, printOrders, customRequests] = await Promise.all([
        pcbOrdersAPI.getOrders().catch(() => []),
        printOrdersAPI.getOrders().catch(() => []),
        customRequestsAPI.getRequests().catch(() => []),
      ]);

      const allQuotations = [
        ...pcbOrders.map(order => ({
          ...order,
          type: 'pcb',
          title: `PCB Order - ${order.layers} Layers`,
          amount: `₹${order.calculatedPrice || 0}`,
          client: order.customerName,
          icon: CircuitBoard
        })),
        ...printOrders.map(order => ({
          ...order,
          type: 'print',
          title: `3D Print Order - ${order.material}`,
          amount: `₹${order.totalPrice || 0}`,
          client: order.customerName,
          icon: Box
        })),
        ...customRequests.map(request => ({
          ...request,
          type: 'custom',
          title: `Custom Request - ${request.productType}`,
          amount: request.budget || 'TBD',
          client: request.contactEmail,
          icon: Wrench
        }))
      ];

      // Filter by user email if available
      const userQuotations = user?.email 
        ? allQuotations.filter(q => 
            q.customerEmail === user.email || 
            q.contactEmail === user.email
          )
        : allQuotations;

      setQuotations(userQuotations);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewQuotationDetails = (quotation) => {
    setSelectedQuotation(quotation);
  };

  const closeModal = () => {
    setSelectedQuotation(null);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
      case 'completed':
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'pending':
      case 'reviewing':
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      case 'rejected':
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status || 'Unknown'}
          </span>
        );
    }
  };

  const filteredQuotations = filter === 'all' 
    ? quotations 
    : quotations.filter(q => q.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quotations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Quotations</h1>
            <div className="w-24"></div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {['all', 'pcb', 'print', 'custom'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === filterType
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Quotation History
                </h3>
                <span className="text-sm text-gray-500">
                  {filteredQuotations.length} {filteredQuotations.length === 1 ? 'quotation' : 'quotations'}
                </span>
              </div>
            </div>
            
            {filteredQuotations.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No quotations found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `No ${filter} quotations found.`}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuotations.map((quotation) => (
                      <tr key={quotation._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              {quotation.icon && <quotation.icon className="h-5 w-5 text-blue-600" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{quotation.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{quotation.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quotation.client}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(quotation.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {quotation.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(quotation.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => viewQuotationDetails(quotation)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quotation Details Modal */}
      {selectedQuotation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedQuotation.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedQuotation.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <Printer className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="p-2 rounded-full text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Type</h4>
                      <p className="mt-1 text-sm text-gray-900 capitalize">{selectedQuotation.type}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Client</h4>
                      <p className="mt-1 text-sm text-gray-900">{selectedQuotation.client}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date</h4>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedQuotation.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status</h4>
                      <div className="mt-1">
                        {getStatusBadge(selectedQuotation.status)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Amount</h4>
                      <p className="mt-1 text-lg font-bold text-gray-900">
                        {selectedQuotation.amount}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dynamic content based on quotation type */}
                {selectedQuotation.type === 'pcb' && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">PCB Specifications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs text-gray-500">Layers</h5>
                        <p className="text-sm font-medium">{selectedQuotation.layers}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Quantity</h5>
                        <p className="text-sm font-medium">{selectedQuotation.pcbQty}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Thickness</h5>
                        <p className="text-sm font-medium">{selectedQuotation.pcbThickness}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Color</h5>
                        <p className="text-sm font-medium">{selectedQuotation.pcbColor}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Surface Finish</h5>
                        <p className="text-sm font-medium">{selectedQuotation.surfaceFinish}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuotation.type === 'print' && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Print Specifications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <h5 className="text-xs text-gray-500">Material</h5>
                        <p className="text-sm font-medium">{selectedQuotation.material}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Color</h5>
                        <p className="text-sm font-medium">{selectedQuotation.color}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Infill</h5>
                        <p className="text-sm font-medium">{selectedQuotation.infill}%</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Quantity</h5>
                        <p className="text-sm font-medium">{selectedQuotation.quantity}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Printer</h5>
                        <p className="text-sm font-medium">{selectedQuotation.printer}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedQuotation.type === 'custom' && (
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Custom Request Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs text-gray-500">Product Type</h5>
                        <p className="text-sm font-medium">{selectedQuotation.productType}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Quantity</h5>
                        <p className="text-sm font-medium">{selectedQuotation.quantity}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Budget</h5>
                        <p className="text-sm font-medium">{selectedQuotation.budget}</p>
                      </div>
                      <div>
                        <h5 className="text-xs text-gray-500">Timeline</h5>
                        <p className="text-sm font-medium">{selectedQuotation.timeline}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h5 className="text-xs text-gray-500">Description</h5>
                        <p className="text-sm font-medium">{selectedQuotation.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {(selectedQuotation.status === 'Pending' || selectedQuotation.status === 'New' || selectedQuotation.status === 'Reviewing') && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Accept Quotation
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Request Changes
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyQuotations;
