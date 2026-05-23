import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ArrowLeft, FileText, Plus, Upload } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
};

export default function Blogs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("read");
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Getting Started with Web Development",
      content: "This is a sample blog post about getting started with web development...",
      createdAt: "2025-01-01",
    },
  ]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content,
      image: image ? URL.createObjectURL(image) : undefined,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setBlogPosts([newPost, ...blogPosts]);
    setTitle("");
    setContent("");
    setImage(null);
    setActiveTab("read");
  };

  const handleViewPost = (post: BlogPost) => {
    setViewingPost(post);
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setViewingPost(null);
  };

  if (viewingPost) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBackToList}
          className="mb-6 flex items-center gap-2 text-foreground hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Button>
        
        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">{viewingPost.title}</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Published on {new Date(viewingPost.createdAt).toLocaleDateString()}
          </p>
          {viewingPost.image && (
            <img 
              src={viewingPost.image} 
              alt={viewingPost.title} 
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          <div className="prose-invert">
            {viewingPost.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">Read our latest articles and share your thoughts</p>
        </div>
        <Button 
          onClick={() => setActiveTab("write")} 
          variant="outline"
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="max-w-4xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2 max-w-xs mx-auto mb-8">
          <TabsTrigger value="read">Read Blogs</TabsTrigger>
          <TabsTrigger value="write">Write a Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="read" className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Posted on {post.createdAt}</span>
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="link" 
                  className="p-0 h-auto"
                  onClick={() => handleViewPost(post)}
                >
                  Read more →
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {blogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts yet. Be the first to write one!</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="write">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Blog Post</CardTitle>
              <CardDescription>
                Share your thoughts, ideas, and knowledge with our community.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog post here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <label
                      htmlFor="image"
                      className="flex-1 flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                    >
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {image ? image.name : "Click to upload an image"}
                      </span>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setActiveTab("read");
                    setTitle("");
                    setContent("");
                    setImage(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="w-4 h-4 mr-2" />
                  Publish Post
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
