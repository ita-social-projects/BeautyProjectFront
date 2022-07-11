import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import "./login_page.css";
import user_image from "./assets/img/user.svg"
import RegisterPage from "../register_page/register_page";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";


const LoginPage = () => {
    const [formValue, setFormValue] = React.useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        const loginFormData = new FormData();
        loginFormData.append("email", formValue.email)
        loginFormData.append("password", formValue.password)
        event.preventDefault()

        const keyArray = ["email", "password"]
        for (const currentKey of keyArray){
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }

        try {
            const response = await axios({
                method: "post",
                url: "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/auth/jwt/create/",
                data: loginFormData,
                headers: {"Content-Type": "application/json"},
            });

            const name = "jwt_session";
            const value = response.data["access"]; 
            const days = 10;

            var expires = "";

            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days*24*60*60*1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "")  + expires + "; path=/";
            navigate("/")
            window.location.reload()
        } catch (error) {
            const errors = error.response.data
            for (const currentKey of Object.keys(errors)){
                if (currentKey === "detail") {
                    setError("email", errors["detail"])
                    continue
                }
                if (currentKey !== "status_code") {
                    setError(currentKey, errors[currentKey])
                }
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
                   <div className="login__header__wrapper">
                       <h1 className="login__header">Sign in</h1>
                   </div>
                   <div className="user__image__wrapper">
                       <img src={user_image} alt="user image" className="user__image"/>
                   </div>
                   <form onSubmit={handleSubmit} className="login__form">
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
                               type="password"
                               name="password"
                               className="form__input"
                               placeholder={"Password"}
                               value={formValue.password}
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
                           Don`t have an account? Create it
                       </div>
                       <div className="navigation__button">
                           <Link to="/register">Sign up</Link>
                       </div>
                       <Routes>
                           <Route path="/register" element={<RegisterPage/>}>
                           </Route>
                       </Routes>
                   </div>
               </div>
            </div>
        </Container>
    )
}

export default LoginPage
