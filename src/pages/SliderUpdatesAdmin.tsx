import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus, Trophy, Users, Building, Settings, Award } from 'lucide-react';
import { sliderUpdatesAPI } from '@/lib/api/admin';

const iconOptions = [
  { value: 'Trophy', label: 'Trophy', icon: Trophy },
  { value: 'Users', label: 'Users', icon: Users },
  { value: 'Building', label: 'Building', icon: Building },
  { value: 'Settings', label: 'Settings', icon: Settings },
  { value: 'Award', label: 'Award', icon: Award },
];

export default function SliderUpdatesAdmin() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    teamName: '',
    position: '',
    schoolName: '',
    category: '',
    image: '',
    icon: 'Trophy',
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const data = await sliderUpdatesAPI.getSliderUpdates();
      setUpdates(data);
    } catch (error) {
      console.error('Error fetching slider updates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUpdate) {
        await sliderUpdatesAPI.updateSliderUpdate(editingUpdate._id, formData);
      } else {
        await sliderUpdatesAPI.createSliderUpdate(formData);
      }
      setIsModalOpen(false);
      setEditingUpdate(null);
      setFormData({
        title: '',
        teamName: '',
        position: '',
        schoolName: '',
        category: '',
        image: '',
        icon: 'Trophy',
        isActive: true,
        order: 0,
      });
      fetchUpdates();
    } catch (error) {
      console.error('Error saving slider update:', error);
    }
  };

  const handleEdit = (update) => {
    setEditingUpdate(update);
    setFormData({
      title: update.title,
      teamName: update.teamName,
      position: update.position,
      schoolName: update.schoolName,
      category: update.category,
      image: update.image,
      icon: update.icon,
      isActive: update.isActive,
      order: update.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this slider update?')) {
      try {
        await sliderUpdatesAPI.deleteSliderUpdate(id);
        fetchUpdates();
      } catch (error) {
        console.error('Error deleting slider update:', error);
      }
    }
  };

  const handleToggle = async (id) => {
    try {
      await sliderUpdatesAPI.toggleSliderUpdate(id);
      fetchUpdates();
    } catch (error) {
      console.error('Error toggling slider update:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Slider Updates Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Update
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {updates.map((update) => (
          <Card key={update._id} className={!update.isActive ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{update.title}</CardTitle>
                <Switch
                  checked={update.isActive}
                  onCheckedChange={() => handleToggle(update._id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="text-sm">
                  <p><strong>Team:</strong> {update.teamName}</p>
                  <p><strong>Position:</strong> {update.position}</p>
                  <p><strong>School:</strong> {update.schoolName}</p>
                  <p><strong>Category:</strong> {update.category}</p>
                  <p><strong>Icon:</strong> {update.icon}</p>
                  <p><strong>Order:</strong> {update.order}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(update)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(update._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <CardTitle>{editingUpdate ? 'Edit Slider Update' : 'Add New Slider Update'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={formData.schoolName}
                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit">{editingUpdate ? 'Update' : 'Create'}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingUpdate(null);
                      setFormData({
                        title: '',
                        teamName: '',
                        position: '',
                        schoolName: '',
                        category: '',
                        image: '',
                        icon: 'Trophy',
                        isActive: true,
                        order: 0,
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
