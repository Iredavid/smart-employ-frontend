export function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-white pb-20 pt-15 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}

          {/* Image */}
          <div className="relative flex justify-center">
            <div className="relative group w-full max-w-170 overflow-hidden rounded-3xl">
              {/* Premium glow */}
              <div className="absolute -inset-3 rounded-4xl bg-linear-to-r from-indigo-500/20 via-purple-500/15 to-cyan-500/20 blur-2xl opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:blur-3xl" />

              {/* Image */}
              <img
                src="https://res.cloudinary.com/ffkfh5xr/image/upload/v1786130268/5947285689617551075_db1bep.avif"
                alt="Student using the Smart Career Guidance platform"
                loading="lazy"
                decoding="async"
                className="relative w-full h-85 sm:h-105 md:h-125 lg:h-140 rounded-3xl border border-gray-200 object-cover shadow-2xl transform-gpu transition-all duration-700 ease-out will-change-transform group-hover:-translate-y-2 group-hover:scale-[1.03] group-hover:brightness-[1.03] group-hover:contrast-105 group-hover:saturate-110 group-hover:shadow-[0_30px_80px_rgba(79,70,229,0.28)]"
              />

              {/* Colored shine */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-y-0 -left-1/3 w-1/2 bg-linear-to-r from-transparent via-cyan-300/20 to-indigo-400/20 skew-x-[-25deg] opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              </div>

              {/* Improved Floating Card */}
              <div className="absolute left-1/2 bottom-4 sm:bottom-6 md:bottom-8 w-[90%] sm:w-[85%] -translate-x-1/2 rounded-2xl border border-white/30 bg-white/90 backdrop-blur-md p-4 sm:p-5 shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                  Personalized Career Analysis
                </h3>

                <p className="mt-2 text-sm sm:text-[15px] leading-6 text-gray-600">
                  Evaluate your employability, discover suitable career paths,
                  and receive recommendations based on your academic profile.
                </p>
              </div>
            </div>
          </div>

          {/* Text */}

          <div className="text-center lg:text-left">
            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-500">
              About the Platform
            </span>

            <h2 className="mt-4 text-xl font-bold lg:font-extrabold leading-normal text-gray-900 sm:text-3xl lg:text-4xl">
              Bridging the Gap Between
              <span className="block text-indigo-500">
                Education & Employment
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {" "}
              The Smart Career Guidance and Employability Analytics System is
              designed to help university students make informed career
              decisions using Artificial Intelligence and data-driven insights.
              By analysing students' academic background, skills, and
              experience, the platform provides personalized recommendations
              that support career readiness.
            </p>

            {/* <button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-7 py-4 font-semibold text-white transition hover:bg-indigo-600">
              Learn More
              <ArrowRightAltIcon />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
