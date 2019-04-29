import React from "react";
import PropTypes from "prop-types";
import { Accounts } from "meteor/accounts-base";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";

export const PrivateHeader = props => {
  const navimageSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";

  return (
    <div className="header">
      <div className="header__content ">
        <img
          onClick={props.handleNavToggle}
          src={navimageSrc}
          alt=""
          className="header__nav-toggle"
        />
        <h1 className="header__title">{props.title}</h1>
        <button
          className="button button--link-text"
          onClick={() => props.handleLogout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    isNavOpen: Session.get("isNavOpen"),
    handleNavToggle: () => Session.set("isNavOpen", !Session.get("isNavOpen"))
  };
}, PrivateHeader);
// export default PrivateHeader;

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleNavToggle: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
};
