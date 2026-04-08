import Link from "next/link";
import StickyNav from "@/components/StickyNav";

export default function TermsOfService() {
  return (
    <div className="bg-[#e8e6dc] text-[#141413]">
      <StickyNav />

      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-center mb-2">
          Terms of Service
        </h1>
        <p className="text-[#87867f] text-sm text-center mb-16">
          Last updated: April 8, 2026
        </p>

        <div className="space-y-8 text-[#30302e] leading-relaxed text-sm">
          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">1. Overview</h2>
            <p>
              Expo is an SMS-based AI business assistant for independent restaurant owners, operated by
              Carbonaro Media LLC (&quot;Carbonaro Media,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;),
              a Michigan limited liability company. By creating an account and using Expo, you agree to
              these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">2. Eligibility</h2>
            <p>To use Expo, you must:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Be at least 18 years of age</li>
              <li>Be a restaurant owner, operator, or authorized representative</li>
              <li>Have the authority to connect your business accounts (POS, bank) to our service</li>
              <li>Have a valid mobile phone number capable of sending and receiving SMS</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">3. Your Account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your login credentials and for
              all activity that occurs under your account. You agree to notify us immediately if you
              suspect unauthorized use of your account. We are not liable for any loss resulting from
              unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">4. SMS Messaging Terms</h2>
            <p className="mb-3">
              By creating an Expo account and providing your mobile phone number, you expressly consent
              to receive SMS text messages from Expo at the phone number you provided. These messages include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AI-powered conversational responses to your questions</li>
              <li>Daily morning recaps summarizing your business performance</li>
              <li>Smart business alerts (labor, deposits, cash flow, price changes)</li>
              <li>Invoice scanning confirmations</li>
              <li>Support and account-related messages</li>
            </ul>

            <div className="bg-white border border-[#d4d2c9] rounded-lg p-5 mt-6 space-y-3">
              <p><strong>Message frequency:</strong> Varies based on your usage. Daily morning recaps are sent once per day. Alerts are sent as needed. Conversational replies are sent when you text us.</p>
              <p><strong>Message and data rates may apply.</strong> Check with your wireless carrier for details about your messaging plan.</p>
              <p><strong>To opt out:</strong> Text <strong>STOP</strong> at any time to stop receiving all SMS messages from Expo. You will receive a confirmation message and no further messages will be sent.</p>
              <p><strong>For help:</strong> Text <strong>Contact Support</strong> and a member of our team will reach out to you personally.</p>
              <p>Consent to receive messages is not a condition of purchasing any goods or services, though Expo&apos;s core functionality is delivered via SMS.</p>
              <p>Your consent and phone number will not be shared with any third party for their marketing purposes.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">5. Service Description</h2>
            <p>
              Expo connects to your Square POS system and bank account (via Plaid) to provide real-time
              business insights through text message conversations. You can ask Expo questions about your
              sales, staffing, deposits, invoices, and more. Expo uses AI to analyze your data and provide
              personalized, actionable responses.
            </p>
            <p className="mt-3">
              Expo also offers automated features including daily morning recaps, smart business alerts,
              and invoice photo scanning via text.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">6. Billing and Subscription</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Expo costs <strong>$49 per month</strong>, billed monthly through Stripe</li>
              <li>Your subscription renews automatically each month until canceled</li>
              <li>You may cancel at any time — there are no contracts, commitments, or cancellation fees</li>
              <li><strong>30-day money-back guarantee:</strong> If you are not satisfied within your first 30 days, contact us for a full refund</li>
              <li>All billing inquiries can be directed to <a href="mailto:carbonaromedia@gmail.com" className="text-[#d97757] hover:underline">carbonaromedia@gmail.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">7. Third-Party Integrations</h2>
            <p>
              Expo integrates with Square, Plaid, and other third-party services. Your use of these
              integrations is also subject to their respective terms of service and privacy policies.
              We are not responsible for the practices or policies of third-party providers. By connecting
              your accounts, you authorize Expo to access your data through these services as described in
              our <Link href="/privacy" className="text-[#d97757] hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">8. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Use Expo for any unlawful purpose</li>
              <li>Send automated, scripted, or bot-generated messages to our SMS number</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; data</li>
              <li>Use Expo to harass, abuse, or send harmful content</li>
              <li>Resell or redistribute Expo&apos;s services without our written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">9. Disclaimer and Limitation of Liability</h2>
            <p>
              Expo provides business insights and analysis based on the data available from your connected
              accounts. <strong>Expo does not provide financial, legal, tax, or investment advice.</strong> The
              information provided is for informational purposes only, and you should consult qualified
              professionals for formal business, financial, or legal decisions.
            </p>
            <p className="mt-3">
              Expo is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the
              accuracy, completeness, or timeliness of any data or AI-generated responses. To the maximum
              extent permitted by law, Carbonaro Media LLC shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of Expo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">10. Termination</h2>
            <p>
              You may cancel your subscription and close your account at any time. We reserve the right to
              suspend or terminate your access to Expo if you violate these Terms of Service or engage in
              conduct that we determine is harmful to our service, our users, or third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">11. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. If we make material changes, we will
              notify you via SMS or through our website. Your continued use of Expo after changes are posted
              constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">12. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of the
              State of Michigan, without regard to conflict of law principles. Any disputes arising from
              these terms or your use of Expo shall be resolved in the courts of the State of Michigan.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#141413] mb-4">13. Contact Us</h2>
            <p>
              If you have questions about these Terms of Service, contact us at:
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
