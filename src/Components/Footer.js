import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer mt-5 py-3 bg-dark text-white">
      <div className="container text-center">
        <p>Follow me on</p>
        <div className="d-flex justify-content-center">
          <a
            href="https://github.com/nisanurbayrak"
            className="text-white mx-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://linkedin.com/in/nisanurbayrak"
            className="text-white mx-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
