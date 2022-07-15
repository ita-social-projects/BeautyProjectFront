import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {axios_request, BASE_URL, changeLink, getLoginInfo} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import edit_logo from ".//assets/img/edit.png"

import "./MyProfile.css"

const Block_info = (props) => {

    const navigate = useNavigate();

    const handlerNavigatorMainPage = () => {
        navigate("/")
    }

    const handlerNavigatorOrders = () => {
        navigate("/my/orders")
    }

    const handlerNavigatorReviews = () => {
        navigate("/")
    }

    const handlerNavigatorBusiness = () => {
        navigate("/my_businesses/")
    }

    const DeleteAnAccount = (props) => {
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
            <div className="my-profile_modal_window">
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

    return (
        <div className="my-profile_all_info">
            <div className="my-profile_left_side">
                <div className="my-profile_avatar">
                    <img src={changeLink(props.avatar != null ? props.avatar : "")} alt="avatar"/>
                </div>
                <div className="my-profile_bio">
                    <p>
                        {props.bio}
                    </p>
                </div>
                <div className="my-profile_links">
                    <div className="my-profile_redirect_link">
                        <p onClick={handlerNavigatorOrders}>
                            My orders
                        </p>
                    </div>
                    <div className="my-profile_redirect_link">
                        <p onClick={handlerNavigatorReviews}>
                            My reviews
                        </p>
                    </div>
                    <div className="my-profile_redirect_link">
                        <p onClick={handlerNavigatorBusiness}>
                            My businesses
                        </p>
                    </div>
                </div>
                <div className="my-profile_delete_block">
                    {
                        handlerNavigatorDeleteAccount()
                    }
                </div>
            </div>
            <div className="my-profile_right_side">
                <div className="my-profile_fields">
                    <div className="my-profile_field">
                        <div className="my-profile_field_name">
                            Name
                        </div>
                        <div className="my-profile_field_value">
                            {props.first_name}
                        </div>
                    </div>
                    <div className="my-profile_field">
                        <div className="my-profile_field_name">
                            Lastname
                        </div>
                        <div className="my-profile_field_value">
                            {props.last_name}
                        </div>
                    </div>
                    <div className="my-profile_field">
                        <div className="my-profile_field_name">
                            Patronymic
                        </div>
                        <div className="my-profile_field_value">
                            {props.patronymic}
                        </div>
                    </div>
                    <div className="my-profile_field">
                        <div className="my-profile_field_name">
                            Email
                        </div>
                        <div className="my-profile_field_value">
                            {props.email}
                        </div>
                    </div>
                    <div className="my-profile_field">
                        <div className="my-profile_field_name">
                            Phone number
                        </div>
                        <div className="my-profile_field_value">
                            {props.phone_number}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MyProfile = () => {
    const [info, setInfo] = React.useState([]);
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

    const getInfo = () => {
        return <Block_info key={info.id} first_name={info.first_name}
                           last_name={info.last_name}
                           patronymic={info.patronymic}
                           email={info.email}
                           phone_number={info.phone_number}
                           bio={info.bio}
                           avatar={info.avatar}/>
    }

    const navigate = useNavigate();

    const handlerNavigatorEditProfile = () => {
        navigate("/edit_profile")
    }

    const handlerNavigatorLogin = () => {
        navigate("/login")
    }

    return (
        <Container fluid={true}>
            <div className="my-profile_whole_page">
                <div className="my-profile_header">
                    <div className="my-profile_block_title">
                        <h1>My Profile</h1>
                    </div>
                    <div className="my-profile_edit_block" onClick={handlerNavigatorEditProfile}>
                        <div className="my-profile_edit_text">
                            <p>
                                Edit my profile
                            </p>
                        </div>
                    </div>
                </div>
                <div className="my-profile_main_info">
                    {
                        info.length === 0 ?
                            <div className="my-profile_no_login">
                                <p className="my-profile_login" onClick={handlerNavigatorLogin}>
                                    Please login.
                                </p>
                            </div>
                            : getInfo()
                    }
                </div>
            </div>
        </Container>
    )
}



export default MyProfile;
