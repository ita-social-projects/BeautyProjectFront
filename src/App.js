import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import {MainPage} from "./components/main_page/MainPage";
import LoginPage from "./components/login_page/login_page";
import RegisterPage from "./components/register_page/register_page";
import AddReviewModal from "./components/add_review/add_review"
import NotFound from "./components/error_pages/NotFound/NotFound";

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
