"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Mail, Trash2, Eye, EyeOff, Calendar, User } from 'lucide-react'
import { supabase } from '../../../lib/supabase'

export default function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) setContacts(data || [])
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (!error) fetchContacts()
  }

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">View and manage contact form submissions</p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {contacts.length} Total Messages
        </Badge>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold">{contacts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">
                  {contacts.filter(contact => {
                    const contactDate = new Date(contact.created_at)
                    const currentDate = new Date()
                    return contactDate.getMonth() === currentDate.getMonth() && 
                           contactDate.getFullYear() === currentDate.getFullYear()
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <User className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unique Contacts</p>
                <p className="text-2xl font-bold">
                  {new Set(contacts.map(contact => contact.email)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {contact.email}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(contact.created_at)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpanded(contact.id)}
                    className="flex items-center gap-1"
                  >
                    {expandedId === contact.id ? (
                      <>
                        <EyeOff size={14} />
                        Hide
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        View
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your Message&body=Hi ${contact.name},%0D%0A%0D%0AThank you for your message...`)}
                    className="flex items-center gap-1"
                  >
                    <Mail size={14} />
                    Reply
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                    Delete
                  </Button>
                </div>
              </div>

              {/* Message Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 line-clamp-2">
                  {contact.message}
                </p>
              </div>

              {/* Expanded Message */}
              {expandedId === contact.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-2">Full Message:</h4>
                  <div className="bg-white border rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {contact.message}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your Message&body=Hi ${contact.name},%0D%0A%0D%0AThank you for your message...`)}
                    >
                      Send Reply Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(contact.email)}
                    >
                      Copy Email
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {contacts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Mail className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages Yet</h3>
            <p className="text-gray-500 mb-4">
              Contact form submissions will appear here when visitors send messages.
            </p>
            <Button variant="outline" asChild>
              <a href="/contact" target="_blank" rel="noopener noreferrer">
                View Contact Page
              </a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {contacts.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  const emails = contacts.map(c => c.email).join(';')
                  window.open(`mailto:?bcc=${emails}&subject=Newsletter Update`)
                }}
              >
                Email All Contacts
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Name,Email,Message,Date\n"
                    + contacts.map(c => `"${c.name}","${c.email}","${c.message}","${c.created_at}"`).join("\n")
                  
                  const encodedUri = encodeURI(csvContent)
                  const link = document.createElement("a")
                  link.setAttribute("href", encodedUri)
                  link.setAttribute("download", "contacts.csv")
                  link.click()
                }}
              >
                Export as CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}