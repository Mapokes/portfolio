import React from "react";
import Nav from "./components/Nav";
import SectionFront from "./components/SectionFront";
import SectionProjects from "./components/SectionProjects";
import SectionContact from "./components/SectionContact";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [visibleComponent, setVisibleComponent] = React.useState({
    top: false,
    projects: false,
    contact: false,
  });
  const projectsRef = React.useRef<HTMLElement>(null);
  const contactRef = React.useRef<HTMLElement>(null);

  return (
    <>
      <Nav refToProjects={projectsRef} refToContact={contactRef} visibleComponent={visibleComponent} />
      <SectionFront refToContact={contactRef} setVisibleComponent={setVisibleComponent} />
      <SectionProjects ref={projectsRef} setVisibleComponent={setVisibleComponent} />
      <SectionContact ref={contactRef} setVisibleComponent={setVisibleComponent} />
      <Footer />
    </>
  );
};
export default App;
