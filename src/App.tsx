import React from "react";
import Nav from "./components/Nav";
import SectionFront from "./components/SectionFront";
import SectionProjects from "./components/SectionProjects";
import SectionContact from "./components/SectionContact";
import Footer from "./components/Footer";

const App: React.FC = () => {
  console.log("App rendered");
  const projectsRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <Nav refToProjects={projectsRef} refToContact={contactRef} />
      <SectionFront refToContact={contactRef} />
      <SectionProjects ref={projectsRef} />
      <SectionContact ref={contactRef} />
      <Footer />
    </>
  );
};
export default App;
