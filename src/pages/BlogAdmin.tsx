// ============================================
// API CONNECTION: Blog Posts Management
// Backend: /admin/posts
// ============================================
import { blogAPI } from '@/lib/api/admin';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Plus } from 'lucide-react';

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    image: '',
    isActive: true,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await blogAPI.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await blogAPI.updatePost(editingPost._id, formData);
      } else {
        await blogAPI.createPost(formData);
      }
      setIsModalOpen(false);
      setEditingPost(null);
      setFormData({
        title: '',
        content: '',
        author: '',
        category: '',
        image: '',
        isActive: true,
      });
      fetchPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      image: post.image,
      isActive: post.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogAPI.deletePost(id);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Blog Posts Management</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post._id} className={!post.isActive ? 'opacity-50' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <Switch
                  checked={post.isActive}
                  onCheckedChange={() => {
                    const updatedPost = { ...post, isActive: !post.isActive };
                    blogAPI.updatePost(post._id, updatedPost).then(fetchPosts);
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
                <div className="text-sm">
                  <p><strong>Author:</strong> {post.author}</p>
                  <p><strong>Category:</strong> {post.category}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post._id)}
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
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <CardTitle>{editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}</CardTitle>
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
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    rows={10}
                  />
                </div>
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
                  <Button type="submit">{editingPost ? 'Update' : 'Create'}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingPost(null);
                      setFormData({
                        title: '',
                        content: '',
                        author: '',
                        category: '',
                        image: '',
                        isActive: true,
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
