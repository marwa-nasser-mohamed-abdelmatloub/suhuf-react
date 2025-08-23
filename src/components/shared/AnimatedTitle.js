import React from "react";
import { useTheme } from "./ThemeProvider";
import PropTypes from "prop-types";

const AnimatedTitle = ({ children, level = 2, className = "", style = {} }) => {
  const theme = useTheme();
  const Tag = `h${level}`;

  return (
    <Tag
      className={`animated-title ${className}`}
      style={{
        color: theme.primary,
        textAlign: "center",
        fontWeight: "700",
        position: "relative",
        display: "block",
        ...style,
      }}
    >
      {children}
      <span
        className="title-underline"
        style={{
          position: "absolute",
          bottom: "-5px",
          right: "0",
          width: "50%",
          height: "3px",
          backgroundColor: theme.primary,
          transform: "scaleX(0)",
          transformOrigin: "right",
          transition: "transform 0.5s ease",
        }}
      ></span>
    </Tag>
  );
};

AnimatedTitle.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default AnimatedTitle;
