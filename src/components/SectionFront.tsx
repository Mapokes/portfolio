import React from "react";
import kot from "../images/kot.jpg";
import imgUnavaiable from "../images/NoImageAvailable.jpg";
import htmlImg from "../images/icons8-html-5.svg";
import cssImg from "../images/icons8-css3.svg";
import jsImg from "../images/icons8-javascript.svg";
import reactImg from "../images/icons8-react.svg";
import typesciptImg from "../images/icons8-typescript-48.svg";
import sassImg from "../images/Sass_Logo_Color.svg";
import { scrollToContact } from "../Utils";
import IntersectionObserverOptions from "../model";

interface Props {
  refToContact: React.RefObject<HTMLElement>;
  setVisibleComponent: React.Dispatch<
    React.SetStateAction<{
      top: boolean;
      projects: boolean;
      contact: boolean;
    }>
  >;
}

const SectionFront: React.FC<Props> = ({ refToContact, setVisibleComponent }) => {
  const frontRef = React.useRef<HTMLElement>(null);
  const options = React.useMemo((): IntersectionObserverOptions => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };
  }, []);

  function cbFunction(entries: Array<any>): void {
    const [entry] = entries;
    setVisibleComponent((prevVisibleComponent) => {
      return {
        ...prevVisibleComponent,
        top: entry.isIntersecting,
      };
    });
  }

  React.useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(cbFunction, options);
    const currentTarget: HTMLElement | null = frontRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [frontRef, options]);

  return (
    <section className="section-front" ref={frontRef}>
      <h1 className="section-front__title">
        Welcome! <br /> I'm <span>Mapokes</span>
      </h1>
      <p className="section-front__description">Front-end developer hobbyist</p>
      <button className="section-front__btn" onClick={() => scrollToContact(refToContact)}>
        CONTACT ME
      </button>
      <ul className="section-front__list">
        <li className="section-front__list__item">
          HTML <img className="front-img" src={htmlImg} alt={imgUnavaiable} />
        </li>
        <li className="section-front__list__item">
          CSS <img className="front-img" src={cssImg} alt={imgUnavaiable} />
        </li>
        <li className="section-front__list__item">
          JavaScript <img className="front-img" src={jsImg} alt={imgUnavaiable} />
        </li>
        <li className="section-front__list__item">
          React <img className="front-img" src={reactImg} alt={imgUnavaiable} />
        </li>
        <li className="section-front__list__item">
          TypeScript <img className="front-img" src={typesciptImg} alt={imgUnavaiable} />
        </li>
        <li className="section-front__list__item">
          SASS <img className="front-img" src={sassImg} alt={imgUnavaiable} />
        </li>
      </ul>
      <img className="section-front__kot" src={kot} alt={imgUnavaiable} />
    </section>
  );
};
export default SectionFront;
