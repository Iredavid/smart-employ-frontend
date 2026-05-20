import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sling as Hamburger } from "hamburger-react";

const sections = ["home", "about", "features", "stats", "suggestions"];

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.05, 0.2, 0.4, 0.6],
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
  const [menuOpen, setmenuOpen] = useState(false);

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

        <div className=" relative flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 z-10">
            <img
              src="https://images-platform.99static.com//XDqAq_HapvXR9AWeozwbmXyPR3E=/168x2172:1831x3835/fit-in/500x500/99designs-contests-attachments/128/128327/attachment_128327450"
              className="size-10 rounded-xl"
              alt=""
            />

            <span className="hidden min-[540px]:max-[640px]:block min-[641px]:hidden lg:block font-semibold text-lg tracking-tight">
              Smart Employ
            </span>
          </div>
          {/* Nav */}
          <nav className="hidden sm:block z-10">
            <ul className="flex  gap-5 sm:gap-8 font-medium">
              {["Home", "About", "Features", "Stats", "Suggestions"].map(
                (item) => {
                  const isActive = activeSection === item.toLocaleLowerCase();
                  return (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();

                          document
                            .getElementById(item.toLowerCase())
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
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
          <div
            className="
              sm:hidden
              absolute
              left-1/2
              -translate-x-1/2
              top-4
              z-50
            "
            onClick={() => setmenuOpen((prev) => !prev)}
          >
            <Hamburger />
          </div>
          <div className=" flex gap-5 items-center">
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
        <div
          className={`
    overflow-hidden
    transition-all
    duration-500
    ease-in-out

    ${
      menuOpen
        ? "max-h-96 opacity-100 translate-y-0"
        : "max-h-0 opacity-0 -translate-y-2"
    }
  `}
        >
          <nav className="sm:hidden">
            <ul className="flex flex-col p-5 pt-0 items-center gap-5 sm:gap-8 font-medium">
              {["Home", "About", "Features", "Stats", "Suggestions"].map(
                (item) => {
                  const isActive = activeSection === item.toLocaleLowerCase();
                  return (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={(e) => {
                          e.preventDefault();

                          document
                            .getElementById(item.toLowerCase())
                            ?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                        }}
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
        </div>
      </div>
    </header>
  );
}
