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

interface Props {
  refToContact: React.RefObject<HTMLElement>;
}

const SectionFront: React.FC<Props> = ({ refToContact }) => {
  return (
    <section className="section-front">
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
