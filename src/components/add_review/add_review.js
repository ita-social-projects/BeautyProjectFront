import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Cookies from "js-cookie"
import $ from "jquery";
import jwtDecode from "jwt-decode";
import add_review from "./add_review.css";

const AddReviewModal = (props) => {
    const [formValue, setFormValue] = React.useState({
        text_body: "",
        rating: 0,
        from_user: 0,
        to_user: 0
    });

    let mainRaitingvalue = 0;

    let clicked = false

    const handleSubmit = async (event) => {
        const addReviewFormData = new FormData();
        addReviewFormData.append("text_body", formValue.text_body)
        addReviewFormData.append("rating", mainRaitingvalue)
        addReviewFormData.append("from_user", jwtDecode(Cookies.get("jwt_session")).user_id)
        addReviewFormData.append("to_user", props.to_user)
        event.preventDefault()

        const keyArray = ["text_body", "rating"]
        for (const currentKey of keyArray) {
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }

        try {
            const response = await axios({
                method: "post",
                url: "https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/api/v1/" + props.to_user + "/reviews/add/",
                data: addReviewFormData,
                headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
            });
            console.log(response.status === 201)
            $("#addReviewModal .btn-close").click()
            window.location.reload()

        } catch (error) {
            const errors = error.response.data
            for (const currentKey of Object.keys(errors)) {
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

    const changeStarsState = (event, id) => {
        let starsList = document.querySelectorAll(".add-review_star svg")
        let counter = 0

        for (let i = id; i < starsList.length; i++) {
            starsList[i].classList.remove("active")
        }
        while (counter <= id) {
            starsList[counter].classList.add("active")
            counter++
        }
    }

    const handleStarHover = (event, id) => {
        if (!clicked) {
            changeStarsState(event, id)
        }
    }

    const handleStarHoverStop = () => {
        if (!clicked) {
            let starsList = document.querySelectorAll(".add-review_star svg")
            for (const star of starsList) {
                star.classList.remove("active")
            }
        }
    }

    const handleRatingClick = (event, id) => {
        clicked = true
        changeStarsState(event, id)
        mainRaitingvalue = id + 1
    }

    return (
        <Container>
            <div className="modal fade" id="addReviewModal" tabIndex="-1" aria-labelledby="addReviewModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addReviewModalLabel">Add review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="add-review_inner__form__wrapper">
                                <form onSubmit={handleSubmit} className="add-review_form">
                                    <div className="add-review_form_item">
                                        <div className="add-review_inner_stars_wrapper d-flex justify-content-around"
                                             onMouseLeave={handleStarHoverStop}
                                             name="rating"
                                        >
                                            <div className="add-review_stars_wrapper d-flex flex-column">
                                                <div className="add-review_star">
                                                    <svg viewBox="0 0 260 245"
                                                         onMouseEnter={event => handleStarHover(event, 0)}
                                                         onClick={event => handleRatingClick(event, 0)}
                                                    >
                                                        <path d="m56,237 74-228 74,228L10,96h240"/>
                                                    </svg>
                                                </div>
                                                <div className="add-review_star_name">Awful</div>
                                            </div>
                                            <div className="add-review_stars_wrapper d-flex flex-column">
                                                <div className="add-review_star">
                                                    <svg viewBox="0 0 260 245"
                                                         onMouseEnter={event => handleStarHover(event, 1)}
                                                         onClick={event => handleRatingClick(event, 1)}>
                                                        <path d="m56,237 74-228 74,228L10,96h240"/>
                                                    </svg>
                                                </div>
                                                <div className="add-review_star_name">Not bad</div>
                                            </div>
                                            <div className="add-review_stars_wrapper d-flex flex-column">
                                                <div className="add-review_star">
                                                    <svg viewBox="0 0 260 245"
                                                         onMouseEnter={event => handleStarHover(event, 2)}
                                                         onClick={event => handleRatingClick(event, 2)}
                                                    >
                                                        <path d="m56,237 74-228 74,228L10,96h240"/>
                                                    </svg>
                                                </div>
                                                <div className="add-review_star_name">Good</div>
                                            </div>
                                            <div className="add-review_stars_wrapper d-flex flex-column">
                                                <div className="add-review_star">
                                                    <svg viewBox="0 0 260 245"
                                                         onMouseEnter={event => handleStarHover(event, 3)}
                                                         onClick={event => handleRatingClick(event, 3)}
                                                    >
                                                        <path d="m56,237 74-228 74,228L10,96h240"/>
                                                    </svg>
                                                </div>
                                                <div className="add-review_star_name">Well done</div>
                                            </div>
                                            <div className="add-review_stars_wrapper d-flex flex-column">
                                                <div className="add-review_star">
                                                    <svg viewBox="0 0 260 245"
                                                         onMouseEnter={event => handleStarHover(event, 4)}
                                                         onClick={event => handleRatingClick(event, 4)}
                                                    >
                                                        <path d="m56,237 74-228 74,228L10,96h240"/>
                                                    </svg>
                                                </div>
                                                <div className="add-review_star_name">Excellent</div>
                                            </div>
                                        </div>
                                        <p className="add-review_form_error_message">Error message</p>
                                    </div>
                                    <div className="add-review_form_item">
                                        <p className="add-review_form_error_message">Error message</p>
                                        <textarea
                                            type="text_body"
                                            name="text_body"
                                            className="add-review_form__input"
                                            placeholder={"Comment"}
                                            value={formValue.text_body}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="add-review_form_item">
                                        <button
                                            type="submit"
                                            className="add-review_form__input__button"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AddReviewModal
