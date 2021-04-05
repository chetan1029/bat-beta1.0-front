import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Chart from "react-apexcharts";
import { default as dayjs } from 'dayjs';
import classNames from "classnames";


interface OrderChartProps {
    data: any;
    selectedCurrency: string;
    selectedPeriod: string;
    changePeriod: any;
}

const OrderChart = ({ data, selectedCurrency, selectedPeriod, changePeriod }: OrderChartProps) => {

    const getFormmater = () => {
        const cFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: selectedCurrency,
            maximumFractionDigits: 2
        });
        return cFormatter;
    }

    const seriesData: Array<any> = [];

    for (const d in data) {
        seriesData.push([d, data[d]]);
    }

    const series = [
        {
            name: "Amount",
            data: seriesData
        }
    ];

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
        yaxis: {
            labels: {
                formatter: (value, timestamp, opts) => {
                    return value ? getFormmater().format(value) : "";
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
            y: {
                formatter: (value) => {
                    return value ? getFormmater().format(value) : "";
                }
            }
        },
        stroke: {
            show: true,
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };

    const onChangePeriod = (period) => {
        changePeriod(period);
    }

    return <>
        <Row>
            <Col lg={12}>
                <Card>
                    <Card.Body className="p-0">
                        <div className="mb-2 mt-3 ml-3">
                            <Button variant={selectedPeriod === '1m' ? "primary" : "white"} id="one_month" onClick={() => onChangePeriod('1m')} className={classNames('mr-1', 'btn-chart')}>1M</Button>
                            <Button variant={selectedPeriod === '6m' ? "primary" : "white"} id="six_month" onClick={() => onChangePeriod('6m')} className={classNames('mr-1', 'btn-chart')}>6M</Button>
                            <Button variant={selectedPeriod === '1y' ? "primary" : "white"} id="one_year" onClick={() => onChangePeriod('1y')} className={classNames('mr-1', 'btn-chart')}>1Y</Button>
                            <Button variant={selectedPeriod === 'all' ? "primary" : "white"} id="all" onClick={() => onChangePeriod('all')} className={classNames('mr-1', 'btn-chart')}>All</Button>
                        </div>
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

export default OrderChart;
