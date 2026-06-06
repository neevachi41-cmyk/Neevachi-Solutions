import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Product, products, categories } from '@/types/product';
import { CustomProductModal } from '../components/CustomProductModal';

import { Filter, Heart, Plus, Search, ShoppingCart, Star, X } from 'lucide-react';

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [isCustomProductModalOpen, setIsCustomProductModalOpen] = useState(false);

  // Separate custom products from regular products
  const [regularProducts, customProducts] = products.reduce((acc, product) => {
    if (product.isCustomProduct) {
      acc[1].push(product);
    } else {
      acc[0].push(product);
    }
    return acc;
  }, [[], []] as [Product[], Product[]]);

  // Filter regular products based on category, search query, and price range
  const filteredProducts = regularProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Define the type for custom product data
  interface CustomProductData {
    productType: string;
    description: string;
    quantity: number;
    specialRequirements: string;
  }

  // Handle custom product submission
  const handleCustomProductSubmit = (data: CustomProductData) => {
    // In a real app, you would send this to your backend
    console.log('Custom product request:', data);
    
    // Show success message
    alert('Custom product request received! Our team will review your requirements and get back to you within 24 hours.');
    
    // Close the modal
    setIsCustomProductModalOpen(false);
  };

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Keep custom products at the end
    if (a.isCustomProduct) return 1;
    if (b.isCustomProduct) return -1;
    
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-bold mb-4"
          >
            Shop With Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl mb-8"
          >
            Discover amazing products at great prices
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 inline-block mr-1" />
                Filters
              </button>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg mt-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 p-2 border rounded"
                        min="0"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 p-2 border rounded"
                        min={priceRange[0]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
        {/* Category Cards Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 20).map((category) => (
              <Link
                key={category.id}
                to={`/shop/category/${category.id}`}
                className="cursor-pointer rounded-lg overflow-hidden transition-all hover:shadow-lg hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-base truncate">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.count} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Regular Products Section - Only show when a specific category is selected */}
        {selectedCategory !== 'all' && (
          <div className="mb-8">

            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-center">
                {categories.find(c => c.id === selectedCategory)?.name}
                <span className="text-sm text-gray-500 ml-2">({filteredProducts.length})</span>
              </h2>
              <div className="flex items-center mt-4">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2">Sort by:</label>
                <select
                  id="sort"
                  className="border rounded p-1.5 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Custom Products Section */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Need Something Special?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Can't find exactly what you're looking for? We can create a custom solution tailored to your needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {customProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 hover:bg-blue-50"
              onClick={() => window.location.href = '/request-custom-product'}
            >
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Plus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 text-center">Request Custom Product</h3>
              <p className="text-sm text-gray-500 text-center mt-2">Let's discuss your requirements and create something unique for you!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  if (product.isCustomProduct) {
    const handleCustomProductClick = () => {
      if (product.name === '3D Printing') {
        window.location.href = '/printing-service';
      } else if (product.name === 'Custom PCB Design') {
        window.location.href = '/pcb-quotation';
      }
    };

    return (
      <div
        className="bg-gray-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center justify-center p-8 text-center cursor-pointer"
        onClick={handleCustomProductClick}
      >
        <div className="bg-blue-100 p-4 rounded-full mb-4">
          <Plus className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">Click to configure your custom solution</p>
        <button
          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          onClick={(e) => {
            e.stopPropagation();
            handleCustomProductClick();
          }}
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Sale
          </span>
        )}
        <button
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md transition-opacity ${
            isHovered || isWishlisted ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsWishlisted(!isWishlisted)}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart 
            className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Link 
            to={`/shop/product/${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
