import React from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/esm/Image";
import b_image from "./assets/b-modified.png";

export default function Footer() {
  return (
    <div className="container-fluid mt-3">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-muted">© 2022 Beauty, Inc</p>

        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
        >
          <Image src={b_image} className="brand_icon" />
        </Link>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link className="nav-link px-2 text-muted" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="https://docs.google.com/document/d/1c1D8Xoh0WlrL_sSbx7l_OJKcTsyhJsN_WS0lRB6Dt5k/edit"
              target="_blank"
              className="nav-link px-2 text-muted"
              rel="noreferrer"
            >
              Features
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/ita-social-projects/BeautyProject"
              target="_blank"
              className="nav-link px-2 text-muted"
              rel="noreferrer"
            >
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a
              href="https://github.com/ita-social-projects/BeautyProject#readme"
              className="nav-link px-2 text-muted"
              rel="noreferrer"
              target="_blank"
            >
              About
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
