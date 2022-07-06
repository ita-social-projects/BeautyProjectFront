import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MainPage } from "./components/main_page/MainPage";
import { LoginPage } from "./components/login_page/login_page";
import RegisterPage from "./components/register_page/register_page";
import StatisticPage from "./components/statisticPage/statisticPage";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/statistic/:businessId" element={<StatisticPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
