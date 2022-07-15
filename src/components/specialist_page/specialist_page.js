import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "./specialist_page.css";
import {BASE_URL, changeLink} from "../../utils/utils";
import AddReviewModal from "../add_review/add_review";


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

    const request_url = "specialist/"

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
                url: BASE_URL + request_url + formValue.id,
                headers: {"Content-Type": "application/json"},
            });

            document.getElementsByClassName("specialist_img")[0].src = response.data.avatar;

            for (const key of fields){
                if (response.data[key] !== ""){
                    document.getElementsByClassName("specialist_"+key)[0].innerHTML = response.data[key];
                }
            }
            document.getElementsByClassName("specialist_img")[0].src = changeLink(response.data.avatar);
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

                    <Card>
                    <Card.Header className="card-order">
                    <Row><Col className="specialist_first_name"></Col><Col xs={12} className="specialist_patronymic"></Col><Col xs={12} className="specialist_last_name"></Col></Row>
                    </Card.Header>
                        <Col>
                            <img className="specialist_img" alt="specialist_avatar"/>
                            <Col xs={9} className="specialist_bio"></Col>
                        </Col>
                    <Row>Specialist Rating: <Col className="specialist_rating"></Col>
                        <button type="button" className="specialist-page_add_review_button" data-bs-toggle="modal" data-bs-target="#addReviewModal">
                            Add review
                        </button>
                    </Row>
                    </Card>
                </Container>
            </Container>
            <AddReviewModal to_user={formValue.id}/>
        </Container>
    )
}

export default SpecialistPage;
