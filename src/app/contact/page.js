import ContactForm from '../../components/ContactForm'
import ContactInfo from '../../components/ContactInfo'

export const metadata = {
  title: 'Contact | Your Name',
  description: 'Get in touch with me for collaborations, projects, or just to say hello.',
}

export default function Contact() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'd love to hear from you! Whether you have a project in mind, 
            want to collaborate, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ContactInfo />
          
          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  )
}