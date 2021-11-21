import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom"

function Main() {

    const [selectedCargoCenter, setSelectedCargoCenter] = useState(0)
    const [selectedVehicle, setSelectedVehicle] = useState(0)

    const [vehicles, setVehicles] = useState([])
    const [cargoCenters, setCargoCenters] = useState([])

    const [buttonOnOff, setButtonOnOff] = useState(0)

    useEffect(()=>{
        fetchVehicles().then(setVehicles)
        fetchCargoCenter().then(setCargoCenters)
    }, []);

    async function fetchVehicles() {
        const response = await fetch("/api/vehicle");
        const data = await response.json();
        setSelectedVehicle(data[0].vehicle_id)
        return data
    };

    async function fetchCargoCenter() {
        const response = await fetch("/api/cargo_center");
        const data = await response.json();
        setSelectedCargoCenter(data[0].center_id)
        return data
    };

    function handleCityChange(event){
        setSelectedCargoCenter(event.target.value)
    }

    function handleVehicleChange(event){
        setSelectedVehicle(event.target.value)
    }

    function buttonSwitchOn(){
        setButtonOnOff(1)
    }

    function buttonSwitchOff(){
        setButtonOnOff(0)
    }

    return (
        <div id="main">
            <div id="pageTitle">MAIN</div>
            <div id="cityDiv">
                <div id="citySpanDiv">
                    <span>CITY</span>
                </div>
                <div id="cityComboDiv">
                    <select onChange={handleCityChange} id="citySelect" defaultValue="0">
                        <option disabled>Choose City</option>
                        {cargoCenters.map((c) =>   
                            <option key={c.center_id} value={c.center_id}>{c.center_name}</option> 
                        )}
                    </select>    
                </div>
            </div>
            <div id="vehicleDiv">
                <div id="vehicleSpanDiv">
                    <span>VEHICLE</span>
                </div>
                <div id="vehicleComboDiv">
                    <select onChange={handleVehicleChange} id="vehicleSelect" defaultValue="0">
                        <option disabled>Choose Vehicle</option>
                        {vehicles.map((v) =>     
                            <option key={v.vehicle_id} value={v.vehicle_id}>{v.vehicle_name}</option> 
                        )}
                    </select>    
                </div>
            </div>
            <div id="buttonDiv">
                <Link className={buttonOnOff ? "mybuttonOn" : "mybuttonOff"} to="/overview" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle}} onMouseEnter={buttonSwitchOn} onMouseLeave={buttonSwitchOff}>NEXT</Link>
            </div>
        </div>
    )
}

export default Main; 