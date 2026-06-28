import FallbackImage from '../components/FallbackImage';

export const metadata = {
  title: 'Post Donation Process | B-Sync',
  description: 'What happens to your blood after you donate it.',
};

export default function PostDonationPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Centered */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="inline-flex flex-col items-start">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pb-2">
              What Happens to Post you Donate your Blood
            </h1>
            <div className="h-[2px] w-1/2 max-w-[200px] bg-red-600"></div>
          </div>
        </div>

        {/* Top Intro Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 max-w-5xl mx-auto">
          {/* Left Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-4">
              Explore The Process of Blood Donation
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              The steps and tests your blood goes through ensure our blood supply is as safe as possible, helping as many people as possible.
            </p>
          </div>
          
          {/* Right Image */}
          <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center">
              <FallbackImage 
                src="/post-donation.png" 
                alt="Donor squeezing a stress ball during blood donation" 
                className="w-full h-full object-contain p-4"
                fallbackEmoji="🩸"
                fallbackText="Image Placeholder"
                fallbackHint="Please add post-donation.png<br/>to your public folder"
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 1: The Donation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              You have visited blood donation center to donate blood. You are asked to fill out a health history form and a small physical. The blood is collected in several test tubes, as well as a pint of blood. Your donation, test tubes, and donor record are all marked with the same bar code. You are asked to stay after your donation to complete a questionnaire. Your blood is taken in advance of being transported to the respective blood center for processing. Test tubes containing your blood are sent to the lab.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 2: Processing of Blood</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              Your donation data is processed through a computer at our processing centre. The separated transfusable components are platelets, plasma, and red cells, in addition to whole blood donations. Cryoprecipitate, a plasma component, helps control the risk of bleeding by assisting blood clotting. Red cells and platelets are processed to leuko-reduce, which reduces the possibility of the recipient developing allergic reactions to the transfusion.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 3: Testing Process</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              The Sample blood arrives at the Testing Laboratory where requisite test has been performed to identify the type of blood or any disease present in it. Your donation will be discarded if the test results are positive. (It is shared only to the donors). Test results are transferred electronically to the processing center within 24 hours.
            </p>
          </div>

          {/* Step 4 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 4: Storing of Donated Blood</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              Upon the arrival of test results, units suitable for transfusion are labeled and stored. Red cells are kept at 6°C in refrigerators for up to 42 days. Platelets are stored at room temperature in agitators for up to five days. Plasma and cryo are frozen and kept in freezers for up to one year.
            </p>
          </div>

          {/* Step 5 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 5: Blood Distribution</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              Blood is available 24/7 to all the hospitals and users whenever they raise a request of Blood. There is a prompt delivery to the requisite hospitals/ users.
            </p>
          </div>

          {/* Step 6 */}
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Step 6: Transfusion of Blood</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              When an individual is stricken with an infection or injury, they are admitted to a hospital or treatment center. Physicians determine whether a transfusion is required and what kind. Blood is given to patients in a wide range of circumstances, including serious accidents (such as in a car crash), surgeries, childbearing, anemia, blood disorders, cancer treatment, and many others.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
