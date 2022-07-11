import React, {useCallback, useEffect, useState} from "react";

import axios from 'axios';
import Container from 'react-bootstrap/Container';
import NotFound from "../error_pages/NotFound/NotFound";
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {BASE_URL, axios_request, changeLink} from "../../utils/utils";
import "./business_page.css";


const BusinessPageCalendarItem = (props) => {
    return (
        <div className="business-page_calendar_item" style={{background: props.bg}}>
            <div className="business-page_calendar_item_header">
                <h2>{props.day}</h2>
            </div>

            <div className="business-page_calendar_item_time">
                <h5>{props.time}</h5>
            </div>
        </div>
    )
}

const ParticularBusiness = () => {
    const [businessInfo, setBusinessInfo] = useState(false);

    const {id} = useParams()

    const getBusinessInfo = useCallback(
        async () => {
            await axios_request({
                method: "get",
                url: BASE_URL + "business/" + id,
            }).then(response => {
                setBusinessInfo(response.data)
            }).catch(err => {
                console.log(err)
            })
        }, []
    );

    const getDaysArray = () => {
        let daysArray = businessInfo.working_time
        let calendarArray = []
        const keyArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        for (const key of keyArray) {
            if (daysArray[key].length === 0) {
                calendarArray.push(<BusinessPageCalendarItem
                    day={key}
                    time={"Day off"}
                    bg={"#68646a"}
                />)
            } else {
                calendarArray.push(<BusinessPageCalendarItem
                    day={key}
                    time={`${daysArray[key][0]} - ${daysArray[key][1]}`}
                    bg={"#d8d1d8"}
                />)
            }
        }
        return calendarArray
    }

    useEffect(() => {
        getBusinessInfo();
    }, [getBusinessInfo])

    if (isNaN(id) || !businessInfo) {
        return <NotFound/>
    } else {
        return (
            <Container fluid={true} className="">
                <div className="business-page_page_wrapper">
                    <div className="business-page_left_wrapper">
                        <div className="business-page_header_wrapper">
                            <div className="business-page_header_itself">
                                <div className="business-page_header">
                                    <h1>{businessInfo.name}</h1>
                                </div>
                                <div className="business-page_description">
                                    <h5>{businessInfo.description}</h5>
                                </div>
                            </div>
                            <div className="business-page_logo_wrapper">
                                <img src={changeLink(businessInfo.logo != null ? businessInfo.logo : "")} alt="logo"/>
                            </div>
                        </div>
                        <div className="business-page-calendar_wrapper">
                            <div className="business-page_calendar_main">
                                {getDaysArray()}
                            </div>
                        </div>
                        <div className="business-page_main_map_wrapper">
                            <iframe width="100%" height="500" title="BusinessMap"
                                    src={`https://maps.google.com/maps?q=${businessInfo.location.latitude},%20${businessInfo.location.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default ParticularBusiness
