import heroImg from "../assets/At the office-amico.png";

export function Hero() {
  return (
    <div id="home" className="hero bg-gray-100">
      <div className="container h-full flex flex-col mx-auto lg:flex-row sm:flex-col xs:flex-col items-center px-4 2xl:gap-10 pt-22">
        <div className="lg:w-1/2 h-1/2 md:w-full lg:text-left gap-3 flex flex-col justify-center py-5 md:py-10">
          <h1 className="lg:text-4xl text-xl font-bold leading-normal lg:text-left text-center sm:text-center xs:text-center sm:text-3xl xs:text-2xl">
            Smart Career Guidance and Employability Analytics System
          </h1>
          <h4 className="sm:text-lg text-md font-normal lg:text-left text-center sm:text-center xs:text-center">
            Empowering Students with Data-Driven Insights for Informed Career
            Choices
          </h4>
        </div>
        <div className="lg:w-1/2 h-1/2 md:w-full flex justify-center md:items-center md:p-0 sm:p-5">
          <img
            className="w-full h-full object-cover"
            src={heroImg}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
