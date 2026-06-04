import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Info } from 'lucide-react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

function PcbQuotation() {
  const pcbViewerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [modelVolume, setModelVolume] = useState<string>('');
  const [modelDimensions, setModelDimensions] = useState<{ x: string; y: string; z: string; }>({ x: '', y: '', z: '' });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const currentModelRef = useRef<THREE.Group | THREE.Mesh | null>(null);
  const [formData, setFormData] = useState({
    layers: '2',
    pcbQty: '5',
    differentDesign: '01',
    deliveryFormat: 'single',
    pcbThickness: '1.6',
    pcbColor: 'green',
    surfaceFinish: 'hals',
    outerCopperWeight: '1oz',
    removeOrderNumber: 'no',
    pcbRemark: ''
  });
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Color mapping for PCB colors
  const colorMap: Record<string, number> = useMemo(() => ({
    green: 0x006400,
    red: 0xFF0000,
    yellow: 0xFFFF00,
    blue: 0x0000FF,
    white: 0xFFFFFF,
    black: 0x000000
  }), []);

  // Function to update model color
  const updateModelColor = useCallback((colorName: string) => {
    const colorHex = colorMap[colorName.toLowerCase()];
    if (!colorHex || !currentModelRef.current) return;

    const newColor = new THREE.Color(colorHex);

    // Traverse the model and update all mesh materials
    currentModelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Update the material color while preserving other properties
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.color.set(newColor);
              }
            });
          } else if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.set(newColor);
          }
        }
      }
    });
  }, [colorMap]);

  const calculatePrice = useCallback(() => {
    // Base price per PCB based on layers
    const layerPrices: Record<string, number> = {
      '1': 50,
      '2': 80,
      '4': 150
    };

    // Base price based on thickness
    const thicknessPrices: Record<string, number> = {
      '0.4': 0.8,
      '0.6': 0.9,
      '0.8': 1.0,
      '1.0': 1.1,
      '1.2': 1.2,
      '1.6': 1.3
    };

    // Base price based on surface finish
    const finishPrices: Record<string, number> = {
      'hals': 1.0,
      'leadfree': 1.1
    };

    // Base price based on copper weight
    const copperPrices: Record<string, number> = {
      '1oz': 1.0,
      '2oz': 1.3
    };

    // Calculate base price
    let basePrice = layerPrices[formData.layers] || 80;
    basePrice *= thicknessPrices[formData.pcbThickness] || 1.0;
    basePrice *= finishPrices[formData.surfaceFinish] || 1.0;
    basePrice *= copperPrices[formData.outerCopperWeight] || 1.0;

    // Apply quantity multiplier (discount for bulk orders)
    const quantity = parseInt(formData.pcbQty) || 1;
    let quantityMultiplier = 1.0;

    if (quantity >= 100) {
      quantityMultiplier = 0.7; // 30% discount for 100+
    } else if (quantity >= 50) {
      quantityMultiplier = 0.8; // 20% discount for 50+
    } else if (quantity >= 20) {
      quantityMultiplier = 0.9; // 10% discount for 20+
    } else if (quantity >= 10) {
      quantityMultiplier = 0.95; // 5% discount for 10+
    }

    const totalPrice = basePrice * quantity * quantityMultiplier;

    // Round to 2 decimal places
    setCalculatedPrice(Math.round(totalPrice * 100) / 100);
  }, [formData]);

  // Function to calculate volume and dimensions from geometry
  const calculateVolumeAndDimensions = (geometry: THREE.BufferGeometry): { volume: number; dimensions: { x: number; y: number; z: number; }; } => {
    // Calculate volume using signed tetrahedron method
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

    return { volume: volumeInCm3, dimensions };
  };

  // Function to center and scale model
  const centerAndScaleModel = (object: THREE.Object3D) => {
    // Reset all rotations first
    object.rotation.set(0, 0, 0);

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Calculate scale to fit the model in view
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2 / maxDim; // Scale to fit within 2 units
    object.scale.set(scale, scale, scale);

    // Recalculate bounding box after scaling
    const scaledBox = new THREE.Box3().setFromObject(object);
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

    // Center the scaled model at origin
    object.position.sub(scaledCenter);

    // Rotate model to lie flat on the grid (rotate -90 degrees on X and Z axes)
    object.rotation.x = -Math.PI / 2;
    object.rotation.z = -Math.PI / 2;

    // Get final bounding box after all transformations
    const finalBox = new THREE.Box3().setFromObject(object);
    const finalMin = finalBox.min;

    // Position model so its bottom sits exactly on the grid (y=0)
    object.position.y = -finalMin.y;

    // Update camera to look at origin
    if (cameraRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      cameraRef.current.lookAt(0, 0, 0);

      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  };

  // Function to handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !sceneRef.current) return;

    setUploadedFileName(file.name);
    const url = URL.createObjectURL(file);
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    // Remove existing model
    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
      currentModelRef.current = null;
    }

    // Reset volume and dimensions
    setModelVolume('');
    setModelDimensions({ x: '', y: '', z: '' });

    // Load model based on file type
    switch (fileExtension) {
      case 'glb':
      case 'gltf': {
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(url, (gltf) => {
          const model = gltf.scene;

          // Extract geometry for volume calculation
          let foundGeometry: THREE.BufferGeometry | null = null;
          model.traverse((child) => {
            if (child instanceof THREE.Mesh && !foundGeometry) {
              foundGeometry = child.geometry;
            }
          });

          if (foundGeometry) {
            const { volume, dimensions } = calculateVolumeAndDimensions(foundGeometry);
            setModelVolume(volume.toFixed(3));
            setModelDimensions({
              x: dimensions.x.toFixed(2),
              y: dimensions.y.toFixed(2),
              z: dimensions.z.toFixed(2)
            });
          }

          centerAndScaleModel(model);
          sceneRef.current?.add(model);
          currentModelRef.current = model;
        });
        break;
      }

      case 'obj': {
        const objLoader = new OBJLoader();
        objLoader.load(url, (obj) => {
          // Extract geometry for volume calculation
          let foundGeometry: THREE.BufferGeometry | null = null;
          obj.traverse((child) => {
            if (child instanceof THREE.Mesh && !foundGeometry) {
              foundGeometry = child.geometry;
            }
          });

          if (foundGeometry) {
            const { volume, dimensions } = calculateVolumeAndDimensions(foundGeometry);
            setModelVolume(volume.toFixed(3));
            setModelDimensions({
              x: dimensions.x.toFixed(2),
              y: dimensions.y.toFixed(2),
              z: dimensions.z.toFixed(2)
            });
          }

          centerAndScaleModel(obj);
          sceneRef.current?.add(obj);
          currentModelRef.current = obj;
        });
        break;
      }

      case 'stl': {
        const stlLoader = new STLLoader();
        stlLoader.load(url, (geometry) => {
          const { volume, dimensions } = calculateVolumeAndDimensions(geometry);
          setModelVolume(volume.toFixed(3));
          setModelDimensions({
            x: dimensions.x.toFixed(2),
            y: dimensions.y.toFixed(2),
            z: dimensions.z.toFixed(2)
          });

          const material = new THREE.MeshStandardMaterial({
            color: 0x006400,
            roughness: 0.7,
            metalness: 0.3
          });
          const mesh = new THREE.Mesh(geometry, material);
          centerAndScaleModel(mesh);
          sceneRef.current?.add(mesh);
          currentModelRef.current = mesh;
        });
        break;
      }

      case 'fbx': {
        const fbxLoader = new FBXLoader();
        fbxLoader.load(url, (obj) => {
          // Extract geometry for volume calculation
          let foundGeometry: THREE.BufferGeometry | null = null;
          obj.traverse((child) => {
            if (child instanceof THREE.Mesh && !foundGeometry) {
              foundGeometry = child.geometry;
            }
          });

          if (foundGeometry) {
            const { volume, dimensions } = calculateVolumeAndDimensions(foundGeometry);
            setModelVolume(volume.toFixed(3));
            setModelDimensions({
              x: dimensions.x.toFixed(2),
              y: dimensions.y.toFixed(2),
              z: dimensions.z.toFixed(2)
            });
          }

          centerAndScaleModel(obj);
          sceneRef.current?.add(obj);
          currentModelRef.current = obj;
        });
        break;
      }

      default:
        console.error('Unsupported file format:', fileExtension);
        alert('Unsupported file format. Please upload .glb, .gltf, .obj, .stl, or .fbx files.');
    }

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!pcbViewerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0d0f);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      pcbViewerRef.current.clientWidth / pcbViewerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(pcbViewerRef.current.clientWidth, pcbViewerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    pcbViewerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 0.5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI;
    controlsRef.current = controls;

    // Grid helper
    const gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Axes helper
    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, -10, -10);
    scene.add(directionalLight2);

    // PCB Model - Create a simple PCB board as placeholder
    const pcbGroup = new THREE.Group();

    // Main PCB board (use initial color from formData)
    const initialColor = colorMap[formData.pcbColor] || 0x006400;
    const boardGeometry = new THREE.BoxGeometry(4, 0.16, 3);
    const boardMaterial = new THREE.MeshStandardMaterial({
      color: initialColor,
      roughness: 0.7,
      metalness: 0.3
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    board.position.y = 0.08;
    pcbGroup.add(board);

    // Add some traces (copper lines)
    const traceMaterial = new THREE.MeshStandardMaterial({
      color: 0xb87333,
      roughness: 0.5,
      metalness: 0.8
    });

    // Create some trace lines
    for (let i = 0; i < 8; i++) {
      const traceGeometry = new THREE.BoxGeometry(3.5, 0.02, 0.05);
      const trace = new THREE.Mesh(traceGeometry, traceMaterial);
      trace.position.set(0, 0.17, -1.2 + i * 0.3);
      pcbGroup.add(trace);
    }

    // Add some components (small boxes)
    const componentMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.9
    });

    for (let i = 0; i < 12; i++) {
      const componentGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.3);
      const component = new THREE.Mesh(componentGeometry, componentMaterial);
      component.position.set(
        -1.5 + Math.random() * 3,
        0.24,
        -1.2 + Math.random() * 2.4
      );
      pcbGroup.add(component);
    }

    // Add IC chip
    const icGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.8);
    const icMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.4,
      metalness: 0.7
    });
    const ic = new THREE.Mesh(icGeometry, icMaterial);
    ic.position.set(0, 0.26, 0);
    pcbGroup.add(ic);

    // Add pins for IC
    const pinMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c0c0,
      roughness: 0.2,
      metalness: 1.0
    });

    for (let i = 0; i < 4; i++) {
      const pinGeometry = new THREE.BoxGeometry(0.05, 0.1, 0.4);
      const pin1 = new THREE.Mesh(pinGeometry, pinMaterial);
      pin1.position.set(-0.4, 0.12, -0.2 + i * 0.15);
      pcbGroup.add(pin1);

      const pin2 = new THREE.Mesh(pinGeometry, pinMaterial);
      pin2.position.set(0.4, 0.12, -0.2 + i * 0.15);
      pcbGroup.add(pin2);
    }

    scene.add(pcbGroup);
    currentModelRef.current = pcbGroup;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!pcbViewerRef.current) return;
      camera.aspect = pcbViewerRef.current.clientWidth / pcbViewerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(pcbViewerRef.current.clientWidth, pcbViewerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      const currentRenderer = rendererRef.current;
      const currentControls = controlsRef.current;
      if (currentRenderer) {
        const domElement = currentRenderer.domElement;
        if (domElement && domElement.parentNode) {
          domElement.parentNode.removeChild(domElement);
        }
        currentRenderer.dispose();
      }
      if (currentControls) {
        currentControls.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update model color when PCB color changes
  useEffect(() => {
    if (formData.pcbColor) {
      updateModelColor(formData.pcbColor);
    }
  }, [formData.pcbColor, updateModelColor]);

  // Recalculate price when form data changes
  useEffect(() => {
    calculatePrice();
  }, [formData, calculatePrice]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Service Details</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Neevachi PCB Manufacturing Service</h2>
          <p className="text-sm text-gray-600 mt-1">SKU: 1373369</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Info className="h-4 w-4" />
              <a href="#" className="hover:underline">Click to know our Capabilities</a>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form Fields */}
              <div className="lg:col-span-2 space-y-6">
                {/* Base Material */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Base Material</Label>
                  <Input placeholder="Select base material" className="max-w-md" />
                </div>

                {/* Layers */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Layers</Label>
                  <RadioGroup
                    value={formData.layers}
                    onValueChange={(value) => handleInputChange('layers', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="layer-1" />
                      <Label htmlFor="layer-1" className="cursor-pointer">1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="layer-2" />
                      <Label htmlFor="layer-2" className="cursor-pointer">2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="layer-4" />
                      <Label htmlFor="layer-4" className="cursor-pointer">4</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PCB Qty */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">PCB Qty</Label>
                  <Input
                    type="number"
                    value={formData.pcbQty}
                    onChange={(e) => handleInputChange('pcbQty', e.target.value)}
                    className="max-w-xs" />
                </div>

                {/* Different Design */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Different Design</Label>
                  <Input
                    type="number"
                    value={formData.differentDesign}
                    onChange={(e) => handleInputChange('differentDesign', e.target.value)}
                    className="max-w-xs" />
                </div>

                {/* Delivery Format */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Delivery Format</Label>
                  <RadioGroup
                    value={formData.deliveryFormat}
                    onValueChange={(value) => handleInputChange('deliveryFormat', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="single" id="delivery-single" />
                      <Label htmlFor="delivery-single" className="cursor-pointer">Single PCB</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="panel" id="delivery-panel" />
                      <Label htmlFor="delivery-panel" className="cursor-pointer">Panel by Neevachi</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PCB Thickness */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">PCB Thickness (mm)</Label>
                  <RadioGroup
                    value={formData.pcbThickness}
                    onValueChange={(value) => handleInputChange('pcbThickness', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {['0.4', '0.6', '0.8', '1.0', '1.2', '1.6'].map((thickness) => (
                      <div key={thickness} className="flex items-center space-x-2">
                        <RadioGroupItem value={thickness} id={`thickness-${thickness}`} />
                        <Label htmlFor={`thickness-${thickness}`} className="cursor-pointer">{thickness}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* PCB Color */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">PCB Color</Label>
                  <RadioGroup
                    value={formData.pcbColor}
                    onValueChange={(value) => handleInputChange('pcbColor', value)}
                    className="flex flex-wrap gap-4"
                  >
                    {['Green', 'Red', 'Yellow', 'Blue', 'White', 'Black'].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color.toLowerCase()} id={`color-${color.toLowerCase()}`} />
                        <Label htmlFor={`color-${color.toLowerCase()}`} className="cursor-pointer">{color}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Surface Finish */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Surface Finish</Label>
                  <RadioGroup
                    value={formData.surfaceFinish}
                    onValueChange={(value) => handleInputChange('surfaceFinish', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hals" id="finish-hals" />
                      <Label htmlFor="finish-hals" className="cursor-pointer">HALS(with lead)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leadfree" id="finish-leadfree" />
                      <Label htmlFor="finish-leadfree" className="cursor-pointer">Leadfree HASL - RoHS</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Outer Copper Weight */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Outer Copper Weight</Label>
                  <RadioGroup
                    value={formData.outerCopperWeight}
                    onValueChange={(value) => handleInputChange('outerCopperWeight', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1oz" id="copper-1oz" />
                      <Label htmlFor="copper-1oz" className="cursor-pointer">1oz</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2oz" id="copper-2oz" />
                      <Label htmlFor="copper-2oz" className="cursor-pointer">2oz</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Remove Order Number */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Remove Order Number</Label>
                  <RadioGroup
                    value={formData.removeOrderNumber}
                    onValueChange={(value) => handleInputChange('removeOrderNumber', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="order-yes" />
                      <Label htmlFor="order-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="order-no" />
                      <Label htmlFor="order-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PCB Remark */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">PCB Remark</Label>
                  <Textarea
                    placeholder="Leave a remark if you have any request"
                    value={formData.pcbRemark}
                    onChange={(e) => handleInputChange('pcbRemark', e.target.value)}
                    className="min-h-[100px]" />
                </div>
              </div>

              {/* Right Column - Upload and Action */}
              <div className="lg:col-span-1 space-y-6">
                {/* Upload Section */}
                <div className="space-y-2">
                  <Label className="text-base font-medium">Upload Design File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Upload or simply drag single 3D Model File into the box</p>
                    <p className="text-xs text-gray-500">Supported formats: .glb, .gltf, .obj, .stl, .fbx</p>
                    <Input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".glb,.gltf,.obj,.stl,.fbx"
                      className="mt-4 max-w-xs mx-auto" />
                    {uploadedFileName && (
                      <p className="text-sm text-green-600 mt-2">Loaded: {uploadedFileName}</p>
                    )}
                  </div>
                </div>

                {/* Model Stats */}
                {(modelVolume || modelDimensions.x) && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 text-sm">Model Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Material Volume:</span>
                        <span className="text-sm font-medium text-gray-900">{modelVolume} cm³</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Model Dimensions:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {modelDimensions.x} × {modelDimensions.y} × {modelDimensions.z} cm
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pricing Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-blue-800">
                    <Info className="h-4 w-4 inline mr-2" />
                    Manufactured PCB can be delivered to you in approx 20 days
                  </p>
                  <p className="text-xs text-blue-700">
                    Additional charges may apply for special cases.
                  </p>
                </div>

                {/* Price Display */}
                {calculatedPrice > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">Estimated Price</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Price:</span>
                      <span className="text-2xl font-bold text-green-600">₹{calculatedPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <span className="text-sm font-medium text-gray-900">{formData.pcbQty} PCBs</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Price per PCB:</span>
                      <span className="text-sm font-medium text-gray-900">₹{(calculatedPrice / (parseInt(formData.pcbQty) || 1)).toFixed(2)}</span>
                    </div>
                  </div>
                )}

                {/* Calculate Price Button */}
                <Button
                  onClick={calculatePrice}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                >
                  Calculate Price
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Details Tabs */}
        <Card className="mt-6">
          <CardContent className="p-0">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent">
                <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Description</TabsTrigger>
                <TabsTrigger value="specification" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Specification</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Reviews</TabsTrigger>
                <TabsTrigger value="related-articles" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Related Articles</TabsTrigger>
                <TabsTrigger value="terms" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Terms Of Services</TabsTrigger>
                <TabsTrigger value="other-info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">Other Info</TabsTrigger>
                <TabsTrigger value="qna" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">QnA</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">PCB Printing Service</h3>
                    <p className="text-gray-600 mb-4">
                      We provide high-quality PCB manufacturing services with advanced technology and precision.
                      Our expert team ensures that your PCB designs are manufactured to the highest standards
                      with quick turnaround times.
                    </p>
                    <h4 className="font-semibold mb-3">Why Choose Our Service:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">High-quality manufacturing with precision</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">Quick turnaround time (15-20 days)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">Competitive pricing with no hidden charges</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">Expert support and technical assistance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">Multiple layer options (1, 2, 4 layers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-600">Various color and finish options available</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center">
                    <div ref={pcbViewerRef} className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="specification" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <p className="text-gray-600">Specification details will be added here.</p>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <p className="text-gray-600">Reviews will be displayed here.</p>
              </TabsContent>

              <TabsContent value="related-articles" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Related Articles</h3>
                <p className="text-gray-600">Related articles will be listed here.</p>
              </TabsContent>

              <TabsContent value="terms" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Terms of Service</h3>
                <p className="text-gray-600">Terms and conditions will be displayed here.</p>
              </TabsContent>

              <TabsContent value="other-info" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Other Information</h3>
                <p className="text-gray-600">Additional information will be provided here.</p>
              </TabsContent>

              <TabsContent value="qna" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Questions & Answers</h3>
                <p className="text-gray-600">Q&A section will be available here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PcbQuotation;
