import React from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/FooterCTA";
import AnimatedBackground from "../components/AnimatedBackground";

// Data array remains the same
const cases = [
  {
    id: 1,
    caseNumber: "#1",
    title: "Snaphunt",
    description:
      "A campus photo hunt for first-years. Capture the college spirit and win",
    image: "/event-images/e1.png",
    coverImage:
      "/event-images/snap.png",
    rotation: -3,
  },
  {
    id: 2,
    caseNumber: "#2",
    title: "Aryabhatta Quiz",
    description:
      "A challenging math quiz for all. Solve for glory and claim your prize.",
    image: "/event-images/e2.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/arya.png",
    rotation: 2,
  },
  {
    id: 3,
    caseNumber: "#3",
    title: "Drone Exhibition",
    description:
      "An industrial trip to Mumbai's drone expo, exploring the future of flight technology.",
    image: "/event-images/e3.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/drone.png",
    rotation: 1,
  },
  {
    id: 4,
    caseNumber: "#4",
    title: "Tech Elevate",
    description:
      "Pitch your startup and hackathon ideas directly to industry experts.",
    image: "/event-images/e4.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/vulcan.png",
    rotation: -2,
  },
  {
    id: 5,
    caseNumber: "#5",
    title: "Math Event",
    description: "A campus-wide math treasure hunt. Solve cryptic puzzles and race to win.",
    image: "/event-images/e5.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/math.png",
    rotation: 3,
  },
  {
    id: 6,
    caseNumber: "#6",
    title: "Vulcan",
    description:
      "Student researchers present groundbreaking work for a chance to get published.",
    image: "/event-images/e6.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/vulcan.png",
    rotation: -1,
  },
  {
    id: 7,
    caseNumber: "#7",
    title: "Tech Aakriti",
    description: "",
    image: "/event-images/e7.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/event-images/techak.png",
    rotation: 2,
  },
  {
    id: 8,
    caseNumber: "#8",
    title: "Solutions",
    description:
      "Pune's largest technical symposium. A massive stage for inter-club innovation.",
    image: "/event-images/e8.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    coverImage:
      "/upcomingEvent/solution.png",
    rotation: -4,
  },
];

// A small component for the "Other Events" cards in the sidebar
const OtherEventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="bg-gray-800/50 hover:bg-gray-800/80 p-3 rounded-lg border border-gray-700 transition-all duration-300 flex items-center gap-4">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-20 h-16 object-cover rounded-md"
        />
        <div>
          <h4 className="font-bold text-red-500 group-hover:text-yellow-400 transition-colors">
            {event.title}
          </h4>
          <p className="text-xs text-gray-400">{event.caseNumber}</p>
        </div>
      </div>
    </Link>
  );
};

const EventDetail = () => {
  const { id } = useParams();
  const eventId = parseInt(id);
  const event = cases.find((c) => c.id === eventId);

  // Get ALL other events for the sidebar, excluding the current one
  const otherEvents = cases.filter((c) => c.id !== eventId);

  if (!event) {
    // Fallback for when an event is not found
    return (
      <div className="font-['Special_Elite',_cursive]">
        <div className="fixed inset-0 -z-10">
          <AnimatedBackground />
        </div>
        <Header />
        <main className="w-full min-h-screen pt-28 pb-16 px-4 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl">Event not found! 🧐</h2>
          <Link
            to="/events"
            className="mt-4 text-red-400 hover:text-red-600 transition-colors"
          >
            Go back to all events
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-['Special_Elite',_cursive] text-white">
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />
      <main className="w-full min-h-screen pt-28 pb-16 px-4 md:px-8">
        {/* This is the main rectangular page container */}
        <div className="max-w-7xl mx-auto bg-[#1a1a1a]/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-2xl border border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 1: Main Event Details (takes up 2/3 of the space on large screens) */}
            <div className="lg:col-span-2">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg mb-6"
              />
              <span className="text-yellow-400 text-2xl font-bold">
                {event.caseNumber}
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-red-500 my-2">
                {event.title}
              </h1>
              <p className="text-xl text-gray-300 mt-4 leading-relaxed border-l-4 border-red-500 pl-4">
                {event.description}
              </p>

              {/* Additional Details Section */}
              <div className="mt-8 border-t border-gray-700 pt-6 space-y-4">
                <h3 className="text-2xl text-yellow-400 font-bold">
                  Event Intel
                </h3>
                <p className="text-gray-400">
                  <strong className="text-gray-200">Date & Time:</strong>{" "}
                  October 25, 2025, 8:00 PM IST
                </p>
                <p className="text-gray-400">
                  <strong className="text-gray-200">Location:</strong> The Old
                  Warehouse, Sector 7
                </p>
                <p className="text-gray-400">
                  <strong className="text-gray-200">
                    Rules of Engagement:
                  </strong>{" "}
                  Trust no one. Bring your wits. Standard detective gear
                  permitted.
                </p>
              </div>

              <div className="text-left mt-12">
                <Link
                  to="/events"
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Back to All Events
                </Link>
              </div>
            </div>

            {/* Sections 2 & 3: Sidebar with other event cards (takes up 1/3 of the space) */}
            <div className="lg:col-span-1">
              <div className="bg-black/20 p-6 rounded-lg border border-gray-800 sticky top-28">
                <h3 className="text-2xl text-yellow-400 font-bold mb-6 border-b-2 border-yellow-400/50 pb-2">
                  Other Cases to Investigate
                </h3>
                <div className="space-y-4">
                  {otherEvents.map((otherEvent) => (
                    <OtherEventCard key={otherEvent.id} event={otherEvent} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
