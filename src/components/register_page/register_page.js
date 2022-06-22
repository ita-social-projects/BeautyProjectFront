import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import "./register_page.css";

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

        console.log(loginFormData)

        try {
            const response = await axios({
                method: "post",
                url: "http://3.65.253.196/auth/users/",
                data: loginFormData,
                headers: {"Content-Type": "application/json"},
            });
            console.log(response)
        } catch (error) {
            console.log(error)
        }
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
                <form onSubmit={handleSubmit} className="register__form">
                    <div className="form__item">
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
                        />
                    </div>
                </form>
            </div>
        </Container>
    )
}

export default RegisterPage
