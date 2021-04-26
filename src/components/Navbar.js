import React from "react";
import { NavLink, Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashLink } from "react-router-hash-link";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Navbar() {
  const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };
  

  return (
      <div>
        <nav className="pt-3 fixed-top">
          <ul className="mt-3 fixed-top" style={{ listStyleType: "none" }}>
            <li
              style={{ float: "left", textDecoration: "none" }}
              className="px-3 ml-n5"
            >
              <NavLink to="/">
                <img
                  className="mt-n2"
                  src="../../logo.png"
                  width="220"
                  height="50"
                />
              </NavLink>
            </li>
            <div>
              <li style={{ float: "right" }} className="mr-2 ml-n2">
                <DropdownButton
                  variant="outline-info"
                  // id="dropdown-basic-button"
                  title="Login"
                >
                  <Dropdown.Item>
                    <NavLink className="d-item d-flex justify-content-center" style={{ textDecoration: "none" }} to="/loginClient">
                     As Client
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink className="d-flex justify-content-center" style={{ textDecoration: "none" }} to="/loginTherapist">
                      As Therapist
                    </NavLink>
                  </Dropdown.Item>
                </DropdownButton>
              </li>{" "}
            </div>
            <div>
              <li style={{ float: "right" }} className="mr-2 px-2">
                <DropdownButton
                  variant="outline-info"
                  // id="dropdown-basic-button"
                  title="SignUp"
                >
                  <Dropdown.Item>
                    <NavLink className="d-item d-flex justify-content-center" style={{ textDecoration: "none" }} to="/signupClient">
                     As Client
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink className="d-flex justify-content-center" style={{ textDecoration: "none" }} to="/signupTherapist">
                      As Therapist
                    </NavLink>
                  </Dropdown.Item>
                </DropdownButton>
              </li>{" "}
            </div>
            <div>
              <li style={{ float: "right" }}>
                <HashLink
                  className="btn btn-outline-info"
                  scroll={(el) => scrollWidthOffset(el)}
                  smooth
                  style={{ textDecoration: "none" }}
                  to="/#about"
                >
                  About
                </HashLink>
              </li>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <li style={{ float: "right" }} className="px-2">
                <HashLink
                  className="btn btn-outline-info"
                  scroll={(el) => scrollWidthOffset(el)}
                  smooth
                  style={{ textDecoration: "none" }}
                  to="/#how-it-works"
                >
                  How It Works
                </HashLink>
              </li>
            </div>
          </ul>
        </nav>
      </div>
  );
}

// import {NavLink} from "react-router-bootstrap";
// <Nav variant="pills" defaultActiveKey="/">
export default Navbar;
