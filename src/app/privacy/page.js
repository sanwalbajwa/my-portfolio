export const metadata = {
  title: 'Privacy Policy | Sanwal Bajwa',
  description: 'Privacy policy for Sanwal Bajwa portfolio website',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy describes how Sanwal Bajwa (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;) collects, uses, and protects your information when you visit my portfolio website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information I Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Information You Provide</h3>
              <p className="text-gray-700 mb-4">
                When you contact me through the contact form, I collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Your name</li>
                <li>Email address</li>
                <li>Message content</li>
                <li>Any other information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4">
                When you visit my website, I may automatically collect:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How I Use Your Information</h2>
              <p className="text-gray-700 mb-4">I use the collected information to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Respond to your inquiries and contact requests</li>
                <li>Improve my website and user experience</li>
                <li>Analyze website usage and performance</li>
                <li>Communicate about potential projects or collaborations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 mb-4">
                I do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>To comply with legal obligations</li>
                <li>To protect my rights and safety</li>
                <li>With trusted service providers who assist in website operation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">
                I implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                My website may use cookies and similar tracking technologies to enhance user experience and analyze website performance. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                This website uses Supabase for data storage and Vercel for hosting. Please review their privacy policies for information about their data practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 mb-4">
                I may update this Privacy Policy periodically. The updated version will be indicated by a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy, please contact me at:
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