export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-linear-to-br from-white via-slate-50 to-amber-50"
    >
      {/* Background Blur */}
      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl"></div>

      <div className="container mx-auto px-4 pt-28 lg:pt-30 pb-10 lg:pb-15">
        <div className="flex flex-col items-center lg:gap-14 gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600">
              AI-Powered Career Development Platform
            </span>

            <h1 className="mt-4 text-xl font-bold lg:font-extrabold leading-normal text-gray-900 sm:text-3xl lg:text-4xl">
              Smart Career Guidance and Employability Analytics System
              <span className="block text-indigo-500">
                For University Students
              </span>
            </h1>

            <p className="mt-4 text-md leading-normal text-gray-600 sm:text-xl">
              Discover career opportunities, evaluate your employability,
              identify skill gaps, and receive personalized recommendations
              tailored to your academic profile.
            </p>
          </div>

          {/* RIGHT */}

          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group rounded-3xl">
              {/* Soft glow behind image */}
              <div className="absolute -inset-3 rounded-4xl bg-linear-to-r from-indigo-500/20 via-purple-500/15 to-cyan-500/20 blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:blur-3xl" />

              <img
                src="https://res.cloudinary.com/ffkfh5xr/image/upload/v1786130268/5947285689617551077_odnduu.avif"
                alt="University students collaborating while using the Smart Career Guidance System"
                loading="eager"
                decoding="async"
                className="relative w-full max-w-2xl rounded-3xl border border-gray-200 object-cover shadow-2xl transform-gpu transition-all duration-700 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:contrast-105 group-hover:saturate-110 group-hover:brightness-[1.03] group-hover:shadow-[0_30px_80px_rgba(79,70,229,0.28)]"
              />

              {/* Premium colored shine */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-y-0 -left-1/3 w-1/2 bg-linear-to-r from-transparent via-cyan-300/20 to-indigo-400/20 skew-x-[-25deg] opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              </div>

              {/* Floating Card */}
              <div className="hidden sm:block absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                <h3 className="font-semibold text-gray-800">Smart Employ</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Helping students make informed career decisions through
                  Artificial Intelligence and data-driven insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
