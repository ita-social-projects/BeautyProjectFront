import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./components/main_page/MainPage";
import LoginPage from "./components/login_page/login_page";
import RegisterPage from "./components/register_page/register_page";
import StatisticPage from "./components/statisticPage/statisticPage";
import SpecialistPage from "./components/specialist_page/specialist_page.js";
import AddReviewModal from "./components/add_review/add_review"
import NotFound from "./components/error_pages/NotFound/NotFound";
import TNavbar from "./components/navbar/TNavbar";
import ServiceByBusiness from "./components/services_by_business/services_by_business";
import ParticularBusiness from "./components/business_page/business_page";
import BusinessList from "./components/businesses_list/BusinessesList";
import AddBusiness from "./components/add_business/add_business";
import Footer from "./components/footer/footer";
import MyOrders from "./components/my_orders/MyOrders";

import "./App.css"
import EditBusiness from "./components/edit_business/edit_business.js";
import "./App.css";
import MyProfile from "./components/my_profile/MyProfile";
import BusinessesSearch from "./components/businesses_search/businesses_search";
import EditProfile from "./components/edit_profile/EditProfile";
import MyBusinessesList from "./components/my_businesses/MyBusinessesList";

class App extends React.Component {
    render() {
        return (
            <Router>
            <script
                src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
                crossorigin></script>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossorigin="anonymous"
                />
                <div>
                    <nav>
                    <TNavbar></TNavbar>
                    </nav>
                    <Routes>
                        <Route path="/" element={<MainPage/>}>
                        </Route>
                        <Route path="/login" element={<LoginPage/>}>
                        </Route>
                        <Route path="/register" element={<RegisterPage/>}>
                        </Route>
                        <Route path="/statistic/:businessId" element={<StatisticPage />} />
                        <Route path="/specialist" element={<SpecialistPage/>}>
                        </Route>
                        <Route path="/add_review" element={<AddReviewModal to_user="63"/>}>
                        </Route>
                        <Route path="/businesses_search" element={<BusinessesSearch/>}>
                        </Route>
                        <Route path="/business/:id" element={<ParticularBusiness/>}>
                        </Route>
                        <Route path="/business/:id/services" element={<ServiceByBusiness/>}>
                        </Route>
                        <Route path="/add_business" element={<AddBusiness/>}>
                        </Route>
                        <Route path="/edit_business/:id" element={<EditBusiness/>}>
                        </Route>
                        <Route path="*" element={<NotFound />}>
                        </Route>
                        <Route path="/all_businesses" element={<BusinessList/>}>
                        </Route>
                        <Route path="/my_profile" element={<MyProfile/>}>
                        </Route>
                        <Route path="/my/orders" element={<MyOrders/>}>
                        </Route>
                        <Route path="/edit_profile" element={<EditProfile/>}>
                        </Route>
                        <Route path="/my_businesses" element={<MyBusinessesList/>}>
                        </Route>
                    </Routes>

                    <Footer />

                </div>
            </Router>
        )
    }
}

export default App;
