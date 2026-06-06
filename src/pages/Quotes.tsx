import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { CheckCircle, Mail, MessageSquare, Phone, User } from 'lucide-react';

type QuoteRequest = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budget: string;
  timeline: string;
};

export default function GetQuotes() {
  const [formData, setFormData] = useState<QuoteRequest>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        name: "",
        email: "",
        phone: "",
        projectType: "",
        description: "",
        budget: "",
        timeline: "",
      });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {isSubmitted ? 'Thank You!' : 'Get a Free Quote'}
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            {isSubmitted 
              ? 'Your quote request has been submitted successfully!'
              : 'Fill out the form below and we\'ll get back to you within 24 hours.'}
          </p>
          
          {isSubmitted && (
            <div className="mt-10 bg-white rounded-lg shadow-sm p-6 text-left max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">What Happens Next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">We review your project requirements</h3>
                    <p className="mt-1 text-gray-500">Our team carefully examines your project details and uploaded materials.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">We prepare a detailed quotation</h3>
                    <p className="mt-1 text-gray-500">Based on your requirements, we'll create a comprehensive quote and timeline.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">We'll contact you within 24-48 hours</h3>
                    <p className="mt-1 text-gray-500">Our representative will reach out to discuss your project in detail.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 font-bold">4</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Project kickoff</h3>
                    <p className="mt-1 text-gray-500">Once approved, we'll start working on your project right away.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Have questions? Email us at <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="border-l-4 border-blue-500 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Why Choose Us?</CardTitle>
                <CardDescription className="text-gray-600">We deliver excellence in every project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { 
                    title: "Expert Team", 
                    description: "Our skilled professionals bring years of experience to your project.",
                    icon: User
                  },
                  { 
                    title: "Competitive Pricing", 
                    description: "High-quality solutions at affordable rates with transparent pricing.",
                    icon: CheckCircle
                  },
                  { 
                    title: "Timely Delivery", 
                    description: "We respect your time and deliver projects on schedule.",
                    icon: CheckCircle
                  },
                  { 
                    title: "24/7 Support", 
                    description: "Round-the-clock assistance for all your queries and concerns.", 
                    icon: MessageSquare
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email us at</p>
                    <a href="mailto:info@neevachi.in" className="font-medium hover:underline">
                      info@neevachi.in
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call us at</p>
                    <a href="tel:+919922552891" className="font-medium hover:underline">
                      +91 9922552891, +91 9403497065
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl mb-2 text-gray-800">Request a Quote</CardTitle>
              <CardDescription className="text-gray-600">Fill out the form and we'll get back to you soon</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <Card className="bg-white border border-gray-200 shadow-md">
                      <div className="bg-green-100 text-green-700 p-4 rounded-lg inline-flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 mb-3 text-green-600" />
                        <h3 className="text-xl font-medium mb-2">Request Received!</h3>
                        <p className="text-green-700">We've received your quote request. Our team will contact you within 24 hours.</p>
                      </div>
                    </Card>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type *</Label>
                        <select
                          id="projectType"
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          required
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>Select project type</option>
                          <option value="project">Project Quotes</option>
                          <option value="3d-printing">3D Printing</option>
                          <option value="pcb">PCB Quotes</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="description" className="text-gray-700">Project Description</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Tell us about your project..."
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="budget" className="text-gray-700">Estimated Budget</Label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="" disabled>Select budget range</option>
                          <option value="1k-5k">$1,000 - $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k+">$50,000+</option>
                          <option value="undecided">Not sure yet</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="timeline" className="text-gray-700">Project Timeline</Label>
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          required
                        >
                          <option value="" disabled>Select timeline</option>
                          <option value="1month">Within 1 month</option>
                          <option value="3months">1-3 months</option>
                          <option value="6months">3-6 months</option>
                          <option value="6months+">6+ months</option>
                          <option value="flexible">Flexible timeline</option>
                        </select>
                      </div>
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
                      'Get Free Quote'
                    )}
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
