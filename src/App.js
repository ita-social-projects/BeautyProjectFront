import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { MainPage } from "./components/main_page/MainPage";
import { LoginPage } from "./components/login_page/login_page";
import RegisterPage from "./components/register_page/register_page";
import StatisticPage from "./components/statisticPage/statisticPage";
import LoginPage from "./components/login_page/login_page";
import AddReviewModal from "./components/add_review/add_review"
import NotFound from "./components/error_pages/NotFound/NotFound";
import TNavbar from "./components/navbar/TNavbar";

class App extends React.Component {
    render() {
        return (
            <Router>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossorigin="anonymous"
                />
                <div>
                    <nav>
                    <TNavbar></TNavbar>
                        <ul>
                            <li>
                                <Link to="/add_review">Add review</Link>
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/" element={<MainPage/>}>
                        </Route>
                        <Route path="/login" element={<LoginPage/>}>
                        </Route>
                        <Route path="/register" element={<RegisterPage/>}>
                        </Route>
                        <Route path="/statistic/:businessId" element={<StatisticPage />} />
                        <Route path="/add_review" element={<AddReviewModal to_user="63"/>}>
                        </Route>
                        <Route path="*" element={<NotFound />}>
                        </Route>
                    </Routes>
                </div>
            </Router>
        )
    }
}

export default App;
