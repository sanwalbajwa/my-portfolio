import { supabase } from '../../lib/supabase'
import CertificateCard from '../../components/CertificateCard'

export default async function Certificates() {
  // Fetch certificates from Supabase
  const { data: certificates, error } = await supabase
    .from('certificates')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching certificates:', error)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Certificates & Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional certifications and achievements that showcase my commitment 
            to continuous learning and skill development.
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates && certificates.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No certificates found.</p>
            <p className="text-gray-400 mt-2">Certificates will appear here once added to the database.</p>
          </div>
        )}
      </div>
    </div>
  )
}