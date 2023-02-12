import React from "react";
import { scrollToContact } from "../Utils";

interface Props {
  refToContact: React.RefObject<HTMLElement>;
  refToProjects: React.RefObject<HTMLElement>;
}

const Nav: React.FC<Props> = ({ refToContact, refToProjects }) => {
  function scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToProjects(): void {
    if (refToProjects.current) {
      refToProjects.current.scrollIntoView();
    }
  }

  return (
    <nav className="navbar">
      <a className="navbar__refresh" href="/">
        mapokes
      </a>
      <ul className="navbar__list">
        <li className="navbar__list__item">
          <button className="navbar__list__btn" onClick={() => scrollToTop()}>
            Top
          </button>
        </li>
        <li className="navbar__list__item">
          <button className="navbar__list__btn" onClick={() => scrollToProjects()}>
            Projects
          </button>
        </li>
        <li className="navbar__list__item">
          <button className="navbar__list__btn" onClick={() => scrollToContact(refToContact)}>
            Contact
          </button>
        </li>
      </ul>
      <a href="https://github.com/Mapokes" className="navbar__github" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-github navbar__github__icon"></i>
      </a>
    </nav>
  );
};
export default Nav;
