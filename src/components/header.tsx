// import { Link } from "react-router-dom";

// export function Header() {
//   return (
//     <div className="md:container md:top-3 -translate-x-1/2 left-[50%] fixed z-999 backdrop-blur-3xl md:w-[80%] w-full md:rounded-2xl shadow">
//       <div className="header container mx-auto flex justify-between items-center py-3 px-5">
//         <div className="logo h-full flex items-center gap-3">
//           <img
//             src="https://images-platform.99static.com//XDqAq_HapvXR9AWeozwbmXyPR3E=/168x2172:1831x3835/fit-in/500x500/99designs-contests-attachments/128/128327/attachment_128327450"
//             className="size-10"
//             alt=""
//           />
//           <div className="logoTxt lg:block hidden">Smart Employ</div>
//         </div>
//         <nav className="navBar lg:flex md:block hidden sm:hidden xs:hidden">
//           <ul className="list-none flex md:gap-5 font-medium text-lg cursor-pointer gap-5 sm:gap-5">
//             <li>
//               <a href="#home" className="active:text-indigo-500">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="active:text-indigo-500">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#features" className="active:text-indigo-500">
//                 Features
//               </a>
//             </li>
//             <li>
//               <a href="#stats" className="active:text-indigo-500">
//                 Stats
//               </a>
//             </li>
//             {/* <li><a href="#testimonials" className="active:text-indigo-500">Testimonials</a></li> */}
//             <li>
//               <a href="#suggestions" className="active:text-indigo-500">
//                 Suggestions
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <div className="actBtns">
//           <button className="aiResBtn">
//             <Link to="/inputs">Try now</Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const sections = ["home", "about", "features", "stats", "suggestions"];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0.2,
      },
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
export function Header() {
  const activeSection = useActiveSection();
  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full px-4">
      <div
        className="
        mx-auto
        max-w-7xl
        rounded-2xl
        border border-white/20
        bg-white/10
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        relative
        overflow-hidden
      "
      >
        {/* Animated glass highlight */}
        <div
          className="
          absolute inset-0
          bg-linear-to-r
          from-transparent
          via-white/20
          to-transparent
          -translate-x-full
          animate-shimmer
          pointer-events-none
        "
        />

        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 z-10">
            <img
              src="https://images-platform.99static.com//XDqAq_HapvXR9AWeozwbmXyPR3E=/168x2172:1831x3835/fit-in/500x500/99designs-contests-attachments/128/128327/attachment_128327450"
              className="size-10 rounded-xl"
              alt=""
            />

            <span className="hidden lg:block font-semibold text-lg tracking-tight">
              Smart Employ
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden sm:block z-10">
            <ul className="flex gap-5 sm:gap-8 font-medium">
              {["Home", "About", "Features", "Stats", "Suggestions"].map(
                (item) => {
                  const isActive = activeSection === item.toLocaleLowerCase();
                  return (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className={`
                    relative
                    transition-all
                    duration-300
                     
                    after:absolute
                    after:left-0
                    after:-bottom-1
                    after:h-0.5
                    after:w-0
                    after:bg-indigo-500
                    after:rounded-full
                    after:transition-all
                    after:duration-300

                    hover:after:w-full


                                            ${
                                              isActive
                                                ? "text-indigo-600"
                                                : "text-gray-700 hover:text-indigo-500"
                                            }

                        after:absolute
                        after:left-0
                        after:-bottom-1
                        after:h-0.5
                        after:rounded-full
                        after:bg-indigo-500
                        after:transition-all
                        after:duration-300

                        ${
                          isActive
                            ? "after:w-full"
                            : "after:w-0 hover:after:w-full"
                        }
                      `}
                      >
                        {item}
                      </a>
                    </li>
                  );
                },
              )}
            </ul>
          </nav>

          {/* CTA */}
          <div className="z-10">
            <Link
              to="/inputs"
              className="
              px-5
              py-2.5
              rounded-xl
              bg-indigo-500
              text-white
              font-medium
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              hover:bg-indigo-600
            "
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
