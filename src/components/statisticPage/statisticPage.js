import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LineChart from "./lineChart";
import RadioButtons from "./radioButtons";
import axios from "axios";
import BusinessTable from "./businessTable";
import SpecialistsTable from "./specialistsTable";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export default function StatisticPage() {
  const { businessId } = useParams();
  const url = `https://g6bcybbjx1.execute-api.eu-central-1.amazonaws.com/api/v1/statistic/${businessId}/`;

  const [timeInterval, setTimeInterval] = useState("lastSevenDays");

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [businessTableData, setBusinessTableData] = useState([]);
  const [specialistsTableData, setSpecialistsTableData] = useState([]);

  const getLoginInfo = () => {
    const token = Cookies.get("jwt_session");
    const user_id = token ? jwt_decode(token).user_id : null;

    return { token: token, user_id: user_id };
  };

  const getStatistic = useCallback(async () => {
    const { token } = getLoginInfo();

    await axios({
      method: "get",
      url: url + `?timeInterval=${timeInterval}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.data)
      .then((data) => {
        let labels = data.line_chart_data.labels;

        if (timeInterval === "currentMonth") {
          for (let index in labels) {
            if (index % 2) {
              labels[index] = "";
            }
          }
        }

        setChartLabels(labels);
        setChartData(data.line_chart_data.data);
        setBusinessTableData(data.general_statistic);
        setSpecialistsTableData(data.business_specialists);
      })
      .catch((error) => alert(error));
  }, [timeInterval, url]);

  useEffect(() => {
    getStatistic();
  }, [getStatistic]);

  return (
    <Container className="mb-8">
      <LineChart chartLabels={chartLabels} chartData={chartData} />
      <RadioButtons handleChange={setTimeInterval} />

      <h4 className="mt-5 mb-3">General Business Statistic</h4>
      <BusinessTable data={businessTableData} />

      <h4 className="mt-5 mb-3">Statistic of Each Specialist</h4>
      <SpecialistsTable className="mb-5" data={specialistsTableData} />
    </Container>
  );
}
