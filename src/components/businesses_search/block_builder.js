import React from "react";
import {getDistance} from "./get_distance";


const BlockBuilder = (props) => {
    if (props.type === "coordinates") {
        return (
            <div className="local-business_wrapper">
                <div className="local-business_header_wrapper">
                    <div className="local-business_header_block">
                        <div className="local-business_header_link">
                            <a href={"/business/" + props.id}>{props.name}</a>
                        </div>
                        <div className="local-business_header_type">
                            <p>{props.business_type}</p>
                        </div>
                        <div className="local-business_header_distance">
                            <p>Disntance: {getDistance(props.lat, props.long, props.location.latitude, props.location.longitude)}m</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (props.type === "keyword"){
        return (
            <div className="local-business_wrapper">
                <div className="local-business_header_wrapper">
                    <div className="local-business_header_block">
                        <div className="local-business_header_link">
                            <a href={"/business/" + props.id}>{props.name}</a>
                        </div>
                        <div className="local-business_header_type">
                            <p>{props.business_type}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlockBuilder;