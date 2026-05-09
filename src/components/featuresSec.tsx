export function FeaturesSec() {
  return (
    <section id="features" className="container pb-10 px-10 mx-auto scroll-mt-28">
      <h1 className="mb-2 text-blue-600 text-center">Features</h1>
      <p  className="lg:text-4xl text-xl font-bold leading-normal text-center sm:text-3xl xs:text-2xl mb-2">
        Core Features of the System
      </p>
      <p className="sm:text-lg text-md font-normal text-center mb-10">
        Discover powerful tools designed to guide your career path, improve your
        employability, and help you make smarter, data-driven decisions.{" "}
      </p>
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        <div
          className="relative bg-white hover:bg-indigo-100 flex flex-col justify-center text-center items-center p-6 rounded-lg hover:shadow-lg shadow-[0_0_14px_rgba(192,192,192,0.2)] 
         overflow-hidden group transition-all duration-700
      before:content-[''] before:absolute before:bottom-[-160%] before:left-1/2
      before:-translate-x-1/2 before:w-0 before:h-0 before:bg-indigo-400
      before:blur-[70px] before:rounded-full before:transition-all before:duration-700
      after:content-[''] after:absolute after:bottom-[-30%] after:right-[-30%]
      after:w-30 after:h-30 after:bg-indigo-400
      after:blur-[70px] after:rounded-full after:transition-all after:duration-700
      hover:before:w-250 hover:before:h-250 hover:before:bottom-[-230%] hover:before:blur-sm
        "
        >
          <div className="relative z-10 flex flex-col items-center ">
            <div className="icons mb-4 bg-indigo-100 rounded-full size-20 flex items-center justify-center  group-hover:bg-indigo-400 transition-all duration-700">
              <i className="fi fi fi-ss-cyborg text-5xl group-hover:invert"></i>
            </div>
            <h3 className="font-bold text-xl mb-4 transition-all duration-700 group-hover:text-white">
              AI-Driven Insights
            </h3>
            <p className="text-gray-600 transition-all duration-700 group-hover:text-white">
              Leverage an intelligent system that transforms your data into
              actionable career guidance to unlock smarter decision making
            </p>
          </div>
        </div>

        <div
          className="relative bg-white hover:bg-indigo-100 flex flex-col justify-center text-center items-center p-6 rounded-lg hover:shadow-lg shadow-[0_0_14px_rgba(192,192,192,0.2)] 
         overflow-hidden group transition-all duration-700
      before:content-[''] before:absolute before:bottom-[-160%] before:left-1/2
      before:-translate-x-1/2 before:w-0 before:h-0 before:bg-indigo-400
      before:blur-[70px] before:rounded-full before:transition-all before:duration-700
      after:content-[''] after:absolute after:bottom-[-30%] after:right-[-30%]
      after:w-30 after:h-30 after:bg-indigo-400
      after:blur-[70px] after:rounded-full after:transition-all after:duration-700
      hover:before:w-250 hover:before:h-250 hover:before:bottom-[-230%] hover:before:blur-sm
        "
        >
          <div className="relative z-10 flex flex-col items-center ">
            <div className="icons mb-4 bg-indigo-100 rounded-full size-20 flex items-center justify-center  group-hover:bg-indigo-400 transition-all duration-700">
              <i className="fi fi-ss-id-card text-5xl group-hover:invert"></i>
            </div>
            <h3 className="font-bold text-xl mb-4 transition-all duration-700 group-hover:text-white">
              Personallized Result
            </h3>
            <p className="text-gray-600 transition-all duration-700 group-hover:text-white">
              Get personalized career suggestions based on your skills,
              interests, and academic background powered by intelligent analysis
              of your data.
            </p>
          </div>
        </div>

        <div
          className="relative bg-white hover:bg-indigo-100 flex flex-col justify-center text-center items-center p-6 rounded-lg hover:shadow-lg shadow-[0_0_14px_rgba(192,192,192,0.2)] 
         overflow-hidden group transition-all duration-700
      before:content-[''] before:absolute before:bottom-[-160%] before:left-1/2
      before:-translate-x-1/2 before:w-0 before:h-0 before:bg-indigo-400
      before:blur-[70px] before:rounded-full before:transition-all before:duration-700
      after:content-[''] after:absolute after:bottom-[-30%] after:right-[-30%]
      after:w-30 after:h-30 after:bg-indigo-400
      after:blur-[70px] after:rounded-full after:transition-all after:duration-700
      hover:before:w-250 hover:before:h-250 hover:before:bottom-[-230%] hover:before:blur-sm
        "
        >
          <div className="relative z-10 flex flex-col items-center ">
            <div className="icons mb-4 bg-indigo-100 rounded-full size-20 flex items-center justify-center  group-hover:bg-indigo-400 transition-all duration-700">
              <i className="fi fi-ss-score-board text-5xl group-hover:invert"></i>
            </div>
            <h3 className="font-bold text-xl mb-4 transition-all duration-700 group-hover:text-white">
              Employability Score
            </h3>
            <p className="text-gray-600 transition-all duration-700 group-hover:text-white">
              Understand and evaluate your readiness for the job market with a
              clear, data-driven AI-generated score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
