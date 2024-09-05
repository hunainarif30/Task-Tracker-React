// import React from 'react'
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {
  const onClick = () => {
    console.log("Chutiya");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button text="Add" color="black" onClick={onClick} />
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
