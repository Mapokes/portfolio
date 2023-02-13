import React from "react";

const Footer: React.FC = () => {
  console.log("Footer rendered");
  return (
    <footer className="footer">
      <h4 className="footer__title">mapokes</h4>
      <a className="footer__link" href="https://github.com/Mapokes" target="_blank" rel="noreferrer">
        <i className="fa-brands fa-github footer__link__icon"></i>
      </a>
    </footer>
  );
};
export default Footer;
