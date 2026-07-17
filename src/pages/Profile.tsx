import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Shield, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    gstin: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        company: user.company || '',
        gstin: user.gstin || '',
      });
    }
  }, [user]);

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    // For now, we'll just update the local state
    setIsEditing(false);
    // You could also update the auth context here
  };

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        company: user.company || '',
        gstin: user.gstin || '',
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <div className="w-20"></div>
          </div>

          {/* Profile Overview Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mr-6">
                  {profileData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                  <p className="text-gray-600">{profileData.email}</p>
                  {user.role === 'admin' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.name || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.email || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  {isEditing ? (
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <Shield className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.company || 'Not provided'}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.address || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="gstin">GSTIN</Label>
                  {isEditing ? (
                    <Input
                      id="gstin"
                      value={profileData.gstin}
                      onChange={(e) => setProfileData({ ...profileData, gstin: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center text-gray-900">
                      <Shield className="h-4 w-4 mr-2 text-gray-400" />
                      {profileData.gstin || 'Not provided'}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Member Since</Label>
                  <div className="mt-1 flex items-center text-gray-900">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/my-quotations')}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">My Quotations</h3>
                    <p className="text-sm text-gray-600">View your orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/my-projects')}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">My Projects</h3>
                    <p className="text-sm text-gray-600">View your projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {user.role === 'admin' && (
              <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin')}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Shield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">Admin Dashboard</h3>
                      <p className="text-sm text-gray-600">Manage site content</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
