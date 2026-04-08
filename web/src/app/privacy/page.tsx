import Link from "next/link";
import StickyNav from "@/components/StickyNav";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">
          Privacy Policy
        </h1>
        <p className="text-[#87867f] text-sm text-center mb-16">
          Last updated: April 8, 2026
        </p>

        <div className="space-y-8 text-[#30302e] leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">1. Who We Are</h2>
            <p>
              Expo is a product of Carbonaro Media LLC, a Michigan limited liability company. Expo is an
              SMS-based AI business assistant built for independent restaurant owners. When we say
              &quot;Expo,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our,&quot; we mean Carbonaro Media LLC.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">2. Information We Collect</h2>
            <p className="mb-3">We collect the following categories of information:</p>
            <p className="font-semibold text-[#141413] mt-4 mb-2">Account Information</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name, email address, and mobile phone number (provided during signup)</li>
              <li>Restaurant name, type, and operating hours</li>
              <li>Password (stored as a secure hash — we never see or store your plain-text password)</li>
            </ul>
            <p className="font-semibold text-[#141413] mt-4 mb-2">Point-of-Sale Data (via Square)</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Sales totals, order details, and item-level data</li>
              <li>Labor and timecard information (clock-ins, hours worked)</li>
              <li>Payment breakdowns (cash, card, tips)</li>
            </ul>
            <p className="font-semibold text-[#141413] mt-4 mb-2">Bank Data (via Plaid)</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Account balances and recent transactions (read-only access)</li>
              <li>Deposit verification data</li>
              <li>We cannot move, transfer, or withdraw your money</li>
            </ul>
            <p className="font-semibold text-[#141413] mt-4 mb-2">Invoice Data</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Photos of supplier invoices sent via text message</li>
              <li>Extracted line items, prices, quantities, and vendor names</li>
            </ul>
            <p className="font-semibold text-[#141413] mt-4 mb-2">SMS Messages</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Text messages you send to and receive from Expo</li>
              <li>Message content is used to provide AI-powered responses and is stored to maintain conversation context</li>
            </ul>
            <p className="font-semibold text-[#141413] mt-4 mb-2">Billing Information</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment processing is handled entirely by Stripe — we do not store your credit card number, bank account details, or other payment credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To power the AI business assistant — your data is used to generate personalized, context-aware responses to your questions</li>
              <li>To generate daily morning recaps and smart business alerts</li>
              <li>To track and analyze supplier invoices and detect price changes</li>
              <li>To reconcile deposits between your POS and bank account</li>
              <li>To provide labor cost analysis and staffing insights</li>
              <li>To process your subscription billing</li>
              <li>To send you SMS messages including AI responses, recaps, alerts, invoice confirmations, and support replies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">4. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services to operate Expo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Square</strong> — to access your point-of-sale data (sales, orders, labor)</li>
              <li><strong>Plaid</strong> — to access your bank account data (balances, transactions) in read-only mode</li>
              <li><strong>Twilio</strong> — to send and receive SMS text messages</li>
              <li><strong>Anthropic (Claude)</strong> — to power AI-generated responses and analysis</li>
              <li><strong>Stripe</strong> — to process subscription payments</li>
              <li><strong>Google Cloud Vision</strong> — to read and extract text from invoice photos</li>
              <li><strong>Amazon Web Services (AWS)</strong> — to host our servers and store invoice images securely</li>
            </ul>
            <p className="mt-3">
              Each of these services has its own privacy policy governing how they handle data.
              We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">5. What We Do Not Do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not sell your personal information to anyone</li>
              <li>We do not share your data with advertisers or marketing companies</li>
              <li>We do not use your data to market third-party products to you</li>
              <li>We do not share your SMS consent or phone number with third parties for their marketing purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">6. SMS and Messaging</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Message frequency varies based on your usage — conversational messages are sent when you text us, daily recaps are sent once per morning, and alerts are sent as needed</li>
              <li>Standard message and data rates may apply depending on your carrier and plan</li>
              <li>You can opt out of all messages at any time by texting <strong>STOP</strong></li>
              <li>For help, text <strong>Contact Support</strong> and our team will reach out to you</li>
              <li>Your consent to receive messages is not shared with any third party</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">7. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active. If you cancel your subscription,
              your data is kept for 30 days in case you return, after which it is permanently deleted.
              You may request immediate deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">8. Data Security</h2>
            <p>
              We take the security of your data seriously. All connections to our servers are encrypted
              using TLS/HTTPS. Passwords are hashed using bcrypt. API tokens for Square, Plaid, and other
              integrations are stored securely and never exposed to the frontend. Access to your data
              requires authentication, and we enforce ownership checks to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Opt out of SMS messages at any time</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:carbonaromedia@gmail.com" className="text-[#d97757] hover:underline">
                carbonaromedia@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">10. Children</h2>
            <p>
              Expo is not directed at individuals under the age of 13. We do not knowingly collect
              personal information from children. If we become aware that a child under 13 has provided
              us with personal information, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will
              notify you via SMS or through our website. Your continued use of Expo after changes are
              posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your data, contact us at:
            </p>
            <p className="mt-3">
              Carbonaro Media LLC<br />
              Email:{" "}
              <a href="mailto:carbonaromedia@gmail.com" className="text-[#d97757] hover:underline">
                carbonaromedia@gmail.com
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#d4d2c9] py-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-xs text-[#87867f] space-y-2">
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="hover:text-[#141413] transition">Terms of Service</Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-[#141413] transition">Privacy Policy</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Carbonaro Media LLC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
