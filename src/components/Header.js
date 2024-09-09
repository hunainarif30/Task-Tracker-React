// import React from 'react'
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button text="Add" color="black" onClick={onAdd} />
    </header>
  );
};
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
