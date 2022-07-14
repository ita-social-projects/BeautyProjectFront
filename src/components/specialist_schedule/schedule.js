import React from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import "./schedule.css";
import {BASE_URL, changeLink, getLoginInfo} from "../../utils/utils";


function DateToStringYMH(current_date){

    let date = current_date.getDate()
    let month = current_date.getMonth() + 1
    let year = current_date.getFullYear()
    
    return `${year}-${month<10?`0${month}`:`${month}`}-${date}`
}


function getSchedule(days, hours){
    const schedule = {}

    for (var step=0; step<hours.length; step++){
        schedule[days[step]] = hours[step]
    }
    return schedule
}


function get7DaysAfterCurrent(){
    const now = new Date()
    const days = [now]

    for (let step = 1; step < 7; step++){
        const current = new Date(now)
        current.setDate(now.getDate() + step)
        days.push(current)
    }

    for (let el = 0; el < days.length; el++){
        days[el] = DateToStringYMH(days[el])
    }
    return days
}


const SpecialistSchedule = () => {

    const url = BASE_URL
    const request_url = "owner_schedule/"

    const handleSubmit = async (event) => {
        const specialist_id = jwtDecode(Cookies.get("jwt_session")).user_id
        const days = get7DaysAfterCurrent()
        var positions = []
        const container = document.getElementsByClassName("specialist_schedule")[0]
        event.preventDefault()

        try {
            const response = await axios({
                method: "get",
                url: url + "position",
                headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
            })
            positions = response.data.results
        } catch (error) {
            console.log("Error")
        }

        for (const position of positions){
            const schedule_pos = document.createElement("div")
            schedule_pos.className = "row"
            const pos_info = document.createElement("div")
            pos_info.className = "row"
            pos_info.innerHTML = position["name"]
            const hours = []

            for (const day of days){
                try {
                    const response = await axios({
                        method: "get",
                        url: url + request_url + position["id"] + '/' + specialist_id + '/' + day + '/',
                        headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
                    })
                    hours.push(response.data)

                } catch (error) {
                    console.log("Error")
                }
            }
            console.log(hours)
            const schedule = getSchedule(days, hours)

            for (const day of days){
                const column = document.createElement("div")
                column.className = "col"
                const text = document.createTextNode(day)
                const day_hours = document.createElement("div")
                const hour_block = document.createElement("div")


                if (!(Symbol.iterator in Object(schedule[day]))){
                    hour_block.className = "weekend"
                    hour_block.textContent = "W e e k e n d"
                }
                else{
                    var start = ""
                    var end = ""

                    if (typeof schedule[day][0] === "string"){
        
                        const response = await axios({
                            method: "get",
                            url: schedule[day][0],
                            headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
                        })
        
                        start = new Date(response.data["start_time"])
                    }
                    else{
                        start = new Date(day + "T" + schedule[day][0][0])
                    }

                    if (typeof schedule[day][schedule[day].length - 1] === "string"){
                        const response = await axios({
                                method: "get",
                                url: schedule[day][schedule[day].length - 1],
                                headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
                        })
                        end = new Date(response.data["end_time"])
                    }
                    else{
                        end = new Date(day + "T" + schedule[day][schedule[day].length - 1][1])
                    }

                    const percent_per_minute = 99/((end - start) / (60*1000))
                    hour_block.className = "hour"

                    for (const hour of schedule[day]){
                        const block = document.createElement("div")

                        var start_hour = ""
                        var end_hour = ""
                        var range = new Date()

                        if (typeof hour !== "string"){
                            start_hour = new Date(day + "T" + hour[0])
                            end_hour = new Date(day + "T" + hour[1])
                            range = (end_hour - start_hour)/(60*1000)

                            block.className = "free_block"
                            block.style.height = range * percent_per_minute + "%"
                            block.innerHTML = "Free time: <br />"
                                + start_hour.getHours()
                                + ":"
                                + (start_hour.getMinutes()<10?'0':'') + start_hour.getMinutes()
                                + "-"
                                + end_hour.getHours()
                                + ":"
                                + (end_hour.getMinutes()<10?'0':'') + end_hour.getMinutes()
                        }
                        else{
                            const response = await axios({
                                method: "get",
                                url: hour,
                                headers: {"Content-Type": "application/json", "Authorization": "JWT " + Cookies.get("jwt_session")},
                            })

                            start_hour = new Date(response.data["start_time"])
                            end_hour = new Date(response.data["end_time"])
                            range = (end_hour - start_hour)/(60*1000)

                            block.className = "order_block"
                            block.style.height = range * percent_per_minute + "%"
                            block.innerHTML = "Ordered: <br />"
                                + start_hour.getHours()
                                + ":"
                                + (start_hour.getMinutes()<10?'0':'') + start_hour.getMinutes()
                                + "-"
                                + end_hour.getHours()
                                + ":"
                                + (end_hour.getMinutes()<10?'0':'') + end_hour.getMinutes()
                        }
                        hour_block.appendChild(block)
                    }
                }
                day_hours.appendChild(hour_block)
                day_hours.className = "day"

                column.appendChild(text)
                column.appendChild(day_hours)
                schedule_pos.appendChild(column)
            }
            container.appendChild(pos_info)
            container.appendChild(schedule_pos)
        }

    }

    return (
        <Container>
            <Container>
                <div className="inner__form__wrapper">
                    <form onSubmit={handleSubmit} className="specialist__info__form">
                        <div className="form__item">
                            <button
                                type="submit"
                                className="form__input__button"
                            >
                                Display schedules
                            </button>
                        </div>
                    </form>
                </div>
                <Container className="specialist_schedule">
                </Container>
            </Container>
        </Container>
    )
}

export default SpecialistSchedule;
