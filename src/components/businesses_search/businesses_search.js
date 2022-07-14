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

    const [searchType, setSearchType] = useState({
        type: ""
    })

    const [searchValue, setSearchValue] = useState({
        keyword: ""
    })

    const [formValue, setFormValue] = useState({
        latitude: "",
        longitude: "",
        delta: ""
    })

    const [businessInfo, setBusinessInfo] = useState(null)
    const [businessDamn, setBusinessDamn] = useState(null)

    const handleKeywordSubmit = async (event) => {
        event.preventDefault()
        console.log(searchValue.keyword)
        await axios({
            method: "get",
            url: BASE_URL + "businesses/active/?search=" + searchValue.keyword
        }).then(response => {
            setBusinessInfo(response.data)

            setSearchType({type: "keyword"})
            console.log("Search type: " + searchType.type)

            getBusinessArray()
            console.log("Server response:" + JSON.stringify(response.data))
        }).catch(error => {
            console.log("Error: " + error)
        })
    }

    const handleCoordinatesSubmit = async (event) => {
        event.preventDefault()

        let metersInDegree = Math.round(formValue.delta / 111320 * 1000000) / 1000000
        await axios({
            method: "get",
            url: BASE_URL + "businesses/nearest/" + formValue.latitude + "/" + formValue.longitude + "/" +
                metersInDegree + "?limit=6&offset=0"
        }).then(response => {
            setBusinessInfo(response.data)

            setSearchType({type: "coordinates"})
            console.log("Search type: " + searchType.type)

            getBusinessArray()
            console.log("Server response:" + JSON.stringify(response.data))

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
                                type={searchType.type}
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
        } else {
            businesArray.push(
                <Container>
                    <div className="businesses_search_results_wrapper">
                        {limitedSessions.map(session => (
                            <BlockBuilder
                                key={session.id}
                                type={searchType.type}
                                lat={formValue.latitude}
                                long={formValue.longitude}
                                {...session} />
                        ))}
                    </div>
                </Container>
            )
        }

        setBusinessDamn(businesArray)
    }

    let handleKeywordChange = (event) => {
        setSearchValue({
            ...searchValue,
            [event.target.name]: event.target.value
        });
        event.preventDefault();
        console.log(searchValue)
    }

    let handleCoordinatesChange = (event) => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
        console.log(formValue)
    }

    return (
        <Container className="businesses_search_inner_wrapper">
            <div className="businesses_search_form_wrapper">
                <div className="businesses_search_header_wrapper">
                    <h1 className="businesses_search_header">Search by keyword</h1>
                </div>
                <form onSubmit={handleKeywordSubmit} className="search_keyword_form">
                    <div className="form__item">
                        <label>
                            Keyword:
                        </label>
                        <input
                            type="text"
                            name="keyword"
                            className="form__input"
                            placeholder={"Crazy barber"}
                            value={formValue.keyword}
                            // ref={this.input}
                            onChange={handleKeywordChange}
                        />
                    </div>
                    <div className="form__item">
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </div>
                </form>
            </div>
            <div className="businesses_search_form_wrapper">
                <div className="businesses_search_header_wrapper">
                    <h1 className="businesses_search_header">Search by coordinates</h1>
                </div>
                <form onSubmit={handleCoordinatesSubmit} className="search_local_form">
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
                            onChange={handleCoordinatesChange}
                        />
                    </div>
                    <div className="form__item">
                        <label>
                            Longitude:
                        </label>
                        <input
                            type="text"
                            name="longitude"
                            className="form__input"
                            placeholder={"0.000000"}
                            value={formValue.longitude}
                            onChange={handleCoordinatesChange}
                        />
                    </div>
                    <div className="form__item">
                        <label>
                            Distance limit (m):
                        </label>
                        <input
                            type="text"
                            name="delta"
                            className="form__input"
                            placeholder={"0.000000"}
                            value={formValue.delta}
                            onChange={handleCoordinatesChange}
                        />
                    </div>
                    <div className="form__item">
                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Search
                        </Button>
                    </div>
                </form>
            </div>
            <div className="businesses_search_wrapper">
                <div
                >
                    {businessDamn}

                </div>
            </div>
        </Container>
    )
}

export default BusinessesSearch
