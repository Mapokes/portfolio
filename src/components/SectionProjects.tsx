import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Aos from "aos";
import "aos/dist/aos.css";
import ClipLoader from "react-spinners/ClipLoader";
import imgUnavaiable from "../images/NoImageAvailable.jpg";
import IntersectionObserverOptions from "../model";

type Project = {
  projectName: string;
  projectLink: string;
  projectLiveSite: string;
  projectPhoto: string;
  projectTechArray: Array<string>;
};
type Props = {
  setVisibleComponent: React.Dispatch<
    React.SetStateAction<{
      top: boolean;
      projects: boolean;
      contact: boolean;
    }>
  >;
};

const SectionProjects = React.forwardRef<any, Props>(({ setVisibleComponent }, ref) => {
  const projectsRef = React.useRef<HTMLElement>(null);
  const [projectData, setProjectData] = React.useState<Project[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [timer, setTimer] = React.useState<number>(0);
  const [action, setAction] = React.useState<boolean>(false);
  const options = React.useMemo((): IntersectionObserverOptions => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
  }, []);

  React.useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      if (projectsRef.current) {
        projectsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
  }));

  React.useEffect(() => {
    if (projectData.length === 0) {
      const options: { method: string; url: string } = {
        method: "GET",
        url: "/api",
      };

      setTimeout(() => {
        axios
          .request(options)
          .then((response) => {
            setLoading(false);
            setError(false);
            setProjectData(response.data.projects);
          })
          .catch((e) => {
            console.log(e);
            setError(true);
            setLoading(false);
            setAction((prevAction) => !prevAction);

            if (timer === 0) {
              setTimer(1000);
            }
          });
      }, timer);
    }
  }, [action, projectData, timer]);

  React.useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  function cbFunction(entries: Array<any>): void {
    const [entry] = entries;
    setVisibleComponent((prevVisibleComponent) => {
      return {
        ...prevVisibleComponent,
        projects: entry.isIntersecting,
      };
    });
  }

  React.useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(cbFunction, options);
    const currentTarget: HTMLElement | null = projectsRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [projectsRef, options]);

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
