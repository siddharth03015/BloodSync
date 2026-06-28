import Link from 'next/link';
import FallbackImage from '../components/FallbackImage';

export const metadata = {
  title: 'Blood Donation Process | B-Sync',
  description: 'Learn about the step-by-step blood donation process.',
};

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Aligned Right */}
        <div className="flex justify-end mb-12">
          <div className="inline-block">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pb-2">
              Blood Donation Process
            </h1>
            <div className="h-[2px] w-full bg-red-600"></div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Text Column */}
          <div className="flex-1">
            <div className="mb-10 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4">
                The Process Of Blood Donation
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
                The entire experience of giving blood, from start to finish, requires roughly sixty minutes. The actual act of donation itself, however, generally only takes between 8 to 10 minutes.
              </p>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-3">
                  1. Registration
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
                  <li>We&apos;ll sign you in and go over basic eligibility.</li>
                  <li>You&apos;ll be asked to show ID, such as your aadhar card.</li>
                  <li>You&apos;ll read some information about donating blood.</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-3">
                  2. Any Medical History
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
                  <li>You&apos;ll answer a few questions about your health history and places you&apos;ve traveled, during a private and confidential interview.</li>
                  <li>You&apos;ll tell us about any prescription and/or over the counter medications that may be in your system.</li>
                  <li>We&apos;ll check your temperature, pulse, blood pressure and hemoglobin level.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-3">
                  3. Now its Time For Donation
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
                  <li>If you&apos;re donating whole blood, we&apos;ll cleanse an area on your arm and insert a brand new sterile needle for the blood draw. (This feels like a quick pinch and is over in seconds.)</li>
                  <li>Other types of donations, such as platelets, are made using an apheresis machine which will be connected to both arms.</li>
                  <li>A whole blood donation takes about 8-10 minutes, during which you&apos;ll be seated comfortably or lying down.</li>
                  <li>When approximately a pint of whole blood has been collected, the donation is complete and a staff person will place a bandage on your arm.</li>
                  <li>For platelets, the apheresis machine will collect a small amount of blood, remove the platelets, and return the rest of the blood through your other arm; this cycle will be repeated several times over about 2 hours.</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-3">
                  4. Post Donation
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 dark:text-slate-400 marker:text-slate-400">
                  <li>After donating blood, you&apos;ll have a snack and something to drink in the refreshment area.</li>
                  <li>You&apos;ll leave after 10-15 minutes and continue your normal routine.</li>
                  <li>Enjoy the feeling of accomplishment knowing you are helping to save lives.</li>
                  <li>Take a selfie, or simply share your good deed with friends. It may inspire them to become blood donors.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 lg:-mt-[110px]">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden shadow-md bg-white border border-neutral-100 dark:border-neutral-800 flex items-center justify-center">
              <FallbackImage 
                src="/process-donation.png" 
                alt="Nurse drawing blood from a donor" 
                className="w-full h-full object-contain p-4"
                fallbackEmoji="🏥💉"
                fallbackText="Image Placeholder"
                fallbackHint="Please add process-donation.png<br/>to your public folder"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
