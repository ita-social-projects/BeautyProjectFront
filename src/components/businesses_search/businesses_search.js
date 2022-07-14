import React, {useState} from "react";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import "./businesses_search.css";
import {BASE_URL} from "../../utils/utils";
import Button from 'react-bootstrap/Button';
import PaginationComponent from "./pagination_component"
import BlockBuilder from "./block_builder";


const BusinessesSearch = () => {

    const [sessionsPerPage, setSessionsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const lastSessionNumber = currentPage * sessionsPerPage;
    const firstSessionIndex = lastSessionNumber - sessionsPerPage;


    const [formValue, setFormValue] = useState({
        latitude: 15.000000,
        longitude: 15.000000,
        delta: 55.000000
    })

    const [businessInfo, setBusinessInfo] = useState(null)
    const [businessDamn, setBusinessDamn] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()

        await axios({
            method: "get",
            url: BASE_URL + "businesses/nearest/" + formValue.latitude + "/" + formValue.longitude + "/" + formValue.delta + "?limit=100&offset=0"
        }).then(response => {
            setBusinessInfo(response.data)

            getBusinessArray()
            console.log("Server response:" + JSON.stringify(response.data))
            // render.
        }).catch(error => {
            console.log("Error: " + error)
        })
    }

    const getBusinessArray = () => {
        const datas = businessInfo
        const businessKeys = Object.keys(datas.results)
        const businesArray = []

        const limitedSessions = datas.results.slice(
            firstSessionIndex,
            lastSessionNumber
        );

        console.log("Page sized data: " + limitedSessions)

        document.getElementsByClassName("businesses_search_wrapper")[0].style.visibility = "visible";
        businesArray.push(
            <h1 className="businesses_search_header">Results</h1>
        )

        if (businessKeys.length > sessionsPerPage) {
            businesArray.push(
                <Container>
                    <div className="businesses_search_pagination_wrapper">
                        <PaginationComponent
                            itemsCount={businessKeys.length}
                            itemsPerPage={sessionsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            alwaysShown={false}
                        />
                    </div>
                    <div className="businesses_search_results_wrapper">
                        {limitedSessions.map(session => (
                            <BlockBuilder
                                key={session.id}
                                lat={formValue.latitude}
                                long={formValue.longitude}
                                {...session} />
                        ))}
                    </div>
                    <div className="businesses_search_pagination_wrapper">
                        <PaginationComponent
                            itemsCount={businessKeys.length}
                            itemsPerPage={sessionsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            alwaysShown={false}
                        />
                    </div>
                </Container>
            )
        }

        setBusinessDamn(businesArray)
    }

    let handleChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return (
        <Container className="businesses_search_inner_wrapper">
            <div className="businesses_search_form_wrapper">
                <div className="businesses_search_header_wrapper">
                    <h1 className="businesses_search_header">Find by coordinates</h1>
                </div>
                <form onSubmit={handleSubmit} className="register__form">
                    <div className="form__item">
                        <label>
                            Latitude:
                        </label>
                        <input
                            type="text"
                            name="latitude"
                            className="form__input"
                            placeholder={"0.000000"}
                            value={formValue.latitude}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__item">
                        <label>
                            Latitude:
                        </label>
                        <input
                            type="text"
                            name="longitude"
                            className="form__input"
                            placeholder={"0.000000"}
                            value={formValue.longitude}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__item">
                        <label>
                            Delta:
                        </label>
                        <input
                            type="text"
                            name="delta"
                            className="form__input"
                            placeholder={"0.000000"}
                            value={formValue.delta}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__item">
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
            <div className="businesses_search_wrapper">
                <div
                    onClick={handleChange}
                >
                    {businessDamn}

                </div>
            </div>
        </Container>
    )
}

export default BusinessesSearch
