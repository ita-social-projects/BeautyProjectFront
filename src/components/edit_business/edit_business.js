import React, {useCallback, useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import {BASE_URL, axios_request, getLoginInfo} from "../../utils/utils";
import "./edit_business.css";
import right_arrow from "./assets/img/right-arrow.png";
import TimeRange from 'react-time-range';
import moment from 'moment';
import Cookies from "js-cookie";

import {useNavigate, useParams} from "react-router-dom";
import NotFound from "../error_pages/NotFound/NotFound";

const EditBusiness = () => {
    const [image, setImage] = useState(null)
    const [startTime, setStartTime] = useState("2022-07-12T09:00:00Z")
    const [endTime, setEndTime] = useState("2022-07-12T09:00:00Z")
    const [day, setDay] = useState(null)
    const [businessInfo, setbusinessInfo] = React.useState({
        name: "",
        business_type: "",
        owner: 0,
        location: {
            address: "",
            latitude: "",
            longitude: ""
        },
        description: "",
        working_time: {
            Mon: [],
            Tue: [],
            Wed: [],
            Thu: [],
            Fri: [],
            Sat: [],
            Sun: []
        }
    });

    const [formValue, setFormValue] = React.useState({
        name: "",
        business_type: "",
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

        for (const key of Object.keys(formValue)){
            formValue[key] = businessInfo[key]
        }
        for (const key of Object.keys(businessInfo.working_time)){
            formValue[key] = businessInfo.working_time[key]
        }

        const keyArray = ["input_name", "input_business_type", "input_logo", "input_description"]
        for (const currentKey of keyArray) {
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("edit-business_validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }
        let currentKey = "input_working_time"
        let currentElement = document.querySelector(`[aria-valuetext='${currentKey}']`);
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.remove("edit-business_validation_error");
        currentErrorMessage.classList.remove("error_message_shown");

        await axios_request({
            method: "patch",
            url: BASE_URL + "business/" + id + "/",
            data: JSON.stringify(formValue)
        }).then(response => {
            navigate("/business/" + id)
        }).catch(error => {
            const errors = error.response.data
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
        if (key === "input_Business"){
            key = "input_name"
            currentElement = document.querySelector(`[name='${key}']`);
        }
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.classList.add("edit-business_validation_error");
        currentErrorMessage.classList.add("error_message_shown");
        currentErrorMessage.innerText = error_message;
    }

    const {id} = useParams()

    const getBusinessInfo = useCallback(
        async () => {
            await axios_request({
                method: "get",
                url: BASE_URL + "business/" + id,
            }).then(response => {
                setbusinessInfo(response.data)
            }).catch(err => {
                console.log(err)
            })
        }, []
    );

    const handleChange = (event) => {
        setbusinessInfo({
            ...businessInfo,
            [event.target.name.replace("input_", "")]: event.target.value
        });
    }

    const handleAddressChange = (event) => {
        setbusinessInfo({
            ...businessInfo,
            location: {address: event.target.value, latitude: businessInfo.location.latitude, longitude: businessInfo.location.longitude}
        });
    }

    const handleLatitudeChange = (event) => {
        setbusinessInfo({
            ...businessInfo,
            location: {address: businessInfo.location.address, latitude: event.target.value, longitude: businessInfo.location.longitude}
        });
    }

    const handleLongitudeChange = (event) => {
        setbusinessInfo({
            ...businessInfo,
            location: {address: businessInfo.location.address, latitude: businessInfo.location.latitude, longitude: event.target.value}
        });
    }

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
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

            businessInfo.working_time[day.substring(0, 3)] = [start_time, end_time]

            let currentCalendarItem = document.querySelector(`[aria-valuetext='${day}']`);
            currentCalendarItem.style.background = "#D9D9D9"
            let child = currentCalendarItem.querySelector(".edit-business_calendar_item_time h5")
            child.innerHTML = `${start_time} - ${end_time}`
        }
    }

    useEffect(() => {
        getBusinessInfo();
    }, [getBusinessInfo])

    if (Cookies.get("jwt_session") === undefined){
        return (
            <NotFound/>
        )
    }
    else{
        return (
            <Container fluid={true}>
                <form onSubmit={handleSubmit} className="edit-business_form">
                    <div className="edit-business_wrapper">
                        <div className="edit-business_midline_block">
                            <hr/>
                            <div className="edit-business_midline_header_block">
                                <h1 className="edit-business_midline_header">Edit business</h1>
                            </div>
                            <hr/>
                        </div>
                        <div className="edit-business_form_section">
                            <div className="edit-business_form_section_wrapper">
                                <div className="edit-business_form_item">
                                    <p className="edit-business_form_error_message">Error message</p>
                                    <input
                                        type="text"
                                        name="input_name"
                                        className="edit-business_form__input"
                                        placeholder={"Business name"}
                                        value={businessInfo.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-business_form_item">
                                    <p className="edit-business_form_error_message">Error message</p>
                                    <input
                                        type="text"
                                        name="input_business_type"
                                        className="edit-business_form__input"
                                        placeholder={"Business type"}
                                        value={businessInfo.business_type}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-business_form_item">
                                    <p className="edit-business_form_error_message">Error message</p>
                                    <textarea
                                        type="text"
                                        name="input_description"
                                        className="edit-business_form__textarea"
                                        placeholder={"Description"}
                                        value={businessInfo.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="edit-business_add_logo_block">
                                    <div className="edit-business_form_item_input">
                                        <p className="edit-business_form_error_message">Error message</p>
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
                                    <div className="edit-business_logo_container">
                                        <img src={image} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="edit-business_midline_block">
                            <hr/>
                            <div className="edit-business_midline_header_block">
                                <h1 className="edit-business_midline_header">Location</h1>
                            </div>
                            <hr/>
                        </div>
                        <div className="edit-business_form_section">
                            <div className="edit-business_form_section_inner">
                                <div className="edit-business_form_section_inner_wrapper">
                                    <div className="edit-business_form_item">
                                        <p className="edit-business_form_error_message">Error message</p>
                                        <input
                                            type="text"
                                            name="input_location"
                                            className="edit-business_form__input"
                                            placeholder={"Address"}
                                            value={businessInfo.location.address}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="edit-business_form_item">
                                        <p className="edit-business_form_error_message">Error message</p>
                                        <input
                                            type="text"
                                            name="input_location"
                                            className="edit-business_form__input"
                                            placeholder={"Latitude"}
                                            value={businessInfo.location.latitude}
                                            onChange={handleLatitudeChange}
                                        />
                                    </div>
                                    <div className="edit-business_form_item">
                                        <p className="edit-business_form_error_message">Error message</p>
                                        <input
                                            type="text"
                                            name="input_location"
                                            className="edit-business_form__input"
                                            placeholder={"Longitude"}
                                            value={businessInfo.location.longitude}
                                            onChange={handleLongitudeChange}
                                        />
                                    </div>
                                </div>
                                <div className="edit-business_main_map_wrapper">
                                    <iframe width={340} height={340} title="BusinessMap" className="edit-business_main_map"
                                            src={`https://maps.google.com/maps?q=${businessInfo.location.latitude},%20${businessInfo.location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="edit-business_midline_block">
                            <hr/>
                            <div className="edit-business_midline_header_block">
                                <h1 className="edit-business_midline_header">Working time</h1>
                                <p className="edit-business_midline_comment">(optional)</p>
                            </div>
                            <hr/>
                        </div>
                        <div className="edit-business_form_section">
                            <p className="edit-business_form_error_message">Error message</p>
                            <div className="edit-business_form_section_calendar"
                                 aria-valuetext="input_working_time"
                            >
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Mon.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Monday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Mon</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Mon.length === 0 ? "Day off" : businessInfo.working_time.Mon[0] + "-" + businessInfo.working_time.Mon[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Tue.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Tuesday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Tue</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Tue.length === 0 ? "Day off" : businessInfo.working_time.Tue[0] + "-" + businessInfo.working_time.Tue[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Wed.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Wednesday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Wed</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Wed.length === 0 ? "Day off" : businessInfo.working_time.Wed[0] + "-" + businessInfo.working_time.Wed[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Thu.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Thursday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Thu</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Thu.length === 0 ? "Day off" : businessInfo.working_time.Thu[0] + "-" + businessInfo.working_time.Thu[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Fri.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Friday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Fri</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Fri.length === 0 ? "Day off" : businessInfo.working_time.Fri[0] + "-" + businessInfo.working_time.Fri[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Sat.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Saturday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Sat</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Sat.length === 0 ? "Day off" : businessInfo.working_time.Sat[0] + "-" + businessInfo.working_time.Sat[1]}</h5>
                                    </div>
                                </div>
                                <div
                                    className="edit-business_calendar_item"
                                    style={{background: businessInfo.working_time.Sun.length === 0 ? "#979497" : "#D9D9D9"}}
                                    data-bs-toggle="modal" data-bs-target="#timePickerModal"
                                    aria-valuetext="Sunday"
                                    onClick={handleDay}
                                >
                                    <div className="business-page_calendar_item_header">
                                        <h2>Sun</h2>
                                    </div>
                                    <div className="edit-business_calendar_item_time">
                                        <h5>{businessInfo.working_time.Sun.length === 0 ? "Day off" : businessInfo.working_time.Sun[0] + "-" + businessInfo.working_time.Sun[1]}</h5>
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
                                            <div className="edit-business_time_picker_main_wrapper">
                                                <div className="edit-business_time_picker_wrapper">
                                                    <TimeRange
                                                        startMoment={startTime}
                                                        endMoment={endTime}
                                                        onChange={setTime}
                                                        use24Hours={true}
                                                        sameIsValid={false}
                                                    />
                                                </div>
                                                <div className="edit-business_time_picker_submit_block">
                                                    <a
                                                        className="edit-business_time_picker_submit"
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
                        <div className="edit-business_form_section">
                            <div className="edit-business_submit_button_block">
                                <button type="submit"
                                        className="edit-business_form__input__button"
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        )
    }

}

export default EditBusiness
