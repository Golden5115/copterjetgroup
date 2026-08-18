import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy of CopterJet International Limited. Explaining how we collect, use, store, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-copter-light py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-sm border-t-4 border-copter-red">
        <h1 className="text-3xl md:text-4xl font-bold text-copter-blue mb-8 border-b pb-4">Privacy Policy</h1>
        
        <div className="space-y-8 text-copter-grey text-sm md:text-base leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">1. Introduction</h2>
            <p className="mb-2">Copterjet International Limited ("Copterjet", "we", "our", or "us") respects your privacy and is committed to protecting your personal information.</p>
            <p className="mb-2">This Privacy Policy explains how we collect, use, store, disclose, and protect your personal information when you visit www.copterjetgroup.com, engage with our products or services, communicate with us, or otherwise interact with the Copterjet Group.</p>
            <p className="mb-2">As a responsible corporate organization operating across aviation, aerospace, defence, logistics, technology, and professional services, we recognize the importance of maintaining the confidentiality, integrity, and security of the information entrusted to us.</p>
            <p>By accessing or using this Website, you acknowledge that you have read and understood this Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">2. Who We Are</h2>
            <p className="mb-2">Copterjet International Limited is a company duly incorporated under the laws of the Federal Republic of Nigeria.</p>
            <div className="bg-gray-50 p-4 rounded-sm border-l-4 border-copter-blue mb-4">
              <strong>Registered Office</strong><br />
              Suite 202, Right Wing, 2nd Floor<br />
              Airport Business Hub<br />
              Murtala Muhammed International Airport Business District<br />
              International Airport Road<br />
              Ikeja, Lagos, Nigeria
            </div>
            <p>For the purposes of applicable data protection laws, Copterjet acts as the Data Controller in respect of the personal information collected through this Website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">3. Our Commitment</h2>
            <p className="mb-2">We process personal information responsibly, lawfully, fairly, and transparently in accordance with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Nigeria Data Protection Act (NDPA) 2023</li>
              <li>Nigeria Data Protection Regulation (NDPR)</li>
              <li>Applicable international privacy principles where relevant</li>
              <li>Other applicable laws and regulations governing the protection of personal information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">4. Information We Collect</h2>
            <p className="mb-4">Depending on how you interact with us, we may collect the following categories of information:</p>
            
            <h3 className="font-bold text-copter-blue mb-2">Personal Identification Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Full Name</li>
              <li>Company or Organization</li>
              <li>Job Title</li>
              <li>Email Address</li>
              <li>Telephone Number</li>
              <li>Business Address</li>
              <li>Country of Residence</li>
            </ul>

            <h3 className="font-bold text-copter-blue mb-2">Business Information</h3>
            <p className="mb-2">Where relevant, we may collect information relating to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Corporate enquiries</li>
              <li>Procurement</li>
              <li>Vendor registration</li>
              <li>Business proposals</li>
              <li>Partnership requests</li>
              <li>Customer support enquiries</li>
            </ul>

            <h3 className="font-bold text-copter-blue mb-2">Recruitment Information</h3>
            <p className="mb-2">Where you submit an employment application, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Curriculum Vitae (CV)</li>
              <li>Employment history</li>
              <li>Educational qualifications</li>
              <li>Professional certifications</li>
              <li>References</li>
              <li>Other recruitment-related information voluntarily submitted.</li>
            </ul>

            <h3 className="font-bold text-copter-blue mb-2">Technical Information</h3>
            <p className="mb-2">When you use our Website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP Address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating System</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
              <li>Date and time of visits</li>
              <li>Geographic region (where available)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">5. How We Collect Information</h2>
            <p className="mb-2">We collect information through:</p>
            <ul className="list-disc pl-6 space-y-1 grid grid-cols-1 md:grid-cols-2">
              <li>Contact forms</li>
              <li>Email correspondence</li>
              <li>Telephone enquiries</li>
              <li>Online applications</li>
              <li>Event registrations</li>
              <li>Newsletter subscriptions</li>
              <li>Cookies</li>
              <li>Website analytics</li>
              <li>Business meetings</li>
              <li>Contract negotiations</li>
              <li>Customer engagements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">6. Why We Process Your Information</h2>
            <p className="mb-2">We process personal information only where there is a lawful basis to do so. Your information may be used to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4 grid grid-cols-1 md:grid-cols-2">
              <li>Respond to enquiries</li>
              <li>Provide requested services</li>
              <li>Process contracts and business transactions</li>
              <li>Evaluate employment applications</li>
              <li>Manage customer relationships</li>
              <li>Improve our services</li>
              <li>Enhance Website functionality</li>
              <li>Communicate corporate updates</li>
              <li>Send newsletters where consent has been provided</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Detect fraud or unlawful activities</li>
              <li>Protect the security of our systems</li>
            </ul>
            <p className="font-bold border-l-4 border-copter-red pl-3">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">7. Cookies and Analytics</h2>
            <p className="mb-2">Our Website uses cookies and similar technologies to improve user experience and understand how visitors use our Website.</p>
            <p className="mb-2">Cookies help us:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Remember user preferences</li>
              <li>Improve Website performance</li>
              <li>Analyse Website traffic</li>
              <li>Monitor system security</li>
              <li>Deliver a more personalized browsing experience</li>
            </ul>
            <p className="mb-2">We may use trusted analytics services, including Google Analytics or equivalent platforms, to generate anonymous statistical reports regarding Website usage.</p>
            <p>You may disable cookies through your browser settings; however, certain Website features may not function correctly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">8. How We Share Information</h2>
            <p className="mb-2">We treat your personal information as confidential. We may disclose information only where necessary to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 grid grid-cols-1 md:grid-cols-2">
              <li>Employees with authorized access</li>
              <li>Group companies</li>
              <li>Professional advisers</li>
              <li>Technology providers</li>
              <li>Cloud hosting providers</li>
              <li>Payment processors</li>
              <li>Government agencies</li>
              <li>Regulatory authorities</li>
              <li>Law enforcement agencies where legally required</li>
            </ul>
            <p className="mb-2">All third parties engaged by Copterjet are required to maintain appropriate confidentiality and security standards.</p>
            <p className="font-bold">We never sell customer data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">9. International Data Transfers</h2>
            <p className="mb-2">Where necessary, personal information may be transferred to countries outside Nigeria for legitimate business operations, cloud hosting, technical support, or international transactions.</p>
            <p>Where such transfers occur, appropriate safeguards will be implemented to ensure your information remains adequately protected.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">10. Information Security</h2>
            <p className="mb-2">We employ appropriate administrative, organizational, technical, and physical safeguards designed to protect personal information against:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Unauthorized access</li>
              <li>Accidental loss</li>
              <li>Misuse</li>
              <li>Alteration</li>
              <li>Disclosure</li>
              <li>Destruction</li>
            </ul>
            <p className="mb-2">Our security measures are continuously reviewed to align with evolving industry standards and cyber security best practices.</p>
            <p>While we strive to protect all information entrusted to us, no method of electronic transmission or storage is completely secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">11. Data Retention</h2>
            <p className="mb-2">We retain personal information only for as long as necessary to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Deliver our services</li>
              <li>Fulfil contractual obligations</li>
              <li>Meet regulatory requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce legal rights</li>
              <li>Maintain business records</li>
            </ul>
            <p>Once information is no longer required, it is securely deleted or anonymized.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">12. Your Rights</h2>
            <p className="mb-2">Subject to applicable law, you may have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1 grid grid-cols-1 md:grid-cols-2">
              <li>Request access to your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Withdraw consent</li>
              <li>Request data portability</li>
              <li>Lodge a complaint with the appropriate data protection authority</li>
            </ul>
            <p>Requests may be submitted using the contact information below.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">13. Marketing Communications</h2>
            <p className="mb-2">Where you have consented, we may send:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Company news</li>
              <li>Industry updates</li>
              <li>Event invitations</li>
              <li>Corporate publications</li>
              <li>Marketing communications</li>
            </ul>
            <p>You may unsubscribe at any time using the unsubscribe link contained in our emails or by contacting us directly.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">14. Recruitment Privacy</h2>
            <p className="mb-2">Information submitted through our recruitment portal or careers section is used solely for recruitment and employment-related purposes.</p>
            <p className="mb-2">Application information may be shared internally with authorized recruitment personnel within the Copterjet Group.</p>
            <p>Where your application is unsuccessful, we may retain your information for future opportunities unless you request otherwise.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">15. Third-Party Websites</h2>
            <p className="mb-2">Our Website may contain links to third-party websites.</p>
            <p className="mb-2">These websites operate independently and maintain their own privacy practices.</p>
            <p className="mb-2">Copterjet is not responsible for the content, privacy policies, or security practices of external websites.</p>
            <p>We encourage users to review the privacy policies of every third-party website they visit.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">16. Children's Privacy</h2>
            <p className="mb-2">Our Website and services are intended for business and professional audiences.</p>
            <p className="mb-2">We do not knowingly collect personal information from individuals under the age of 18.</p>
            <p>If we become aware that such information has been collected inadvertently, we will promptly delete it.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">17. Changes to this Privacy Policy</h2>
            <p className="mb-2">We may update this Privacy Policy periodically to reflect changes in our business operations, legal obligations, technologies, or regulatory requirements.</p>
            <p className="mb-2">The latest version will always be published on this Website together with its effective date.</p>
            <p>Continued use of our Website constitutes acceptance of any revised Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-copter-blue mb-3">18. Contact Us</h2>
            <p className="mb-4">For questions relating to this Privacy Policy or the processing of your personal information, please contact:</p>
            
            <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-copter-blue space-y-2">
              <p><strong>Data Protection Officer</strong></p>
              <p>Copterjet International Limited</p>
              <p><strong>General Enquiries:</strong> <a href="mailto:info@copterjetgroup.com" className="text-copter-red hover:underline">info@copterjetgroup.com</a></p>
              <p><strong>Email:</strong> <a href="mailto:privacy@copterjetgroup.com" className="text-copter-red hover:underline">privacy@copterjetgroup.com</a></p>
              
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p><strong>Registered Office:</strong></p>
                <p>Suite 202, Right Wing, 2nd Floor<br />
                Airport Business Hub<br />
                Murtala Muhammed International Airport Business District<br />
                International Airport Road<br />
                Ikeja, Lagos, Nigeria</p>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-copter-light rounded-sm text-sm">
              <p><strong>Effective Date:</strong> This Privacy Policy becomes effective on the date published on the Copterjet Group Website and remains in force until amended or replaced.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
