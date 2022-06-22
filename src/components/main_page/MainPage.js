import React, {Component} from 'react';
import logo from "../main_page/assets/logo.png"
import "./MainPage.css"

class MainPage extends Component {
    render() {
        return (
            <div className="container">
                <header className="MP-header">
                    <img src={logo} className="MP-logo" alt="logo"/>
                    <a
                        className="MP-link"
                        href="https://github.com/ita-social-projects/BeautyProject"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Our backend repository
                    </a>
                </header>
            </div>
        );
    }
}

export default MainPage;
