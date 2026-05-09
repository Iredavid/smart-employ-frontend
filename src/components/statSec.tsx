export function CtaSec() {
  return (
    <section id="stats" className=" container mx-auto py-12 px-10 text-center scroll-mt-28">
      <div className="flex items-center py-12 px-6 flex-col justify-center rounded-2xl bg-indigo-100 shadow-[0_0_5px_rgba(192,192,192,0.5)] ">
        <h1  className="mb-2 text-blue-600 text-center">Stats</h1>
        <p className="lg:text-4xl text-blue-500 text-xl font-bold leading-normal text-center sm:text-3xl xs:text-2xl mb-2">
          Unlock Your Career Potential
        </p>
        <p className="sm:text-lg text-blue-500 font-normal text-center mb-10">
          Backed by intelligent analytics, we help you understand your
          strengths, bridge skill gaps, and stay ahead in today’s job market.
        </p>
        <div className="border-indigo-200 rounded-md lg:py-20 px-8 text-center">
          {/* Top small line */}
          {/* <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-1 bg-blue-400 rounded-full mb-2"></div>
          <div className="w-32 h-0.5 bg-blue-200"></div>
        </div> */}

          {/* Stats */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 lg:gap-16 gap-8 text-blue-500">
            <Stat number="1000+" title="Training Samples" />
            <Stat number="10+" title="Faculties Covered" />
            <Stat number="40+"  title="Career Results"/>
            <Stat number="20+" title="Skill Features" />
          </div>
        </div>
      </div>
    </section>
  );
}
function Stat({ number, title }: { number: string, title:string }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="lg:text-5xl sm:text-4xl text-3xl font-medium mb-2">{number}</h2>
      <p className="">{title}</p>
    </div>
  );
}
