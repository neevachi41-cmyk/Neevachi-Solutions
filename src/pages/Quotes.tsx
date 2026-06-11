import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { CheckCircle, Mail, MessageSquare, Phone, User, UploadCloud, X } from 'lucide-react';

type QuoteRequest = {
  clientName: string;
  contactNumber: string;
  emailAddress: string;
  projectDescription: string;
  referenceMaterials: File[];
};

export default function GetQuotes() {
  const [formData, setFormData] = useState<QuoteRequest>({
    clientName: "",
    contactNumber: "",
    emailAddress: "",
    projectDescription: "",
    referenceMaterials: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => file.size <= 50 * 1024 * 1024); // 50MB limit
      setFormData(prev => ({
        ...prev,
        referenceMaterials: [...prev.referenceMaterials, ...newFiles]
      }));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      const newFiles = Array.from(files).filter(file => file.size <= 50 * 1024 * 1024); // 50MB limit
      setFormData(prev => ({
        ...prev,
        referenceMaterials: [...prev.referenceMaterials, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      referenceMaterials: prev.referenceMaterials.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        clientName: "",
        contactNumber: "",
        emailAddress: "",
        projectDescription: "",
        referenceMaterials: [],
      });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {isSubmitted ? 'Thank You!' : 'Get Project Quotation'}
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {isSubmitted 
              ? 'Your quotation request has been submitted successfully!'
              : 'Share your project details and we\'ll provide a comprehensive quotation'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-lg bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl mb-2 text-gray-800">Project Details</CardTitle>
              <CardDescription className="text-gray-600">Fill in your project requirements and upload relevant files</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <Card className="bg-white border border-gray-200 shadow-md">
                      <div className="bg-green-100 text-green-700 p-4 rounded-lg inline-flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 mb-3 text-green-600" />
                        <h3 className="text-xl font-medium mb-2">Request Received!</h3>
                        <p className="text-green-700">We've received your quotation request. Our team will contact you within 24-48 hours.</p>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <Label htmlFor="clientName" className="text-gray-700">Client Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="clientName"
                          name="clientName"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.clientName}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="contactNumber" className="text-gray-700">Contact Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="contactNumber"
                          name="contactNumber"
                          type="tel"
                          placeholder="+91 XXXXXXXXXX"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="emailAddress" className="text-gray-700">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="projectDescription" className="text-gray-700">Project Description *</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                          id="projectDescription"
                          name="projectDescription"
                          placeholder="Describe your project requirements, specifications, and any other relevant details..."
                          rows={4}
                          value={formData.projectDescription}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-gray-700">Reference Materials (Max 50MB per file)</Label>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <input
                          type="file"
                          id="referenceMaterials"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".png,.jpg,.jpeg,.pdf,.mp3,.wav,.m4a,.dwg,.dxf"
                        />
                        <label htmlFor="referenceMaterials" className="cursor-pointer">
                          <UploadCloud className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                          <p className="text-gray-600 font-medium">Drag and drop files here or click to upload</p>
                          <p className="text-gray-500 text-sm mt-1">PNG, JPG, PDF, MP3, WAV, M4A, CAD files (up to 50MB)</p>
                        </label>
                      </div>
                      {formData.referenceMaterials.length > 0 && (
                        <div className="space-y-2 mt-3">
                          {formData.referenceMaterials.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                              <span className="text-sm text-gray-700 truncate flex-1">{file.name}</span>
                              <span className="text-xs text-gray-500 ml-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
              {!isSubmitted && (
                <CardFooter className="flex justify-end">
                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Quotation Request'
                    )}
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>

        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-white rounded-lg shadow-sm p-6 text-left">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">What Happens Next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">We review your project requirements and uploaded materials</h3>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Our team prepares a detailed quotation and timeline</h3>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">We contact you within 24-48 hours for project discussion</h3>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-600 font-bold">4</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Upon approval, we initiate the development process</h3>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                Have questions? Email us at <a href="mailto:info@neevachi.in" className="text-blue-600 hover:underline">info@neevachi.in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
