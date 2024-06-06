import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Er is een fout opgetreden:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Er is iets misgegaan.</h1>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Validatie voor children
};

export default ErrorBoundary;
