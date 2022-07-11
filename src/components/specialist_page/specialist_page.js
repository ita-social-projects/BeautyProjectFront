import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./specialist_page.css";


const SpecialistPage = () => {
    const [formValue, setFormValue] = React.useState({
        id: "",
    });

    const fields = [
        "first_name",
        "last_name",
        "patronymic",
        "bio",
        "rating"
    ]

    const url = "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/"
    const request_url = "api/v1/specialist/"

    const handleSubmit = async (event) => {
        const specialistFormData = new FormData();
        specialistFormData.append("id", formValue.id)
        event.preventDefault()

        const currentKey = ["id"]
        let currentElement = document.querySelector(`[name='${currentKey}']`);
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.remove("validation_error");
        currentErrorMessage.classList.remove("error_message_shown");

        try {
            document.getElementsByClassName("error_message")[0].style.visibility = "hidden";
            const response = await axios({
                method: "get",
                url: url + request_url + formValue.id,
                headers: {"Content-Type": "application/json"},
            });

            document.getElementsByClassName("specialist_img")[0].src = response.data.avatar;
            
            for (const key of fields){
                if (response.data[key] !== ""){
                    document.getElementsByClassName("specialist_"+key)[0].innerHTML = response.data[key];
                }
            }
            document.getElementsByClassName("specialist_img")[0].src = response.data.avatar;
            document.getElementsByClassName("specialist_info")[0].style.visibility = "visible";

        } catch (error) {
            document.getElementsByClassName("specialist_info")[0].style.visibility = "hidden";
            document.getElementsByClassName('specialist_img')[0].removeAttribute('src');
            document.getElementsByClassName("error_message")[0].style.visibility = "visible";
            console.log("Error")
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
            <Container>
                <div className="inner__form__wrapper">
                    <form onSubmit={handleSubmit} className="specialist__info__form">
                        <div className="form__item">
                            <p className="error_message">No such specialist</p>
                            <input
                                type="id"
                                name="id"
                                className="form__input"
                                placeholder={"Id"}
                                value={formValue.id}
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

                </div>
                <Container className="specialist_info">

                    <Row>
                        <Col>
                            <img className="specialist_img" alt="specialist_avatar"/>
                        </Col>
                    </Row>

                    <Row><Col className="specialist_first_name"></Col></Row>
                    <Row><Col className="specialist_last_name"></Col></Row>
                    <Row><Col className="specialist_patronymic"></Col></Row>
                    <Row><Col className="specialist_bio"></Col></Row>
                    <Row><Col className="specialist_rating"></Col></Row>
                </Container>
            </Container>
        </Container>
    )
}

export default SpecialistPage;
