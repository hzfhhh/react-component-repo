import React from "react";
import "./style.css";

export default class MLoading extends React.Component {
  render() {
    return (
      <div className="g-loading">
        <div className="dot-group">
          <div className="dot dot-1" />
          <div className="dot dot-2" />
          <div className="dot dot-3" />
          <div className="dot dot-4" />
        </div>
      </div>
    );
  }
}
