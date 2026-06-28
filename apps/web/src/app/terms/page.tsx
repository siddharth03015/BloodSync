export const metadata = {
  title: 'Terms of Service | B-Sync',
  description: 'Terms of Service for B-Sync.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-neutral-900 rounded border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Terms of Service</h1>
          
          <p className="text-sm font-bold text-red-600 dark:text-red-500 mb-10 tracking-widest uppercase">Last Updated: June 2026</p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">1.</span> Introduction
              </h2>
              <p>Welcome to B-Sync. By accessing our platform, you agree to these terms of service. Our platform connects blood donors, blood banks, and those in need of blood across India to streamline the donation process.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">2.</span> Eligibility
              </h2>
              <p>To use our platform, you must be legally eligible to donate blood according to the guidelines set by the Government of India and the National Blood Transfusion Council (NBTC).</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">3.</span> User Responsibilities
              </h2>
              <p>Users must provide accurate and truthful medical information. B-Sync acts only as a facilitator. Final eligibility and blood screening are conducted by the respective blood banks and medical professionals at the time of donation.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">4.</span> Privacy and Data
              </h2>
              <p>We respect your privacy. Medical and contact information provided will only be shared with authorized blood banks and recipients when necessary, and in accordance with our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white flex items-center gap-2">
                <span className="text-[#c82333]">5.</span> Limitation of Liability
              </h2>
              <p>B-Sync is not a medical provider. We are not liable for any health complications, adverse reactions, or issues arising from the blood donation or transfusion process.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
