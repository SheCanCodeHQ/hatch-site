import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";

const TopNav = ({ href, visible }, { router }) => {
  const query = new URLSearchParams(router.history.location.search);
  const backPath = query.get("backPath") || href;
  return (
    <div>
      {visible && (
        <Link className="square button" to={backPath}>
          <Icon.ArrowLeft />
        </Link>
      )}
    </div>
  );
};

TopNav.propTypes = {
  href: PropTypes.string,
  visible: PropTypes.bool,
};

TopNav.defaultProps = {
  href: "/",
  visible: false,
};

TopNav.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      location: PropTypes.shape({
        search: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    href: state.pageNav.abovePath,
    visible: state.pageNav.showBackButton,
  });

export default connect(mapStateToProps)(TopNav);
