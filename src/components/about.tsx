import aboutImg from "../assets/Mind map-rafiki.png";

export function About() {
  return (
    <div id="about" className="container flex lg:flex-row-reverse flex-col px-4 mx-auto items-center lg:py-0 pt-10 scroll-mt-28">
      <div className="text-center lg:w-1/2 lg:text-left">
        <h1 className="mb-4 text-blue-600">About</h1>
        <p className="lg:text-4xl text-xl font-bold leading-normal lg:text-left sm:text-center xs:text-center sm:text-3xl xs:text-2xl mb-2">
          Bridging the Gap Between Education and Employment{" "}
        </p>
        <h4 className="sm:text-lg text-md font-normal lg:text-left text-center sm:text-center xs:text-center">
          Helping Students Understand Their Employability and Career
          Readiness{" "}
        </h4>
      </div>
      <div className="lg:w-1/2">
        <img src={aboutImg} alt="" />
      </div>
    </div>
  );
}
