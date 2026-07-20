import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/theme";
import { header, about, projects, skills, contact } from "../data/portfolio";
import SectionOrb from "./SectionOrb";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import Brightness2Icon from "@material-ui/icons/Brightness2";

const Navbar = () => {
  const [showNavList, setShowNavList] = useState(false);
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const { wordmark } = header;
  const { names } = about;
  const defaultWordmark = "About Me";
  const brandOrbColor = themeName === "dark" ? "#64ffda" : "#3a86ff";

  const toggleNavListOverlay = () => {
    showNavList
      ? document.body.classList.remove("disable-scroll")
      : document.body.classList.add("disable-scroll");
    setShowNavList(!showNavList);
  };

  const hideNavListOverlay = () => {
    document.body.classList.remove("disable-scroll");
    setShowNavList(false);
  };

  useEffect(() => {
    const hideNavListOverlayIfScreenIsTooBig = () =>
      window.innerWidth > 600 ? hideNavListOverlay() : null;
    window.addEventListener("resize", hideNavListOverlayIfScreenIsTooBig);
    return () =>
      window.removeEventListener("resize", hideNavListOverlayIfScreenIsTooBig);
  }, []);

  return (
    <nav className="nav container animate__animated animate__fadeIn animate__delay-5s">
      <div className="nav__brand">
        <span className="nav__brand-orb">
          <SectionOrb shape="ring" color={brandOrbColor} size={44} />
        </span>
        <a href="#top" onClick={hideNavListOverlay} className="link nav__brand-link">
          <span className="nav__brand-full">
            {wordmark || names.join(" ") || defaultWordmark}
          </span>
          <span className="nav__brand-short">
            {wordmark || names.map((name) => name[0]).join("") || defaultWordmark}
          </span>
        </a>
      </div>

      <ul
        className="nav__list"
        style={{ display: showNavList ? "flex" : null }}
      >
        {projects.length && (
          <li className="nav__list-item">
            <a
              href="#projects"
              onClick={hideNavListOverlay}
              className="link link--nav"
            >
              Projects
            </a>
          </li>
        )}

        {skills.length && (
          <li className="nav__list-item">
            <a
              href="#skills"
              onClick={hideNavListOverlay}
              className="link link--nav"
            >
              Skills
            </a>
          </li>
        )}

        {contact.email && (
          <li className="nav__list-item">
            <a
              href="#contact"
              onClick={hideNavListOverlay}
              className="link link--nav"
            >
              Contact
            </a>
          </li>
        )}
      </ul>

      <div className="nav__actions">
        <button
          type="button"
          onClick={toggleNavListOverlay}
          aria-label="toggle navigation"
          className="btn btn--icon nav__button nav__hamburger"
        >
          {showNavList ? <CloseIcon /> : <MenuIcon />}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="toggle theme"
          className="btn btn--icon nav__button"
        >
          {themeName === "dark" ? <WbSunnyRoundedIcon /> : <Brightness2Icon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
