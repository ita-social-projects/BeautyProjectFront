import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {axios_request, BASE_URL, changeLink, getLoginInfo} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import edit_logo from ".//assets/img/edit.png"

import "./EditProfile.css"


const EditProfile = () => {
    const [info, setInfo] = React.useState({
        email: "",
        first_name: "",
        patronymic: "",
        last_name: "",
        phone_number: "",
        bio: ""
    });

    const [formData, setFormData] = React.useState({
        email: "",
        first_name: "",
        patronymic: "",
        last_name: "",
        phone_number: "",
        bio: ""
    });

    useEffect(() => {
        getMyInfo();
    }, []);

    const getMyInfo = () => {
        axios_request({
            method: "get",
            url: BASE_URL + `user/${getLoginInfo()["user_id"]}`,
            data: JSON.stringify(info)
        })
            .then((response) => {
                const data = response.data
                setInfo(data)
                console.log(response.data)
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
    }

    const navigate = useNavigate();

    const handlerNavigatorOrders = () => {
        navigate("/")
    }

    const handlerNavigatorMainPage = () => {
        navigate("/")
    }

    const handlerNavigatorReviews = () => {
        navigate("/")
    }

    const handlerNavigatorBusiness = () => {
        navigate("/my_businesses/" + info.key)
    }

    const handlerNavigatorMyProfile = () => {
        navigate("/my_profile")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        for (const key of Object.keys(formData)){
            formData[key] = info[key]
        }

        const keyArray = ["input_first_name", "input_last_name", "input_patronymic", "input_email", "input_phone_number", "input_bio"]
        for (const currentKey of keyArray) {
            let currentElement = document.querySelector(`[name='${currentKey}']`);
            let currentErrorMessage = currentElement.parentElement.querySelector("p");
            currentElement.classList.remove("edit-business_validation_error");
            currentErrorMessage.classList.remove("error_message_shown");
        }

        console.log(JSON.stringify(formData))

        await axios_request({
            method: "patch",
            url: BASE_URL + `user/${getLoginInfo()["user_id"]}` + "/",
            data: JSON.stringify(formData)
        }).then(response => {
            console.log(response.data)
            handlerNavigatorMyProfile()
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
        key = "input_" + key
        let currentElement = document.querySelector(`[name='${key}']`);
        let currentErrorMessage = currentElement.parentElement.querySelector("p");
        currentElement.parentElement.classList.add("edit-profile_validation_error");
        currentErrorMessage.classList.add("error_message_shown");
        currentErrorMessage.innerText = error_message;
    }

    const DeleteAnAccount = (info) => {
        axios_request({
            method: "delete",
            url: BASE_URL + `user/${getLoginInfo()["user_id"]}` + "/"
        })
            .then((response) => {
                Cookies.remove("jwt_session")
                handlerNavigatorMainPage()
                window.location.reload()
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            })
    }

    const handlerNavigatorDeleteAccount = () => {
        return(
            <div className="edit-profile_modal_window">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Delete my account
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete an account</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure that you want to delete your account?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, I don`t</button>
                                <button type="button" className="btn btn-primary" onClick={DeleteAnAccount}>Yes, I`m sure</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleChange = (event) => {
        setInfo({
            ...info,
            [event.target.name.replace("input_", "")]: event.target.value
        });
    }

    const getInfo = () => {
        return (
            <div className="edit-profile_all_info">
                <div className="edit-profile_left_side">
                    <div className="edit-profile_avatar">
                        <img src={changeLink(info.avatar != null ? info.avatar : "")} alt="avatar"/>
                    </div>
                    <div className="edit-profile_bio">
                        <p>
                            <p className="edit-profile_form_error_message">Error message</p>
                            <textarea
                                type="text"
                                name="input_bio"
                                className="edit-profile_form__textarea"
                                value={info.bio}
                                onChange={handleChange}
                            />
                        </p>
                    </div>
                    <div className="edit-profile_links">
                        <div className="edit-profile_redirect_link">
                            <p onClick={handlerNavigatorOrders}>
                                My orders
                            </p>
                        </div>
                        <div className="edit-profile_redirect_link">
                            <p onClick={handlerNavigatorReviews}>
                                My reviews
                            </p>
                        </div>
                        <div className="edit-profile_redirect_link">
                            <p onClick={handlerNavigatorBusiness}>
                                My businesses
                            </p>
                        </div>
                    </div>
                    <div className="edit-profile_delete_block">
                        {
                            handlerNavigatorDeleteAccount()
                        }
                    </div>
                </div>
                <div className="edit-profile_right_side">
                    <div className="edit-profile_fields">
                        <div className="edit-profile_field">
                            <div className="edit-profile_field_name">
                                Name
                            </div>
                            <div className="edit-profile_field_value">
                                <p className="edit-profile_form_error_message">Error message</p>
                                <input
                                    type="text"
                                    name="input_first_name"
                                    className="edit-profile_form__input"
                                    value={info.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="edit-profile_field">
                            <div className="edit-profile_field_name">
                                Lastname
                            </div>
                            <div className="edit-profile_field_value">
                                <p className="edit-profile_form_error_message">Error message</p>
                                <input
                                    type="text"
                                    name="input_last_name"
                                    className="edit-profile_form__input"
                                    value={info.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="edit-profile_field">
                            <div className="edit-profile_field_name">
                                Patronymic
                            </div>
                            <div className="edit-profile_field_value">
                                <p className="edit-profile_form_error_message">Error message</p>
                                <input
                                    type="text"
                                    name="input_patronymic"
                                    className="edit-profile_form__input"
                                    value={info.patronymic}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="edit-profile_field">
                            <div className="edit-profile_field_name">
                                Email
                            </div>
                            <div className="edit-profile_field_value">
                                <p className="edit-profile_form_error_message">Error message</p>
                                <input
                                    type="text"
                                    name="input_email"
                                    className="edit-profile_form__input"
                                    value={info.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="edit-profile_field">
                            <div className="edit-profile_field_name">
                                Phone number
                            </div>
                            <div className="edit-profile_field_value">
                                <p className="edit-profile_form_error_message">Error message</p>
                                <input
                                    type="text"
                                    name="input_phone_number"
                                    className="edit-profile_form__input"
                                    value={info.phone_number}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Container fluid={true}>
            <div className="edit-profile_whole_page">
                <div className="edit-profile_header">
                    <div className="edit-profile_block_title">
                        <h1>My Profile</h1>
                    </div>
                    <div className="edit-profile_bottoms_save_cancel">
                        <div className="edit-profile_edit_block" onClick={handleSubmit}>
                            <div className="edit-profile_edit_text">
                                <p>
                                    Submit
                                </p>
                            </div>
                        </div>
                        <div className="edit-profile_edit_block_cancel" onClick={handlerNavigatorMyProfile}>
                            <div className="edit-profile_edit_text_cancel">
                                <p>
                                    Cancel
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="edit-profile_main_info">
                    {
                        info.length === 0 ? "Please login" : getInfo()
                    }
                </div>
            </div>
        </Container>
    )
}



export default EditProfile;
