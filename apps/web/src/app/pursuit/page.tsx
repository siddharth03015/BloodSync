import FallbackImage from '../components/FallbackImage';

export const metadata = {
  title: 'Pre and Post Process | B-Sync',
  description: 'Pre and post process for blood donation.',
};

export default function PursuitPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Centered */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="inline-flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white pb-2">
              Pre and Post Process for Blood Donation
            </h1>
            <div className="h-[2px] w-3/4 max-w-[250px] bg-red-600"></div>
          </div>
        </div>

        {/* Centered Image */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-3xl aspect-[16/9] sm:aspect-[2/1] rounded overflow-hidden shadow-md border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex items-center justify-center">
            <FallbackImage 
              src="/pursuit-donation.png" 
              alt="Healthcare professional taking blood from a donor" 
              className="w-full h-full object-contain p-4"
              fallbackEmoji="🩺"
              fallbackText="Image Placeholder"
              fallbackHint="Please add pursuit-donation.png<br/>to your public folder"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Section 1 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">1. Create an Appointment</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Arrange a perfect slot for you that suits your availability which is convenient to you.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">2. Consume a Balance Diet</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-500 dark:text-slate-400 marker:text-slate-400">
              <li>Eat some foods that have rich source of iron like dark green leafy vegetables, oats, tofu, and dried fruits.</li>
              <li>Make sure to eat properly and drink lots of fluids the night before your donation, so you have enough energy to give to the cause.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">Bonus Tips before Donation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Before donating blood, make sure you don&apos;t take an aspirin for two days. Learn More about platelet donations. By donating with a friend, you can do twice as much good! Download the bloodLinks app to receive appointment reminders, location finder and much more.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">Day of Donation:</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              After taking proper rest, its time to reach at the location with your required id proof and other medication prescription if any.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">Bonus Tips at the Day of Donation:</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              Before your appointment, drink 500 ML of water (or other nonalcoholic beverage) or eat a nutritious meal. Avoid fatty foods like hamburgers, french fries, or ice cream. Choose a shirt with sleeves that you can roll up above your elbows. Let us know if you have a favorite arm or vein from which you&apos;ve received successful blood draws in the past. Donating is also a perfect time to listen to music, talk to other donors, or read.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">Post Donation:</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Have a nutritious meal post donating your blood. Keep yourself hydrated and avoid liquor for the next 1 day.
            </p>
          </div>

          {/* Section 7 with Red Border */}
          <div className="pl-4 border-l-4 border-red-600">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white mb-2">Bonus Tips after Donation</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed text-justify sm:text-left">
              Apply a bandage to the needle site for the next several hours to prevent a skin rash; afterwards, clean the area around the bandage with soap and water and do not do any heavy lifting or vigorous exercise for the rest of the day. If the needle site begins to bleed, apply pressure and raise your arm straight up for 5-10 minutes to stop the bleeding. If you become dizzy or lightheaded, stop what you are doing and lie or sit down until you feel better; avoid performing any activity where fainting may result in injury for at least 24 hours.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
