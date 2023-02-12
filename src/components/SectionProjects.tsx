import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Aos from "aos";
import "aos/dist/aos.css";
import ClipLoader from "react-spinners/ClipLoader";
import imgUnavaiable from "../images/NoImageAvailable.jpg";

type Project = {
  projectName: string;
  projectLink: string;
  projectLiveSite: string;
  projectPhoto: string;
  projectTechArray: Array<string>;
};
type Props = {};
type Ref = { ref: React.ForwardedRef<Props> };

const SectionProjects = React.forwardRef<Props, Ref>((props, ref) => {
  const projectsRef = React.useRef<HTMLElement>(null);
  const [projectData, setProjectData] = React.useState<Project[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  React.useEffect(() => {
    const options: { method: string; url: string } = {
      method: "GET",
      url: "/api",
    };

    axios
      .request(options)
      .then((response) => {
        setLoading(false);
        setProjectData(response.data);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <section className="section-projects" ref={projectsRef}>
      <h1 className="section-projects__title">Projects</h1>
      <ClipLoader color="#ffffff" loading={loading} />
      {!error ? (
        <ul className="section-projects__list">
          {projectData.map((project) => {
            return (
              <li className="section-projects__list__item" key={nanoid()} data-aos="fade-right">
                <a href={project.projectLiveSite} className="item-link-live" target="_blank" rel="noreferrer">
                  <img src={project.projectPhoto} alt={imgUnavaiable} className="item-link-live__photo" />
                </a>
                <h3 className="item-title">{project.projectName}</h3>
                <ul className="tech-list">
                  {project.projectTechArray.map((tech) => {
                    return (
                      <li className="tech-list__item" key={nanoid()}>
                        {tech}
                      </li>
                    );
                  })}
                </ul>
                <a href={project.projectLink} className="item-link-repo" target="_blank" rel="noreferrer">
                  Repository
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <h5 className="section-projects__error">Server responds with error! Try reloading the page</h5>
      )}
    </section>
  );
});

export default SectionProjects;
