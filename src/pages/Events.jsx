import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useAnimate,
  useMotionValueEvent,
} from "framer-motion";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import Header from "../components/Header";
import Footer from "../components/FooterCTA";
import AnimatedBackground from "../components/AnimatedBackground";
import ScrollIndicator from "../components/ScrollIndicator";
import AOS from "aos";

// Utility function to limit how often a function can be called
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
};

// --- Data with working images ---
const cases = [
  {
    id: 1,
    caseNumber: "#1",
    title: "The Crimson Quill",
    description:
      "Cryptic letters signed with crimson ink appear across the city.",
    image:
      "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: -3,
  },
  {
    id: 2,
    caseNumber: "#2",
    title: "Echoes of the Past",
    description:
      "An old photograph surfaces, holding a clue to a decades-old mystery.",
    image:
      "https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: 2,
  },
  {
    id: 3,
    caseNumber: "#3",
    title: "The Silent Witness",
    description:
      "The only witness is a parrot who speaks only in riddles. Time to decipher.",
    image:
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: 1,
  },
  {
    id: 4,
    caseNumber: "#4",
    title: "The Midnight Cipher",
    description:
      "A coded message, intercepted at midnight, points to a secret society.",
    image:
      "https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: -2,
  },
  {
    id: 5,
    caseNumber: "#5",
    title: "Phantom's Fortune",
    description: "A rumored treasure is hidden within a haunted opera house.",
    image:
      "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: 3,
  },
  {
    id: 6,
    caseNumber: "#6",
    title: "The Sunken Locket",
    description:
      "A diver discovers a locket in a shipwreck, containing a mysterious portrait.",
    image:
      "https://images.pexels.com/photos/761543/pexels-photo-761543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: -1,
  },
  {
    id: 7,
    caseNumber: "#7",
    title: "The Gilded Cage",
    description: "A prized songbird, the key to a conspiracy, has been stolen.",
    image:
      "https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: 2,
  },
  {
    id: 8,
    caseNumber: "#8",
    title: "The Counterfeit Smile",
    description:
      "A famous painting is replaced by a forgery, with a hidden message.",
    image:
      "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: -4,
  },
  {
    id: 9,
    caseNumber: "#9",
    title: "Beekeeper's Secret",
    description:
      "A beekeeper uses his hives to pass secret messages for a spy ring.",
    image:
      "https://media.istockphoto.com/id/462333727/photo/smiling-man-with-hand-in-hair.jpg?s=2048x2048&w=is&k=20&c=0KeXC-tQhGZ9U3-WlxJ579-yVEA1CTqZzyTNEg_p4fE=",
    rotation: 1,
  },
  {
    id: 10,
    caseNumber: "#10",
    title: "The Final Curtain",
    description:
      "The entire conspiracy is set to be revealed on opening night.",
    image:
      "https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rotation: 3,
  },
];

const DESKTOP_TRACK_WIDTH_PERCENT = 250;

const desktopPositions = {
  1: { top: "15%", left: "5%" },
  2: { top: "50%", left: "18%" },
  3: { top: "10%", left: "31%" },
  4: { top: "55%", left: "44%" },
  5: { top: "20%", left: "57%" },
  6: { top: "15%", left: "70%" },
  7: { top: "50%", left: "83%" },
  8: { top: "10%", left: "96%" },
  9: { top: "55%", left: "109%" },
  10: { top: "20%", left: "122%" },
};

