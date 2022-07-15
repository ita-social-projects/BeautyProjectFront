import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {axios_request, BASE_URL, changeLink} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

import "./MyBusinessesList.css"

const Block_businesses = (props) => {

    const navigate = useNavigate();

    const handlerNavigator = () => {
        navigate("/business/" + props.id)
    }

    return (
        <div className="my-business-list_main_component">
            <div className="my-business-list_all_text">
                <div className="my-business-list_business_name">
                    <p>
                        {props.name}
                    </p>
                </div>
                <div className="my-business-list_business_type">
                    <p>
                        {props.business_type}
                    </p>
                </div>
                <div className="my-business-list_business_address">
                    <p>
                        {props.location.address}
                    </p>
                </div>
                <div className="my-business-list_more">
                    <p onClick={handlerNavigator}>
                        More
                    </p>
                </div>
            </div>
            <div className="my-business-list_logo">
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
        axios_request({
            method: "get",
            url: BASE_URL + `businesses/`,
            data: JSON.stringify(businesses)
        })
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
            id={business.id}/>)
            count++
        }
        return result
    }

    const navigate = useNavigate();

    const handlerNavigatorRegisterBusiness = () => {
        navigate("/add_business")
    }

    return (
        <Container fluid={true}>
            <div className="my-business-list_whole_page">
                <div className="my-business-list_header">
                    <div className="my-business-list_block_title">
                        <h1>My Businesses</h1>
                    </div>
                    <div className="my-business_add_block" onClick={handlerNavigatorRegisterBusiness}>
                        <div className="my-business_add_text">
                            <p>
                                Add business
                            </p>
                        </div>
                    </div>
                </div>
                <div className="my-business-list_list_of_all">
                    {
                        businesses.length === 0 ?
                            <div className="my-business-list_no_businesses">
                                <p>
                                    There are no businesses here. You can register your first business
                                    <b className="my-business-list_register_business" onClick={handlerNavigatorRegisterBusiness}> here</b>.
                                </p>
                            </div>
                            : getAll()
                    }
                </div>
            </div>
        </Container>
    )
}



export default BusinessList;
