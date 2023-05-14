import React, { useState, useEffect } from "react";
import CanvasJSReact from '../canvasjs-3.7.5/canvasjs.react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function AdminPanel() {

    const navigate = useNavigate();
    const [followers, setFollowers] = useState([]);
    const [csvData, setCsvData] = useState(null);

    useEffect(() => {
        getUserStatus();
        getFollowers();
    }, []);

    const getUserStatus = async () => {
        if (localStorage.getItem("user") === null || localStorage.getItem("user") !== "admin") {
            navigate('/login')
        }
    }

    const getFollowers = async () => {
        await axios.get('/adminPanelFollowers').then((response) => {

            setFollowers(response.data)
            console.log(response.data)
        });
    }

    const dataPoints = followers.map((destination) => ({

        label: destination.destination,
        y: destination.followers_count

    }));

    const options = {
        title: {
            text: "Vacations Reports"
        },
        data: [{
            type: "column",
            dataPoints: dataPoints
        }]
    };

    const handleDownloadCsv = () => {
        const headers = ["destination", "followers"];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + followers.map((follower) => [follower.destination, follower.followers_count].join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        setCsvData(encodedUri);
    };


    return (
        <div className="container">

            <Navbar />
            <div className="row">
                <div className="col-12 button-csv"><button className="btn btn-success" onClick={handleDownloadCsv}>Download CSV</button>
                    {csvData && <a href={csvData} download="data.csv">Download CSV</a>}
                </div>
                <div className="col-12 chart-div">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;