const CaseClue = ({ caseData, isDesktop, setPinRef, scrollXProgress }) => {
  const position = isDesktop ? desktopPositions[caseData.id] : {};
  const [scope, animate] = useAnimate();

  const throttledShake = useCallback(
    throttle(() => {
      animate(
        ".shake-number",
        { rotate: [0, -2.5, 2.5, -2.5, 0] },
        { duration: 0.4, ease: "easeInOut" }
      );
      animate(
        ".shake-description",
        { rotate: [0, 1.5, -1.5, 1.5, 0] },
        { duration: 0.4, ease: "easeInOut" }
      );
    }, 300),
    [animate]
  );

  if (isDesktop && scrollXProgress) {
    useMotionValueEvent(scrollXProgress, "change", (latest) => {
      if (latest > 0) {
        throttledShake();
      }
    });
  }

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <Link to={`/event/${caseData.id}`}>
      <motion.div
        className={
          isDesktop
            ? "absolute z-10 group w-[250px]"
            : "relative w-[90%] max-w-[320px] z-10"
        }
        style={
          isDesktop
            ? {
                top: position.top,
                left: position.left,
                transform: `translateX(-50%)`,
              }
            : {}
        }
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div
          ref={(el) => setPinRef(caseData.id, el)}
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 z-20"
        ></div>
        <div
          ref={scope}
          className="transition-transform duration-300 ease-in-out group-hover:scale-105"
          style={{ transform: `rotate(${caseData.rotation}deg)` }}
        >
          <div className="relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-red-600 rounded-full border-2 border-red-800 shadow-lg after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-white/30 after:rounded-full"></div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-2.5 shadow-lg border border-gray-200 w-full">
                <img
                  src={caseData.image}
                  alt={caseData.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="shake-number bg-yellow-200 p-2 text-center text-4xl font-bold text-gray-800 shadow-md w-[80px] -mt-5 z-10">
                {caseData.caseNumber}
              </div>
              <div className="shake-description bg-gray-200 p-3 shadow-sm text-gray-700 leading-relaxed w-[90%] text-center -mt-2">
                <h3 className="text-lg font-bold mb-1 text-red-700">
                  {caseData.title}
                </h3>
                <p className="text-sm">{caseData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Events = () => {
  const scrollRef = useRef(null);
  const pinRefs = useRef({});
  const [svgPath, setSvgPath] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [hasScrolled, setHasScrolled] = useState(false);

  // --- AOS Initialization ---
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  const { scrollXProgress } = useScroll({ container: scrollRef });
  const pathLength = useSpring(scrollXProgress, {
    stiffness: 400,
    damping: 90,
  });

  const handleScroll = () => {
    if (
      scrollRef.current &&
      scrollRef.current.scrollLeft > 10 &&
      !hasScrolled
    ) {
      setHasScrolled(true);
    }
    if (isDesktop) {
      calculatePath();
    }
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        element.scrollTo({
          left: element.scrollLeft + e.deltaY * 2.5,
        });
      };
      element.addEventListener("wheel", onWheel);
      return () => element.removeEventListener("wheel", onWheel);
    }
  }, []);

  const calculatePath = useCallback(() => {
    if (!isDesktop || Object.keys(pinRefs.current).length < cases.length)
      return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const containerRect = scrollContainer.getBoundingClientRect();

    const pathData = cases
      .slice(1)
      .map((_, index) => {
        const prevPinEl = pinRefs.current[cases[index].id];
        const currentPinEl = pinRefs.current[cases[index + 1].id];

        if (!prevPinEl || !currentPinEl) return "";

        const prevRect = prevPinEl.getBoundingClientRect();
        const currentRect = currentPinEl.getBoundingClientRect();

        const p1x =
          prevRect.left -
          containerRect.left +
          scrollContainer.scrollLeft +
          prevRect.width / 2;
        const p1y = prevRect.top - containerRect.top + prevRect.height / 2;
        const p2x =
          currentRect.left -
          containerRect.left +
          scrollContainer.scrollLeft +
          currentRect.width / 2;
        const p2y =
          currentRect.top - containerRect.top + currentRect.height / 2;

        return `M ${p1x} ${p1y} L ${p2x} ${p2y}`;
      })
      .join(" ");

    setSvgPath(pathData);
  }, [isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      calculatePath();
    };
    window.addEventListener("resize", handleResize);

    const observer = new ResizeObserver(calculatePath);
    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) observer.observe(currentScrollRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentScrollRef) observer.unobserve(currentScrollRef);
    };
  }, [calculatePath]);

  const setPinRef = (id, el) => {
    if (el) {
      pinRefs.current[id] = el;
      if (Object.keys(pinRefs.current).length === cases.length) {
        calculatePath();
      }
    }
  };

  return (
    <div className=" font-['Special_Elite',_cursive]">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
      <main className="w-full min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-center overflow-x-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative w-full max-w-7xl mx-auto lg:h-[600px] h-auto lg:overflow-x-scroll lg:overflow-y-hidden scrollbar-hide"
        >
          {!hasScrolled && <ScrollIndicator />}
          <div
            className="relative w-full h-full"
            style={
              isDesktop ? { width: `${DESKTOP_TRACK_WIDTH_PERCENT}%` } : {}
            }
          >
            <div className="lg:hidden relative w-full h-auto flex flex-col items-center gap-y-32">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-red-800/50 z-0"></div>
              {cases.map((caseData) => (
                <CaseClue
                  key={caseData.id}
                  caseData={caseData}
                  isDesktop={false}
                  setPinRef={setPinRef}
                  scrollXProgress={null}
                />
              ))}
            </div>
            <div className="hidden lg:block absolute top-0 left-0 w-full h-full">
              <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-10 pointer-events-none">
                <motion.path
                  key={svgPath}
                  d={svgPath}
                  fill="none"
                  stroke="#e74c3c"
                  strokeWidth="3"
                  style={{ pathLength }}
                />
              </svg>
              {cases.map((caseData) => (
                <CaseClue
                  key={caseData.id}
                  caseData={caseData}
                  isDesktop={true}
                  setPinRef={setPinRef}
                  scrollXProgress={scrollXProgress}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full max-w-7xl mx-auto mt-8 h-2">
          <div className="h-full bg-gray-800/50 rounded-full">
            <motion.div
              className="h-full bg-red-600 rounded-full"
              style={{ scaleX: scrollXProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;