import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Printer, Package, DollarSign, Layers, Zap, Check, X, ArrowRight, ArrowDown, Info, FileText, Download, Trash2, ChevronDown, ChevronUp, Radio, Box, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Material options with pricing per gram
const MATERIALS = [
  { id: 'pla', name: 'PLA', pricePerGram: 0.15, description: 'Easy to print, eco-friendly', colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray', 'Silver'] },
  { id: 'abs', name: 'ABS', pricePerGram: 0.18, description: 'Durable, heat resistant', colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Gray'] },
  { id: 'petg', name: 'PETG', pricePerGram: 0.20, description: 'Strong, chemical resistant', colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray', 'Clear'] },
  { id: 'tpu', name: 'TPU', pricePerGram: 0.25, description: 'Flexible, rubber-like', colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow'] },
  { id: 'pla_plus', name: 'PLA+', pricePerGram: 0.18, description: 'Enhanced PLA, stronger', colors: ['White', 'Black', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray'] },
  { id: 'asa', name: 'ASA', pricePerGram: 0.22, description: 'UV resistant, outdoor use', colors: ['White', 'Black', 'Gray', 'Orange'] },
];

// Printer quality options
const PRINTER_OPTIONS = [
  { id: 'high', name: '0.1 mm High Quality', description: 'Best surface finish', multiplier: 1.5 },
  { id: 'medium', name: '0.15 mm Medium Quality', description: 'Good balance of quality and speed', multiplier: 1.3 },
  { id: 'standard', name: '0.2 mm Standard Quality', description: 'Standard quality, faster print', multiplier: 1.0 },
  { id: 'standard_nozzle', name: '0.2 mm Standard Quality + 0.6mm Nozzle', description: 'Faster with larger nozzle', multiplier: 0.9 },
];

// Infill options
const INFILL_OPTIONS = [
  { value: 10, label: '10% (Hollow)', multiplier: 0.7 },
  { value: 20, label: '20% (Light)', multiplier: 0.8 },
  { value: 30, label: '30% (Standard)', multiplier: 0.9 },
  { value: 40, label: '40% (Strong)', multiplier: 1.0 },
  { value: 50, label: '50% (Durable)', multiplier: 1.1 },
  { value: 70, label: '70% (Heavy)', multiplier: 1.3 },
  { value: 100, label: '100% (Solid)', multiplier: 1.5 },
];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  volume?: number; // in cm³
  estimatedWeight?: number; // in grams
  dimensions?: {
    x: number; // in cm
    y: number; // in cm
    z: number; // in cm
  };
  printTime?: string; // in hh:mm:ss format
  geometry?: THREE.BufferGeometry; // Store the parsed geometry for 3D viewer
}

interface PrintSettings {
  printer: string;
  material: string;
  color: string;
  infill: number;
  quantity: number;
  supports: boolean;
  postProcessing: string;
}

const PrintingService = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [settings, setSettings] = useState<PrintSettings>({
    printer: 'standard',
    material: 'pla',
    color: 'White',
    infill: 30,
    quantity: 1,
    supports: true,
    postProcessing: 'none',
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileUnit, setFileUnit] = useState<'mm' | 'inch'>('mm');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Step wizard state
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState('printer');

  const selectedMaterial = MATERIALS.find(m => m.id === settings.material);
  const selectedPrinter = PRINTER_OPTIONS.find(p => p.id === settings.printer);

  // Parse 3D file and calculate volume and dimensions
  const parse3DFile = async (file: File): Promise<{ volume: number; dimensions: { x: number; y: number; z: number }; geometry: THREE.BufferGeometry }> => {
    return new Promise((resolve, reject) => {
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      let geometry: THREE.BufferGeometry;
      
      if (fileExtension === '.stl') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const contents = e.target?.result as ArrayBuffer;
            const loader = new STLLoader();
            geometry = loader.parse(contents);
            
            // Calculate volume and dimensions
            const result = calculateVolumeAndDimensions(geometry);
            resolve(result);
          } catch (error) {
            console.error('Error parsing STL file:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      } else if (fileExtension === '.obj') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const contents = e.target?.result as string;
            const loader = new OBJLoader();
            const object = loader.parse(contents);
            
            // Get first geometry from OBJ
            let foundGeometry: THREE.BufferGeometry | null = null;
            object.traverse((child) => {
              if (child instanceof THREE.Mesh && !foundGeometry) {
                foundGeometry = child.geometry;
              }
            });
            
            if (foundGeometry) {
              geometry = foundGeometry;
              const result = calculateVolumeAndDimensions(geometry);
              resolve(result);
            } else {
              reject(new Error('No geometry found in OBJ file'));
            }
          } catch (error) {
            console.error('Error parsing OBJ file:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      } else if (fileExtension === '.gltf' || fileExtension === '.glb') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const loader = new GLTFLoader();
            const url = URL.createObjectURL(file);
            
            loader.load(url, (gltf) => {
              let foundGeometry: THREE.BufferGeometry | null = null;
              gltf.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && !foundGeometry) {
                  foundGeometry = child.geometry;
                }
              });
              
              URL.revokeObjectURL(url);
              
              if (foundGeometry) {
                geometry = foundGeometry;
                const result = calculateVolumeAndDimensions(geometry);
                resolve(result);
              } else {
                reject(new Error('No geometry found in GLTF file'));
              }
            }, undefined, (error) => {
              URL.revokeObjectURL(url);
              reject(error);
            });
          } catch (error) {
            console.error('Error parsing GLTF file:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      } else if (fileExtension === '.fbx') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const loader = new FBXLoader();
            const url = URL.createObjectURL(file);
            
            loader.load(url, (fbx) => {
              let foundGeometry: THREE.BufferGeometry | null = null;
              fbx.traverse((child) => {
                if (child instanceof THREE.Mesh && !foundGeometry) {
                  foundGeometry = child.geometry;
                }
              });
              
              URL.revokeObjectURL(url);
              
              if (foundGeometry) {
                geometry = foundGeometry;
                const result = calculateVolumeAndDimensions(geometry);
                resolve(result);
              } else {
                reject(new Error('No geometry found in FBX file'));
              }
            }, undefined, (error) => {
              URL.revokeObjectURL(url);
              reject(error);
            });
          } catch (error) {
            console.error('Error parsing FBX file:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      } else if (fileExtension === '.ply') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const contents = e.target?.result as ArrayBuffer;
            const loader = new PLYLoader();
            geometry = loader.parse(contents);
            
            const result = calculateVolumeAndDimensions(geometry);
            resolve(result);
          } catch (error) {
            console.error('Error parsing PLY file:', error);
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsArrayBuffer(file);
      } else {
        reject(new Error('Unsupported file format'));
      }
    });
  };

  // Helper function to calculate volume and dimensions from geometry
  const calculateVolumeAndDimensions = (geometry: THREE.BufferGeometry): { volume: number; dimensions: { x: number; y: number; z: number }; geometry: THREE.BufferGeometry } => {
    // Calculate volume using signed tetrahedron method (more accurate)
    const positions = geometry.attributes.position.array as Float32Array;
    const triangles = positions.length / 9;
    let volume = 0;
    
    for (let i = 0; i < triangles; i++) {
      const p1 = new THREE.Vector3(positions[i * 9], positions[i * 9 + 1], positions[i * 9 + 2]);
      const p2 = new THREE.Vector3(positions[i * 9 + 3], positions[i * 9 + 4], positions[i * 9 + 5]);
      const p3 = new THREE.Vector3(positions[i * 9 + 6], positions[i * 9 + 7], positions[i * 9 + 8]);
      
      volume += p1.dot(p2.cross(p3)) / 6;
    }
    
    volume = Math.abs(volume);
    
    // Convert from mm³ to cm³
    const volumeInCm3 = volume / 1000;
    
    // Calculate bounding box dimensions
    geometry.computeBoundingBox();
    const boundingBox = geometry.boundingBox;
    const size = new THREE.Vector3();
    boundingBox.getSize(size);
    
    // Convert from mm to cm
    const dimensions = {
      x: size.x / 10,
      y: size.y / 10,
      z: size.z / 10,
    };
    
    return { volume: volumeInCm3, dimensions, geometry };
  };

  // Estimate print time based on volume and settings (more accurate)
  const estimatePrintTime = (volumeCm3: number, dimensions: { x: number; y: number; z: number }): string => {
    // More accurate print time estimation based on:
    // - Volume
    // - Layer height (from printer selection)
    // - Infill percentage
    // - Print speed (varies by quality)
    
    const layerHeight = selectedPrinter?.id === 'high' ? 0.1 : 
                       selectedPrinter?.id === 'medium' ? 0.15 : 
                       selectedPrinter?.id === 'standard_nozzle' ? 0.2 : 0.2;
    
    const printSpeed = selectedPrinter?.id === 'high' ? 30 : 
                      selectedPrinter?.id === 'medium' ? 50 : 
                      selectedPrinter?.id === 'standard_nozzle' ? 80 : 60; // mm/s
    
    const infillPercentage = settings.infill / 100;
    const supportsMultiplier = settings.supports ? 1.2 : 1.0;
    
    // Calculate number of layers
    const layerCount = Math.ceil((dimensions.z * 10) / layerHeight); // Convert cm to mm
    
    // Calculate print time per layer based on cross-sectional area
    const crossSectionalArea = dimensions.x * dimensions.y; // cm²
    const printAreaPerLayer = crossSectionalArea * infillPercentage; // cm²
    const printAreaPerLayerMm2 = printAreaPerLayer * 100; // mm²
    
    // Time per layer = area / speed
    const timePerLayer = printAreaPerLayerMm2 / printSpeed; // seconds
    
    // Total print time = layers * time per layer * supports multiplier
    const totalSeconds = layerCount * timePerLayer * supportsMultiplier;
    
    // Add time for travel moves and retractions (20% overhead)
    const totalSecondsWithOverhead = totalSeconds * 1.2;
    
    // Convert to hh:mm:ss
    const h = Math.floor(totalSecondsWithOverhead / 3600);
    const m = Math.floor((totalSecondsWithOverhead % 3600) / 60);
    const s = Math.floor(totalSecondsWithOverhead % 60);
    
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate estimated price
  const calculatePrice = useCallback(() => {
    if (uploadedFiles.length === 0 || !selectedMaterial || !selectedPrinter) return 0;

    let totalWeight = 0;
    uploadedFiles.forEach(file => {
      totalWeight += file.estimatedWeight || 0;
    });

    // Base price from material
    let basePrice = totalWeight * selectedMaterial.pricePerGram;

    // Apply printer quality multiplier
    basePrice *= selectedPrinter.multiplier;

    // Apply infill multiplier
    const infillMultiplier = INFILL_OPTIONS.find(i => i.value === settings.infill)?.multiplier || 1;
    basePrice *= infillMultiplier;

    // Add supports cost
    if (settings.supports) {
      basePrice *= 1.1;
    }

    // Post processing costs
    const postProcessingCosts: Record<string, number> = {
      none: 0,
      sanding: 50,
      painting: 100,
      assembly: 75,
    };
    basePrice += postProcessingCosts[settings.postProcessing] || 0;

    // Apply quantity
    const totalPrice = basePrice * settings.quantity;

    // Minimum order value
    return Math.max(totalPrice, 50);
  }, [uploadedFiles, selectedMaterial, selectedPrinter, settings]);

  const totalPrice = calculatePrice();

  // Handle file upload
  const handleFileUpload = useCallback(async (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    const fileArray = Array.from(files);
    
    for (const file of fileArray) {
      // Accept multiple 3D file formats
      const validExtensions = ['.stl', '.obj', '.gltf', '.glb', '.fbx', '.ply'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      if (!validExtensions.includes(fileExtension)) {
        toast.error(`Invalid file type: ${file.name}. Only STL, OBJ, GLTF, GLB, FBX, and PLY files are allowed.`);
        continue;
      }

      try {
        // Parse the 3D file to get actual volume and dimensions
        const { volume, dimensions, geometry } = await parse3DFile(file);
        
        console.log('File parsed successfully:', file.name);
        console.log('Geometry:', geometry);
        console.log('Geometry vertices:', geometry?.attributes?.position?.count);
        
        // Calculate estimated weight based on volume and material density
        const materialDensity = selectedMaterial?.pricePerGram ? 1.24 : 1.24; // PLA density ~1.24 g/cm³
        const estimatedWeight = volume * materialDensity;
        
        // Estimate print time
        const printTime = estimatePrintTime(volume, dimensions);

        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          volume: volume,
          estimatedWeight: estimatedWeight,
          dimensions: dimensions,
          printTime: printTime,
          geometry: geometry,
        });
      } catch (error) {
        console.error('Error parsing file:', error);
        // Fallback to file size estimation if parsing fails
        const estimatedVolume = file.size / 1000; // Rough estimate in cm³
        const estimatedWeight = estimatedVolume * 1.24;
        
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          volume: estimatedVolume,
          estimatedWeight: estimatedWeight,
        });
        
        toast.warning(`Could not parse ${file.name}. Using estimated values.`);
      }
    }

    if (newFiles.length > 0) {
      console.log('Adding files to state:', newFiles.map(f => ({ name: f.name, hasGeometry: !!f.geometry })));
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Send the first file to the iframe viewer
      if (newFiles.length > 0) {
        setTimeout(() => {
          sendFileToIframe(fileArray[0]);
        }, 100);
      }
      
      toast.success(`${newFiles.length} file(s) uploaded successfully`);
    }
  }, [selectedMaterial, parse3DFile, estimatePrintTime, settings.printer, settings.infill, settings.supports]);

  // Recalculate print time when settings change
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setUploadedFiles(prev => prev.map(file => {
        if (file.volume && file.dimensions) {
          return {
            ...file,
            printTime: estimatePrintTime(file.volume, file.dimensions)
          };
        }
        return file;
      }));
    }
  }, [settings.printer, settings.infill, settings.supports, estimatePrintTime]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  // Send file to iframe viewer
  const sendFileToIframe = (file: File) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Create object URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      // Send message to iframe with file info
      iframeRef.current.contentWindow.postMessage({
        type: 'loadModel',
        fileUrl: fileUrl,
        fileName: file.name
      }, '*');
      
      // Revoke URL after a delay to allow loading
      setTimeout(() => {
        URL.revokeObjectURL(fileUrl);
      }, 10000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one STL or OBJ file');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill in all required customer information');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Order submitted:', {
        files: uploadedFiles,
        settings,
        customerInfo,
        totalPrice,
      });
      
      toast.success('Order submitted successfully! We will contact you shortly.');
      setIsSubmitting(false);
      
      // Reset form
      setUploadedFiles([]);
      setCustomerInfo({ name: '', email: '', phone: '', address: '', notes: '' });
      setCurrentStep(0);
      setExpandedSection('printer');
    }, 2000);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      const sections = ['printer', 'material', 'infill', 'finalize'];
      setExpandedSection(sections[currentStep + 1]);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const sections = ['printer', 'material', 'infill', 'finalize'];
      setExpandedSection(sections[currentStep - 1]);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(section);
    const sections = ['printer', 'material', 'infill', 'finalize'];
    setCurrentStep(sections.indexOf(section));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Robu Online FDM 3D Printing Service</h1>
            <p className="text-blue-100">Professional FDM 3D printing services with fast turnaround</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Product Info Header */}
        <div className="mb-6 bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex flex-wrap gap-6 items-start">
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Robu Online FDM 3D Printing Service</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★★★★★</span>
                  (189 customer reviews)
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  Availability: <span className="font-semibold text-green-600">In Stock</span>
                </p>
                <p>
                  For bulk orders or B2B inquiries, email us: <a href="mailto:sales@neevachi.com" className="text-primary hover:underline">sales@neevachi.com</a>
                </p>
                <p>SKU: 901845</p>
              </div>
            </div>
            
            {/* Free e-Book Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 flex items-center gap-4 min-w-[400px]">
              <div className="flex-1">
                <p className="font-medium text-gray-700 text-sm">Get your free 3D Print e-Book</p>
                <p className="text-xs text-gray-500">Learn tips and tricks for better prints</p>
              </div>
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter Email" className="w-48 h-9 text-sm" />
                <Button size="sm" className="h-9">Get e-Book</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - File Upload and Model Stats */}
          <div className="space-y-6">
            {/* File Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload 3D Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFiles.length === 0 ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Drag & drop your files here</p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept=".stl,.obj,.gltf,.glb,.fbx,.ply"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Upload Model
                      </label>
                    </Button>
                    <p className="text-xs text-gray-400 mt-4">Supported formats: STL, OBJ, GLTF, GLB, FBX, PLY</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* 3D Model Viewer - Iframe */}
                    {uploadedFiles.length > 0 && (
                      <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                        <iframe
                          ref={iframeRef}
                          src="/3d-viewer.html"
                          className="w-full h-[500px]"
                          title="3D Model Viewer"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    )}
                    
                    {/* Uploaded Files List */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Uploaded Files</h4>
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-4 h-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB • Est. {file.estimatedWeight?.toFixed(1)}g
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Add more files button */}
                    <div>
                      <input
                        type="file"
                        id="file-upload-more"
                        multiple
                        accept=".stl,.obj,.gltf,.glb,.fbx,.ply"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <label htmlFor="file-upload-more" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Add More Files
                        </label>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* File Unit and Rotation */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* File Unit */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">File Unit</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="fileUnit"
                          value="mm"
                          checked={fileUnit === 'mm'}
                          onChange={(e) => setFileUnit(e.target.value as 'mm' | 'inch')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">MM</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="fileUnit"
                          value="inch"
                          checked={fileUnit === 'inch'}
                          onChange={(e) => setFileUnit(e.target.value as 'mm' | 'inch')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Inch</span>
                      </label>
                    </div>
                  </div>

                  {/* Rotation */}
                  <div>
                    <Label className="text-sm font-semibold mb-2 block">Rotation</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="X"
                        value={rotation.x}
                        onChange={(e) => setRotation({ ...rotation, x: parseFloat(e.target.value) || 0 })}
                        className="w-16 h-9 text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Y"
                        value={rotation.y}
                        onChange={(e) => setRotation({ ...rotation, y: parseFloat(e.target.value) || 0 })}
                        className="w-16 h-9 text-sm"
                      />
                      <Button size="sm" className="h-9">Apply</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model Stats */}
            {uploadedFiles.length > 0 && uploadedFiles[0].volume && uploadedFiles[0].dimensions && uploadedFiles[0].printTime && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Box className="w-5 h-5" />
                    Model Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Material Volume:</span>
                      <span className="font-semibold">{uploadedFiles[0].volume.toFixed(2)} cm³</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Model Dimensions:</span>
                      <span className="font-semibold">
                        {uploadedFiles[0].dimensions.x.toFixed(2)} x {uploadedFiles[0].dimensions.y.toFixed(2)} x {uploadedFiles[0].dimensions.z.toFixed(2)} cm
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Print Time (hh:mm:ss):
                      </span>
                      <span className="font-semibold">{uploadedFiles[0].printTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Step Wizard */}
          <div className="space-y-4">
          {/* Printer Section */}
          <Card className={`border-2 ${expandedSection === 'printer' ? 'border-primary' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleSection('printer')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Printer className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Printer</h3>
                  <p className="text-sm text-gray-500">{selectedPrinter?.name}</p>
                </div>
              </div>
              {expandedSection === 'printer' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'printer' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="space-y-3 mt-4">
                      {PRINTER_OPTIONS.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            settings.printer === option.id
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="printer"
                            value={option.id}
                            checked={settings.printer === option.id}
                            onChange={(e) => setSettings({ ...settings, printer: e.target.value })}
                            className="w-4 h-4 text-primary"
                          />
                          <div className="ml-3">
                            <div className="font-medium">{option.name}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button onClick={handleNextStep}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Material Section */}
          <Card className={`border-2 ${expandedSection === 'material' ? 'border-primary' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleSection('material')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Material</h3>
                  <p className="text-sm text-gray-500">{selectedMaterial?.name} - {settings.color}</p>
                </div>
              </div>
              {expandedSection === 'material' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'material' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="space-y-4 mt-4">
                      {/* Material Selection */}
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Material Type</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {MATERIALS.map((material) => (
                            <button
                              key={material.id}
                              onClick={() => setSettings({ ...settings, material: material.id, color: material.colors[0] })}
                              className={`p-3 border-2 rounded-lg text-left transition-all ${
                                settings.material === material.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="font-medium">{material.name}</div>
                              <div className="text-xs text-gray-500">{material.description}</div>
                              <div className="text-xs text-primary mt-1">₹{(material.pricePerGram * 100).toFixed(0)}/100g</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Selection */}
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Color</Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedMaterial?.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setSettings({ ...settings, color })}
                              className={`px-3 py-1.5 rounded-full border-2 text-sm transition-all ${
                                settings.color === color
                                  ? 'border-primary bg-primary text-primary-foreground'
                                  : 'border-gray-300 hover:border-primary'
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button onClick={handleNextStep}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Infill Section */}
          <Card className={`border-2 ${expandedSection === 'infill' ? 'border-primary' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleSection('infill')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Infill</h3>
                  <p className="text-sm text-gray-500">{settings.infill}% density</p>
                </div>
              </div>
              {expandedSection === 'infill' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'infill' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="space-y-4 mt-4">
                      {/* Infill Percentage */}
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="text-sm font-semibold">Infill Density</Label>
                          <Badge variant="secondary">{settings.infill}%</Badge>
                        </div>
                        <Slider
                          value={[settings.infill]}
                          onValueChange={(value) => setSettings({ ...settings, infill: value[0] })}
                          min={10}
                          max={100}
                          step={10}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Light (10%)</span>
                          <span>Standard (30%)</span>
                          <span>Solid (100%)</span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSettings({ ...settings, quantity: Math.max(1, settings.quantity - 1) })}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={settings.quantity}
                            onChange={(e) => setSettings({ ...settings, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                            className="w-20 text-center"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSettings({ ...settings, quantity: settings.quantity + 1 })}
                          >
                            +
                          </Button>
                        </div>
                      </div>

                      {/* Supports */}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <Label className="text-sm font-semibold">Generate Supports</Label>
                          <p className="text-xs text-gray-500">Add support structures for overhangs</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.supports}
                          onChange={(e) => setSettings({ ...settings, supports: e.target.checked })}
                          className="w-5 h-5 rounded"
                        />
                      </div>

                      {/* Post Processing */}
                      <div>
                        <Label className="text-sm font-semibold mb-2 block">Post Processing</Label>
                        <Select value={settings.postProcessing} onValueChange={(value) => setSettings({ ...settings, postProcessing: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="sanding">Sanding (+₹50)</SelectItem>
                            <SelectItem value="painting">Painting (+₹100)</SelectItem>
                            <SelectItem value="assembly">Assembly (+₹75)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button onClick={handleNextStep}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Finalize Section */}
          <Card className={`border-2 ${expandedSection === 'finalize' ? 'border-primary' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleSection('finalize')}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Finalize</h3>
                  <p className="text-sm text-gray-500">Review and submit order</p>
                </div>
              </div>
              {expandedSection === 'finalize' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            <AnimatePresence>
              {expandedSection === 'finalize' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="pt-0 pb-6 px-6">
                    <div className="space-y-4 mt-4">
                      {/* Price Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <h4 className="font-semibold">Price Summary</h4>
                        {uploadedFiles.length === 0 ? (
                          <p className="text-sm text-gray-500">Upload files to see pricing</p>
                        ) : (
                          <>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Material ({selectedMaterial?.name})</span>
                                <span className="font-medium">
                                  {uploadedFiles.reduce((acc, f) => acc + (f.estimatedWeight || 0), 0).toFixed(1)}g
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Printer Quality</span>
                                <Badge variant="outline">x{selectedPrinter?.multiplier}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Infill ({settings.infill}%)</span>
                                <Badge variant="outline">x{INFILL_OPTIONS.find(i => i.value === settings.infill)?.multiplier}</Badge>
                              </div>
                              {settings.supports && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Supports</span>
                                  <Badge variant="outline">x1.1</Badge>
                                </div>
                              )}
                              {settings.postProcessing !== 'none' && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Post Processing</span>
                                  <span className="font-medium">
                                    +₹{settings.postProcessing === 'sanding' ? '50' : settings.postProcessing === 'painting' ? '100' : '75'}
                                  </span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-gray-600">Quantity</span>
                                <span className="font-medium">x{settings.quantity}</span>
                              </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">Total</span>
                              <span className="text-xl font-bold text-primary">₹{totalPrice.toFixed(2)}</span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Customer Information */}
                      <div className="space-y-3">
                        <h4 className="font-semibold">Customer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="name" className="text-sm">Full Name *</Label>
                            <Input
                              id="name"
                              value={customerInfo.name}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                              placeholder="John Doe"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-sm">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              placeholder="john@example.com"
                              className="mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="phone" className="text-sm">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address" className="text-sm">Delivery Address</Label>
                          <Textarea
                            id="address"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                            placeholder="Enter your delivery address"
                            rows={2}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes" className="text-sm">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                            placeholder="Any special requirements or instructions"
                            rows={2}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || uploadedFiles.length === 0}
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>Processing...</>
                        ) : (
                          <>
                            Submit Order
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
        </div>

        {/* Footer Information Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-1">Have a Bulk Order?</h4>
              <p className="text-xs text-gray-600 mb-2">Get special pricing for large orders</p>
              <a href="mailto:sales@neevachi.com" className="text-primary text-sm hover:underline">Click Here</a>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-1">Need Support?</h4>
              <p className="text-xs text-gray-600 mb-2">Our team is here to help you</p>
              <a href="/contact" className="text-primary text-sm hover:underline">Click Here</a>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-1">15 Days Warranty</h4>
              <p className="text-xs text-gray-600 mb-2">Against sealed product defects</p>
              <a href="/about" className="text-primary text-sm hover:underline">Click Here</a>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-1">Free Delivery Above ₹999</h4>
              <p className="text-xs text-gray-600 mb-2">Standard delivery on eligible orders</p>
              <a href="/contact" className="text-primary text-sm hover:underline">Click Here</a>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="pt-4">
              <h4 className="font-semibold text-sm mb-1">Cash on Delivery*</h4>
              <p className="text-xs text-gray-600 mb-2">Pay when you receive your order</p>
              <a href="/contact" className="text-primary text-sm hover:underline">Click Here</a>
            </CardContent>
          </Card>
        </div>

        {/* Description Section */}
        <div className="mt-8">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-primary text-primary">Description</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Specification</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Reviews</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Related Articles</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Terms Of Services</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">Other Info</button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">QnA</button>
            </nav>
          </div>

          <div className="mt-6 text-sm text-gray-700 space-y-4">
            {/* Introductory Text */}
            <div>
              <p className="text-lg font-semibold mb-2">Welcome to India's Instant Quotation Online 3D Printing Service by Neevachi!</p>
              <p className="mb-3">
                With our belief in the ingenuity of our creators, we have launched an online service with the tagline "Your Ideas-Our Parts", enabling us to bring your innovative concepts to life at the most affordable rates. We employ advanced FDM 3D printing machinery and top-quality filaments from brands like eSun and ProOrange to ensure superior output.
              </p>
            </div>

            {/* Printer Specifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Printer Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Build Volume:</span>
                  <span className="font-medium">220 x 220 x 250 mm</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Filament Diameter:</span>
                  <span className="font-medium">1.75 mm</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Nozzle Diameter:</span>
                  <span className="font-medium">0.4 mm / 0.6 mm</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Infill Pattern:</span>
                  <span className="font-medium">Grid, Triangular, Honeycomb</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Supported Materials:</span>
                  <span className="font-medium">PLA, ABS, PETG, ASA, TPU</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Supported Wall Thickness:</span>
                  <span className="font-medium">0.8 mm - 3.2 mm</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Assembly Tolerance:</span>
                  <span className="font-medium">±0.2 mm</span>
                </div>
                <div className="flex justify-between p-2 bg-white rounded">
                  <span className="text-gray-600">Dimensional Accuracy:</span>
                  <span className="font-medium">±0.1 mm</span>
                </div>
              </div>
            </div>

            {/* Service Steps */}
            <div>
              <h3 className="font-semibold text-lg mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-medium">Step 1</p>
                  <p className="text-sm text-gray-600">Upload Design</p>
                  <ArrowRight className="w-5 h-5 mx-auto mt-2 text-gray-400" />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Printer className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-medium">Step 2</p>
                  <p className="text-sm text-gray-600">Select Printer, Material & Infill</p>
                  <ArrowRight className="w-5 h-5 mx-auto mt-2 text-gray-400" />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-medium">Step 3</p>
                  <p className="text-sm text-gray-600">Add to Cart</p>
                  <ArrowRight className="w-5 h-5 mx-auto mt-2 text-gray-400" />
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-medium">Step 4</p>
                  <p className="text-sm text-gray-600">Checkout</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Lead time:</strong> From 1 Business Day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>3D Printing Type:</strong> FDM Printing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Materials:</strong> FDM 3D printing with PLA, ASA, ABS, and PETG material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Multicolor printing:</strong> Choose from 35+ different colors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Production:</strong> Rapid prototyping & full-scale production</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Support:</strong> Dedicated customer support team</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span><strong>IP Protection:</strong> Your designs are safe with us</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Printer className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintingService;
