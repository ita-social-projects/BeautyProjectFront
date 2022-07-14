import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import axios from "axios";
import {BASE_URL, changeLink} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

import "./BusinessesList.css"

const Block_businesses = (props) => {

    const navigate = useNavigate();

    const handlerNavigator = () => {
        navigate("/business/" + props.id)
    }

    return (
        <div className="business-list_main_component">
            <div className="business-list_all_text">
                <div className="business-list_business_name">
                    <p>
                        {props.name}
                    </p>
                </div>
                <div className="business-list_business_type">
                    <p>
                        {props.business_type}
                    </p>
                </div>
                <div className="business-list_business_address">
                    <p>
                        {props.location.address}
                    </p>
                </div>
                <div className="business-list_more">
                    <p onClick={handlerNavigator}>
                        More
                    </p>
                </div>
            </div>
            <div className="business-list_logo">
                <img src={changeLink(props.logo != null ? props.logo : "")} alt="logo"/>
            </div>
        </div>
    );
}

const BusinessList = () => {
    const [businesses, setBusinesses] = React.useState([]);
    useEffect(() => {
        getBusinesses();
    }, []);

    function getBusinesses() {
        axios.get(BASE_URL + `businesses/active/?limit=${100000}`)
            .then((response) => {
                const data = response.data.results
                setBusinesses(data)
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


    const getAll = () => {
        let result = []
        let count =  0

        for (const business of Object.values(businesses))
        {
            result.push(<Block_businesses key={count} name={business.name}
            business_type={business.business_type}
            location={business.location}
            logo={business.logo}
            id={business.location.id}/>)
            count++
        }
        return result
    }

    return (
        <Container fluid={true}>
            <div className="business-list_whole_page">
                <div className="business-list_header">
                    <div className="business-list_block_title">
                        <h1>All Businesses</h1>
                    </div>
                    <div className="business-list_search">
                        <h2>Search</h2>
                    </div>
                </div>
                <div className="business-list_list_of_all">
                    {
                        businesses.length === 0 ? "There are no businesses here" : getAll()
                    }
                </div>
            </div>
        </Container>
    )
}



export default BusinessList;
