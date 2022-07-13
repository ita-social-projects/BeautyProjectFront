import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {axios_request, BASE_URL, changeLink, getLoginInfo} from "../../utils/utils";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

import "./MyProfile.css"

const Block_info = (props) => {

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

    return (
        <Container fluid={true}>
            <div className="my-profile_whole_page">
                <div className="my-profile_header">
                    <div className="my-profile_block_title">
                        <h1>My Profile</h1>
                    </div>
                </div>
                <div className="my-profile_main_info">
                    {
                        info.length === 0 ? "Please login" : getInfo()
                    }
                </div>
            </div>
        </Container>
    )
}



export default MyProfile;
