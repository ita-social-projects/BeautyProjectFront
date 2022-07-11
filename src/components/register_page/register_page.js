import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import "./register_page.css";
import user_image from "./assets/img/user.svg"

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


import LoginPage from "../login_page/login_page";

const RegisterPage = () => {
    const [formValue, setFormValue] = React.useState({
        email: "",
        first_name: "",
        phone_number: "",
        password: "",
        re_password: ""
    });

    const handleSubmit = async (event) => {
        const loginFormData = new FormData();
        loginFormData.append("email", formValue.email)
        loginFormData.append("first_name", formValue.first_name)
        loginFormData.append("phone_number", formValue.phone_number)
        loginFormData.append("password", formValue.password)
        loginFormData.append("re_password", formValue.re_password)
        event.preventDefault()


        const keyArray = ["email", "first_name", "phone_number", "password", "re_password"]
        for (const currentKey of keyArray) {
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }

        try {
            const response = await axios({
                method: "post",
                url: "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/auth/users/",
                data: loginFormData,
                headers: {"Content-Type": "application/json"},
            });

            //TODO: Redirect after successful registration

        } catch (error) {
            const errors = error.response.data
            for (const currentKey of Object.keys(errors)) {
                if (currentKey === "non_field_errors") {
                    setError("password", errors[currentKey])
                    continue
                }
                setError(currentKey, errors[currentKey])
            }
        }
    }

    const setError = (key, error_message) => {
        let currentElement = document.querySelector(`[name='${key}']`);
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.add("validation_error");
        currentErrorMessage.classList.add("error_message_shown");
        currentErrorMessage.innerText = error_message;
    }

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Container>
            <div className="inner__wrapper">
                <div className="inner__form__wrapper">
                    <div className="registration__header__wrapper">
                        <h1 className="registration__header">Sign up</h1>
                    </div>
                    <div className="user__image__wrapper">
                        <img src={user_image} alt="user image" className="user__image"/>
                    </div>
                    <form onSubmit={handleSubmit} className="register__form">
                        <div className="form__item">
                            <p className="form_error_message">Error message</p>
                            <input
                                type="email"
                                name="email"
                                className="form__input"
                                placeholder={"Email"}
                                value={formValue.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__item">
                            <p className="form_error_message">Error message</p>
                            <input
                                type="text"
                                name="first_name"
                                className="form__input"
                                placeholder={"First name"}
                                value={formValue.first_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__item">
                            <p className="form_error_message">Error message</p>
                            <input
                                type="text"
                                name="phone_number"
                                className="form__input"
                                placeholder={"Phone number"}
                                value={formValue.phone_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__item">
                            <p className="form_error_message">Error message</p>
                            <input
                                type="password"
                                name="password"
                                className="form__input"
                                placeholder={"Password"}
                                value={formValue.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__item">
                            <p className="form_error_message">Error message</p>
                            <input
                                type="password"
                                name="re_password"
                                className="form__input"
                                placeholder={"Repeat password"}
                                value={formValue.re_password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form__item">
                            <button
                                type="submit"
                                className="form__input__button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div className="navigation__button__wrapper">
                        <div className="navigation__button__text">
                            Already signed up?
                        </div>
                        <div className="navigation__button">
                            <Link to="/login">Sign in</Link>
                        </div>
                        <Routes>
                            <Route path="/login" element={<LoginPage/>}>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default RegisterPage
