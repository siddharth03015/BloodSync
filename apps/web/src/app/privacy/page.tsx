export const metadata = {
  title: 'Privacy Policy | B-Sync',
  description: 'Privacy Policy for B-Sync.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Privacy Policy</h1>
          
          <p className="text-sm font-bold text-red-600 dark:text-red-500 mb-10 tracking-widest uppercase">Last Updated: June 2026</p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">1.</span> Information We Collect
              </h2>
              <p>At B-Sync, we collect information you provide directly to us when you create an account, register as a donor, or request blood. This includes your name, blood group, contact number, email, and location.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">2.</span> How We Use Your Information
              </h2>
              <p>Your information is used strictly to facilitate life-saving blood donations. We use your location and blood group to match you with nearby blood requests or blood banks in need.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">3.</span> Data Sharing
              </h2>
              <p>We do not sell your personal data. We only share necessary contact information with verified blood banks, hospitals, or individuals requesting blood, explicitly to facilitate a donation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">4.</span> Security
              </h2>
              <p>We implement industry-standard security measures to protect your personal and medical information from unauthorized access, alteration, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">5.</span> Your Rights
              </h2>
              <p>You have the right to access, update, or delete your personal information at any time from your profile dashboard. If you wish to be removed from our donor registry, you may deactivate your account.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
