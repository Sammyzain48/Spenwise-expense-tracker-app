import React from "react";
const Button = ({
  background,
  border,
  textSize,
  textColor,
  size,
  padding,
  shadow,
  type = "button",
  onClick,
  stroke,
  children,
}) => {
  const buttonStyles = {
    width: `${size}px`,
    height: `${size}px`,
    color: textColor,
    backgroundColor: background,
    borderRadius: `${border}px`,
    fontSize: `${textSize}px`,
    padding: `${padding}px  ${padding * 2}px  `,
    cursor: "pointer",
    boxShadow: `${shadow}px ${shadow}px ${shadow}px rgba(${shadow})`,
    border: `${stroke}px solid black`,
  };
  return (
    <button style={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
