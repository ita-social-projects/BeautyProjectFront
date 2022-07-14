import React from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BASE_URL} from "../../utils/utils.js"


import './services_by_business.css';

const ServiceByBusiness = () => {

    const params = useParams()

    let [data, setDate] = useState([])

    useEffect(() => {

        axios.get(BASE_URL + `business/${params.id}/services`)
            .then(res => {
                setDate(res.data.results)
            }).catch(err => console.log(err))
    }, [params.id])

    const arr = data.map((elem, index) => {
        return (
            <tr key={index}>
                <td>{elem.name}</td>
                <td>{elem.price}</td>
                <td>{elem.description}</td>
                <td>{elem.duration}</td>
            </tr>
        )
    })
    if (arr.length === 0){
        return (
            <h2>This business doesn't provide any service</h2>
        )}

    else {
        return (
        <Table striped bordered hover className="service-by-business">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Duration</th>
            </tr>
            </thead>
            <tbody>
            {arr}
            </tbody>
        </Table>
    )}
}
export default ServiceByBusiness