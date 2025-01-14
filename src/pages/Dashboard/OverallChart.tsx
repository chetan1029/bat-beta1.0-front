import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Chart from "react-apexcharts";
import { default as dayjs } from 'dayjs';
import classNames from "classnames";


interface OverallChartProps {
    data: any;
    selectedCurrency?: string;
    extraYaxis?: boolean;
}

const OverallChart = ({ data, selectedCurrency, extraYaxis }: OverallChartProps) => {
    const series: Array<any> = [];

    const getFormmater = () => {
        const cFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: selectedCurrency,
            maximumFractionDigits: 2
        });
        return cFormatter;
    }

    if(Object.keys(data).length !== 0){
      data.forEach((s) => {
        const seriesData: Array<any> = [];
        const seriesName: Array<any> = [];
        const data_b = s["data"]
        for (const d in data_b) {
          seriesData.push([d, data_b[d]]);
        }
        seriesName["name"] = s["name"]
        seriesName["data"] = seriesData
        series.push(seriesName)
      })
    }

    // const series = [
    //     {
    //         name: "Visibility Score",
    //         data: seriesData
    //     }
    // ];

    var yAxis: Array<any> = [];
    if(extraYaxis){
      yAxis = [
        {
            labels: {
                formatter: (value, timestamp, opts) => {
                    if(selectedCurrency){
                      return value ? getFormmater().format(value) : "";
                    }else{
                      return value ? value : "";
                    }
                }
            }
        },
        {
            opposite: true,
            labels: {
                formatter: (value, timestamp, opts) => {
                    return value ? value : "";
                }
            }
        }
      ]
    }else{
      yAxis = [
        {
            labels: {
                formatter: (value, timestamp, opts) => {
                    if(selectedCurrency){
                      return value ? getFormmater().format(value) : "";
                    }else{
                      return value ? value : "";
                    }
                }
            }
        }
      ]
    }

    const options = {
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        grid: {
            padding: {
                top: 0,
                right: 30,
                bottom: 0,
                left: 10
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function (value, timestamp, opts) {
                    return value ? dayjs(value).format('DD MMM') : "";
                }
            }
        },
        yaxis: yAxis,
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
            y: {
                formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                  const seriesName = w.globals.seriesNames[seriesIndex];
                  if(selectedCurrency && seriesName.includes("Amount")){
                    return value ? getFormmater().format(value) : "";
                  }else{
                    return value ? value : "";
                  }
                }
            }
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 2,
        },
        colors: ["#0a0c32"],
        fill: {
            colors: ["#0a0c32"],
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };


    return <>
        <Row>
            <Col lg={12}>
                <Card>
                    <Card.Body className="p-0 pt-3">
                        <Chart
                            options={options}
                            series={series}
                            type="area"
                            height={350}
                        />
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>;
}

export default OverallChart;
