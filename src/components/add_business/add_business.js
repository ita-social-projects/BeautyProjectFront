import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import {BASE_URL, axios_request, getLoginInfo} from "../../utils/utils";
import "./add_business.css";
import right_arrow from "./assets/img/right-arrow.png";
import TimeRange from 'react-time-range';
import moment from 'moment';
import Cookies from "js-cookie";

import {useNavigate} from "react-router-dom";
import NotFound from "../error_pages/NotFound/NotFound";

const AddBusiness = () => {
    const [image, setImage] = useState(null)
    const [startTime, setStartTime] = useState("2022-07-12T09:00:00Z")
    const [endTime, setEndTime] = useState("2022-07-12T09:00:00Z")
    const [day, setDay] = useState(null)
    const [formValue, setFormValue] = React.useState({
        name: "",
        business_type: "",
        owner: 0,
        location: {
            address: "",
            latitude: -1,
            longitude: -1
        },
        description: "",
        Mon: [],
        Tue: [],
        Wed: [],
        Thu: [],
        Fri: [],
        Sat: [],
        Sun: []
    });

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(JSON.stringify(formValue))

        const keyArray = ["input_name", "input_business_type", "input_logo", "input_description"]
        for (const currentKey of keyArray) {
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("add-business_validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }
        let currentKey = "input_working_time"
        let currentElement = document.querySelector(`[aria-valuetext='${currentKey}']`);
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.remove("add-business_validation_error");
        currentErrorMessage.classList.remove("error_message_shown");

        await axios_request({
            method: "post",
            url: BASE_URL + "businesses/",
            data: JSON.stringify(formValue)
        }).then(response => {
            navigate("/")
        }).catch(error => {
            const errors = error.response.data
            console.log(errors)
            for (const currentKey of Object.keys(errors)) {
                setError(currentKey, errors[currentKey])
            }
            window.scrollTo(0,0)
        });
    }

    const setError = (key, error_message) => {
        let currentElement = ""
        if (["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(key)){
            key = "input_working_time"
            currentElement = document.querySelector(`[aria-valuetext='${key}']`);
        }
        else{
            key = "input_" + key
            currentElement = document.querySelector(`[name='${key}']`);
        }
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.add("add-business_validation_error");
        currentErrorMessage.classList.add("error_message_shown");
        currentErrorMessage.innerText = error_message;
    }

    const handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name.replace("input_", "")]: event.target.value
        });
    }

    const handleAddressChange = (event) => {
        setFormValue({
            ...formValue,
            location: {address: event.target.value, latitude: -1, longitude: -1}
        });
    }

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
        }
    }

    const setTime = (event) => {
        if (event.startTime){
            setStartTime(event.startTime)
        }

        if (event.endTime){
            setEndTime(event.endTime)
        }
    }

    const handleDay = (event) => {
        setDay(event.target.ariaValueText)
    }

    const handleTimePicker = (event) => {
        if (day != null){
            const start = new Date(startTime)
            const end = new Date(endTime)

            const start_time = start.toLocaleTimeString("en-US", {hour12: false, hour: '2-digit', minute:'2-digit'})
            const end_time = end.toLocaleTimeString("en-US", {hour12: false, hour: '2-digit', minute:'2-digit'})

            formValue[day.substring(0, 3)] = [start_time, end_time]

            let currentCalendarItem = document.querySelector(`[aria-valuetext='${day}']`);
            currentCalendarItem.style.background = "#D9D9D9"
            let child = currentCalendarItem.querySelector(".add-business_calendar_item_time h5")
            child.innerHTML = `${start_time} - ${end_time}`
        }
    }

    if (Cookies.get("jwt_session") === undefined){
        return (
            <NotFound/>
        )
    }
    else{
        return (
            <Container fluid={true}>
                <form onSubmit={handleSubmit} className="add-business_form">
                    <div className="add-business_wrapper">
                        <div className="add-business_midline_block">
                            <hr/>
                            <div className="add-business_midline_header_block">
                                <h1 className="add-business_midline_header">Create business</h1>
                            </div>
                            <hr/>
                        </div>
                        <div className="add-business_form_section">
                            <div className="add-business_form_section_wrapper">
                                <div className="add-business_form_item">
                                    <p className="add-business_form_error_message">Error message</p>
                                    <input
                                        type="text"
                                        name="input_name"
                                        className="add-business_form__input"
                                        placeholder={"Business name"}
                                        value={formValue.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="add-business_form_item">
                                    <p className="add-business_form_error_message">Error message</p>
                                    <input
                                        type="text"
                                        name="input_business_type"
                                        className="add-business_form__input"
                                        placeholder={"Business type"}
                                        value={formValue.business_type}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="add-business_form_item">
                                    <p className="add-business_form_error_message">Error message</p>
                                    <textarea
                                        type="text"
                                        name="input_description"
                                        className="add-business_form__textarea"
                                        placeholder={"Description"}
                                        value={formValue.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="add-business_add_logo_block">
                                    <div className="add-business_form_item_input">
                                        <p className="add-business_form_error_message">Error message</p>
                                        <label htmlFor="upload_logo">Choose file <img src={right_arrow} alt="logo"/></label>
                                        <input
                                            type="file"
                                            accept=".png, .jpg"
                                            name="input_logo"
                                            id="upload_logo"
                                            placeholder={"Business name"}
                                            value=""
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="add-business_logo_container">
                                        <img src={image} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="add-business_midline_block">
                            <hr/>
                            <div className="add-business_midline_header_block">
                                <h1 className="add-business_midline_header">Location</h1>
                            </div>
                            <hr/>
                        </div>
                        <div className="add-business_form_section">
                            <div className="add-business_form_section_inner">
                                <div className="add-business_form_item">
                                    <p className="add-business_form_error_message">Error message</p>
                                    <input
                                        type="text"
                                        name="input_location"
                                        className="add-business_form__input"
                                        placeholder={"Address"}
                                        value={formValue.location.address}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="add-business_midline_block">
                            <hr/>
                            <div className="add-business_midline_header_block">
                                <h1 className="add-business_midline_header">Working time</h1>
                                <p className="add-business_midline_comment">(optional)</p>
                            </div>
                            <hr/>
                        </div>
                        <div className="add-business_form_section">
                            <p className="add-business_form_error_message">Error message</p>
                            <div className="add-business_form_section_calendar"
                                 aria-valuetext="input_working_time"
                            >
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Monday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Mon</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Tuesday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Tue</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Wednesday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Wed</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Thursday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Thu</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Friday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Fri</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Saturday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Sat</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                                <div
                                    className="add-business_calendar_item"
                                    style={{background: "rgb(151, 148, 151)"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Sunday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Sun</h2>
                                    </div>
                                    <div className="add-business_calendar_item_time">
                                        <h5>Day off</h5>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade" id="timePickerModal" tabIndex="-1" aria-labelledby="timePickerModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="timePickerModalLabel">Choose time for {day}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="add-business_time_picker_main_wrapper">
                                                <div className="add-business_time_picker_wrapper">
                                                    <TimeRange
                                                        startMoment={startTime}
                                                        endMoment={endTime}
                                                        onChange={setTime}
                                                        use24Hours={true}
                                                        sameIsValid={false}
                                                    />
                                                </div>
                                                <div className="add-business_time_picker_submit_block">
                                                    <a
                                                        className="add-business_time_picker_submit"
                                                        data-bs-dismiss="modal"
                                                        onClick={handleTimePicker}
                                                        href="#"
                                                    >
                                                        Add
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="add-business_form_section">
                            <div className="add-business_submit_button_block">
                                <button type="submit"
                                        className="add-business_form__input__button"
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        )
    }

}

export default AddBusiness
