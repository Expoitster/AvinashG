import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ScrollTrigger } from "./lib/gsap";
import Placeholder from "./routes/Placeholder";

/* The 14 routes the published site serves today, kept in one list so the QA
   harness and the RAG indexer can keep asserting the same set. Paths drop the
   "#" the current hash router uses; the cutover has to preserve the old URLs
   with redirects, or every link already shared in an application breaks. */
export const ROUTES = [
  { path: "/", title: "Overview" },
  { path: "/story", title: "Story" },
  { path: "/experience", title: "Experience" },
  { path: "/beyond", title: "Beyond" },
  { path: "/work/chat360", title: "Chat360" },
  { path: "/work/cordelia-cruises", title: "Cordelia Cruises" },
  { path: "/work/nosh-house", title: "Nosh House" },
  { path: "/work/yapita-health", title: "Yapita Health" },
  { path: "/work/events-fusion", title: "Events Fusion" },
  { path: "/lab", title: "Lab" },
  { path: "/thinking", title: "Thinking" },
  { path: "/about", title: "About" },
  { path: "/resume", title: "Resume" },
  { path: "/contact", title: "Contact" },
];

export default function App() {
  const { pathname } = useLocation();

  // Client-side routing swaps the DOM without telling ScrollTrigger, which
  // keeps the old page's measurements and fires triggers at the wrong offsets.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <>
      <nav>
        {ROUTES.map((r) => (
          <Link key={r.path} to={r.path}>
            {r.title}
          </Link>
        ))}
      </nav>
      <Routes>
        {ROUTES.map((r) => (
          <Route
            key={r.path}
            path={r.path}
            element={<Placeholder title={r.title} source={`#${r.path}`} />}
          />
        ))}
        <Route path="*" element={<Placeholder title="404" />} />
      </Routes>
    </>
  );
}
