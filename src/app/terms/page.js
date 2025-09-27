export const metadata = {
  title: 'Terms of Service | Sanwal Bajwa',
  description: 'Terms of service for Sanwal Bajwa portfolio website',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily download one copy of the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-700 mb-4">
                The materials on this website are provided on an &apos;as is&apos; basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
              <p className="text-gray-700 mb-4">
                In no event shall Sanwal Bajwa or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if I or my authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accuracy of Materials</h2>
              <p className="text-gray-700 mb-4">
                The materials appearing on this website could include technical, typographical, or photographic errors. I do not warrant that any of the materials on its website are accurate, complete, or current. I may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Links</h2>
              <p className="text-gray-700 mb-4">
                I have not reviewed all of the sites linked to my website and am not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by me of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
              <p className="text-gray-700 mb-4">
                I may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                All content, features, and functionality on this website, including but not limited to text, graphics, logos, images, and software, are the exclusive property of Sanwal Bajwa and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content</h2>
              <p className="text-gray-700 mb-4">
                By submitting content through contact forms or other means, you grant me a non-exclusive, royalty-free, perpetual license to use, modify, and display such content for the purpose of responding to your inquiry and improving the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Professional Services</h2>
              <p className="text-gray-700 mb-4">
                Information about my professional services is provided for informational purposes only. Any formal engagement for professional services will be governed by a separate written agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These terms and conditions are governed by and construed in accordance with the laws of Pakistan, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact me at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> sanwalbajwa@example.com<br />
                  <strong>Website:</strong> sanwalbajwa.com
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}