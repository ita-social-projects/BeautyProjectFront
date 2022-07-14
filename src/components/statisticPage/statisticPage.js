import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import LineChart from "./lineChart";
import RadioButtons from "./radioButtons";
import BusinessTable from "./businessTable";
import SpecialistsTable from "./specialistsTable";
import { axios_request, BASE_URL } from "../../utils/utils.js";
import "./statisticPage.css";
import { useNavigate } from "react-router-dom";


export default function StatisticPage() {
  const navigate = useNavigate();

  const { businessId } = useParams();

  const [timeInterval, setTimeInterval] = useState("lastSevenDays");

  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);

  const [businessTableData, setBusinessTableData] = useState([]);
  const [specialistsTableData, setSpecialistsTableData] = useState([]);

  const getStatistic = useCallback(async () => {
    await axios_request({
      method: "get",
      url: BASE_URL + `statistic/${businessId}/?timeInterval=${timeInterval}`,
    })
      .then((response) => {
        const data = response.data;
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
      .catch((error) => {
        console.log(error);
        if (error.response.status === 404) {
          navigate("/NotFound");
        }
      });
  }, [timeInterval, businessId, navigate]);

  useEffect(() => {
    getStatistic();
  }, [getStatistic]);

  if (isNaN(+businessId)) {
    navigate("/NotFound");
  }

  return (
    <Container className="mb-8">
      <h4 className="mt-5 mb-3 text-center">General Business Statistic</h4>
      <LineChart chartLabels={chartLabels} chartData={chartData} />
      <RadioButtons handleChange={setTimeInterval} />

      <h4 className="mt-5 mb-3 text-center">Detail Business Statistic</h4>
      <BusinessTable data={businessTableData} />

      <h4 className="mt-5 mb-3 text-center">Statistic of Each Specialist</h4>
      <SpecialistsTable className="mb-5" data={specialistsTableData} />
    </Container>
  );
}
