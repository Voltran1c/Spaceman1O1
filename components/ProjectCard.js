import { useRef } from "react";
import uniqid from "uniqid";
import GitHubIcon from "@material-ui/icons/GitHub";
import LaunchIcon from "@material-ui/icons/Launch";

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rotate-x", `${(-y * 12).toFixed(2)}deg`);
    card.style.setProperty("--rotate-y", `${(x * 12).toFixed(2)}deg`);
    card.style.setProperty("--lift", "-8px");
  };

  const resetTilt = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
    card.style.setProperty("--lift", "0px");
  };

  return (
  <div
    ref={cardRef}
    className="project"
    onMouseMove={handleMouseMove}
    onMouseLeave={resetTilt}
  >
    {project.thumbnail && (
      <img
        className="project__thumbnail"
        src={project.thumbnail}
        alt="thumbnail"
      />
    )}

    <div className="project__info">
      {project.name && <h3>{project.name}</h3>}

      {project.description && (
        <div className="project__description paragraph__list">
          {project.description.map((item) => (
            <p key={uniqid()}>{item}</p>
          ))}
        </div>
      )}

      {project.stack && (
        <ul className="project__stack">
          {project.stack.map((item) => (
            <li key={uniqid()} className="project__stack-item">
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="project__links">
        {project.sourceCode && (
          <a
            href={project.sourceCode}
            target="_blank"
            rel="noreferrer"
            aria-label="source code"
            className="link link--icon"
          >
            <GitHubIcon />
          </a>
        )}

        {project.livePreview && (
          <a
            href={project.livePreview}
            target="_blank"
            rel="noreferrer"
            aria-label="live preview"
            className="link link--icon"
          >
            <LaunchIcon />
          </a>
        )}
      </div>
    </div>
  </div>
  );
};

export default ProjectCard;
