// ============================================
// API CONNECTION: Contact Form Management
// Backend: /contact
// ============================================
import { contactAPI } from '@/lib/api/admin';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Trash2, Calendar } from 'lucide-react';

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contactAPI.getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await contactAPI.deleteContact(id);
        fetchContacts();
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact(null);
        }
      } catch (error) {
        console.error('Error deleting contact submission:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Contact Submissions</h2>
        <Button onClick={fetchContacts}>Refresh</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <Card key={contact._id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{contact.name}</CardTitle>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(contact._id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent onClick={() => setSelectedContact(contact)}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-sm line-clamp-2">{contact.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>Contact Details</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedContact(null)}
                >
                  Close
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Name</h3>
                  <p className="text-muted-foreground">{selectedContact.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">{selectedContact.email}</p>
                </div>
                {selectedContact.phone && (
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">{selectedContact.phone}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">Message</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Submitted On</h3>
                  <p className="text-muted-foreground">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedContact._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedContact(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
