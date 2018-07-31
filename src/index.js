import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { testMLoading } from "./page/test-m-loading";
import { testPagination } from "./page/test-pagination";
import { testSwiper } from "./page/test-swiper";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="side-bar">
          <div className="item">
            <Link to="/m-loading">加载动画</Link>
          </div>
          <div className="item">
            <Link to="/pagination">分页</Link>
          </div>
          <div className="item">
            <Link to="/swiper">轮播图</Link>
          </div>
        </div>
        <div className="main-content">
          <Route path="/m-loading" component={testMLoading} />
          <Route path="/pagination" component={testPagination} />
          <Route path="/swiper" component={testSwiper} />
        </div>
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
