import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import LineChart from "./lineChart";
import RadioButtons from "./radioButtons";
import "./statisticPage.css";
import axios from "axios";
import BusinessTable from "./businessTable";
import SpecialistsTable from "./specialistsTable";

export default function StatisticPage() {
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [businessTableData, setBusinessTableData] = useState([]);
  const [specialistsTableData, setSpecialistsTableData] = useState([]);

  async function getStatistic(timeInterval) {
    await axios({
      method: "get",
      url: `http://localhost:8000/api/v1/statistic/7/?timeInterval=${timeInterval}`,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.status);
        return response.data;
      })
      .then((data) => {
        setChartLabels(data.line_chart_data.labels);
        setChartData(data.line_chart_data.data);
        setBusinessTableData(data.general_statistic);
        setSpecialistsTableData(data.business_specialists);
      })
      .catch((error) => alert(error));
  }

  useEffect(() => {
    getStatistic("lastSevenDays");
  }, []);

  return (
    <Container className="staticPageContainer">
      <LineChart chartLabels={chartLabels} chartData={chartData} />
      <RadioButtons handleChange={getStatistic} />

      <h4 className="m-3">General Business Statistic</h4>
      <BusinessTable data={businessTableData} />

      <h4 className="mt-5 mb-3">Statistic of Each Specialist</h4>
      <SpecialistsTable className="mb-5" data={specialistsTableData} />
    </Container>
  );
}
