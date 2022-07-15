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

    const [coordinatesValue, setCoordinatesValue] = useState({
        latitude: "49.842957",
        longitude: "24.031111",
        delta: "2000"
    })

    const [businessInfo, setBusinessInfo] = useState([])
    const [businessDamn, setBusinessDamn] = useState([])


    const getBusinessArray = () => {
        const datas = businessInfo
        const businesArray = []

        const limitedSessions = datas.slice(
            firstSessionIndex,
            lastSessionNumber
        );

        console.log("Page sized data: " + limitedSessions)

        if (datas.length > 0) {
            document.getElementsByClassName("businesses_search_wrapper")[0].style.visibility = "visible";
        } else {
            document.getElementsByClassName("businesses_search_wrapper")[0].style.visibility = "hidden";
        }

        if (datas.length > sessionsPerPage) {

            return (
                <Container>
                    <div className="businesses_search_pagination_wrapper">
                        <PaginationComponent
                            itemsCount={datas.length}
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
                                lat={coordinatesValue.latitude}
                                long={coordinatesValue.longitude}
                                {...session} />
                        ))}
                    </div>
                    <div className="businesses_search_pagination_wrapper">
                        <PaginationComponent
                            itemsCount={datas.length}
                            itemsPerPage={sessionsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            alwaysShown={false}
                        />
                    </div>
                </Container>
            )
        } else {

        }
        return (
            <Container>
                <div className="businesses_search_results_wrapper">
                    {limitedSessions.map(session => (
                        <BlockBuilder
                            key={session.id}
                            type={searchType.type}
                            lat={coordinatesValue.latitude}
                            long={coordinatesValue.longitude}
                            {...session} />
                    ))}
                </div>
            </Container>)
    }


    let handleKeywordChange = (event) => {
        setSearchValue({
            [event.target.name]: event.target.value
        });

        console.log(searchValue)
    }

    let handleCoordinatesChange = (event) => {
        setCoordinatesValue({
            ...coordinatesValue,
            [event.target.name]: event.target.value
        });

        console.log(coordinatesValue)
    }

    const handleKeywordSubmit = async (event) => {

        event.preventDefault()

        let search_keyword = "Lviv"
        if (searchValue.keyword != ""){
            search_keyword = searchValue.keyword
        }
        axios({
            method: "get",
            url: BASE_URL + "businesses/active/?limit=100&offset=0&search=" + search_keyword
        },[]).then(response => {
            setBusinessInfo(response.data.results)
            console.log(businessInfo)

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


        let metersInDegree = Math.round(coordinatesValue.delta / 111320 * 1000000) / 1000000
        if (metersInDegree > 10) {
            metersInDegree = 10
        }

        await axios({
            method: "get",
            url: BASE_URL + "businesses/nearest/" + coordinatesValue.latitude + "/" + coordinatesValue.longitude + "/" +
                metersInDegree + "?limit=100&offset=0"
        }).then(response => {
            setBusinessInfo(response.data.results)

            setSearchType({type: "coordinates"})
            console.log("Search type: " + searchType.type)

            getBusinessArray()
            console.log("Server response:" + JSON.stringify(response.data))

        }).catch(error => {
            console.log("Error: " + error)
        })
    }

    return (
        <Container className="businesses_search_inner_wrapper">
            <div className="businesses_search_form_wrapper">
                <div className="businesses_search_header_wrapper">
                    <h2 className="businesses_search_header">Search by keyword</h2>
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
                            placeholder={"Business name, type, city, etc."}
                            value={coordinatesValue.keyword}
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
                    <h2 className="businesses_search_header">Search by coordinates</h2>
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
                            value={coordinatesValue.latitude}
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
                            value={coordinatesValue.longitude}
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
                            placeholder={"1234"}
                            value={coordinatesValue.delta}
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
                {
                    getBusinessArray()
                }
            </div>
        </Container>
    )
}

export default BusinessesSearch
