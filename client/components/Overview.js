import React from 'react'
import { useState, useEffect } from 'react';
//import { getSelectedValue } from "../components/Main";
import {Link, useLocation} from "react-router-dom"

function Overview() {

    const location = useLocation()

    const [selectedCargoCenter, setSelectedCargoCenter] = useState(location.state.selectedCargoCenter)
    const [selectedVehicle, setSelectedVehicle] = useState(location.state.selectedVehicle)

    const [packageLeft, setPackageLeft] = useState(0)
    const [packageTotal, setPackageTotal] = useState(0)
    const [distanceLeft, setDistanceLeft] = useState(0)
    const [distanceTotal, setDistanceTotal] = useState(0)

    const [backButtonSwitch, setBackButtonSwitch] = useState(0)
    const [nextButtonSwitch, setNextButtonSwitch] = useState(0)

    const [deliveryList, setDeliveryList] = useState({})

    useEffect(()=>{ 
        void async function fetchCargoInfo() {
            const response = await fetch("/api/cargo_info/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
            const JsonCargoInfo = await response.json();
            setPackageTotal(JsonCargoInfo.length);

            const response2 = await fetch("/api/cargo_center/" + selectedCargoCenter);
            let point = await response2.json()
            let deliveryRoute = []

            const distance = (coor1, coor2) => {
                const x = coor2.loc_x - coor1.loc_x;
                const y = coor2.loc_y - coor1.loc_y;
                return Math.sqrt((x*x) + (y*y));
            };

            const sortByDistance = (JsonCargoInfo, point) => {
                const sorter = (b, a) => a.cargo_weight/distance(a, point) - b.cargo_weight*distance(b, point);
                JsonCargoInfo.sort(sorter);
            };

            while(JsonCargoInfo.length > 0){
                sortByDistance(JsonCargoInfo, point)
                JsonCargoInfo[0].distance = distance(JsonCargoInfo[0], point).toFixed(2)
                deliveryRoute.push(JsonCargoInfo[0])
                point = JsonCargoInfo[0]
                JsonCargoInfo.splice(0,1)
            }
            
            let packageLeftCount = 0, distanceLeft = 0, distanceTotal = 0;
            
            deliveryRoute.forEach(element => {
                distanceTotal += parseFloat(element.distance)
                if(element.status_id != 3){
                    packageLeftCount++
                    distanceLeft += parseFloat(element.distance)
                }
            })

            setPackageLeft(packageLeftCount)
            setDistanceLeft(distanceLeft.toFixed(2))
            setDistanceTotal(distanceTotal.toFixed(2))

            setDeliveryList(deliveryRoute)
        }();    

    }, []); 

    function backSwitchOn(){
        setBackButtonSwitch(1)
    }

    function backSwitchOff(){
        setBackButtonSwitch(0)
    }

    function nextSwitchOn(){
        setNextButtonSwitch(1)
    }

    function nextSwitchOff(){
        setNextButtonSwitch(0)
    }

    return (
        <div id="main">
            <div id="pageTitle">OVERVIEW</div>
            <div id="packageCountDiv">
                <div id="packageLeftDiv">
                    <div className="mylabel">REMAINING PACKAGES</div>
                    <div id="packageLeft">{packageLeft}</div>
                </div>
                <div id="packageTotalDiv">
                    <div className="mylabel">TOTAL PACKAGES</div>
                    <div id="packageTotal">{packageTotal}</div>
                </div>
            </div>
            <div id="distanceDiv">
                <div id="distanceLeftDiv">
                    <div className="mylabel">REMAINING DISTANCE(km)</div>
                    <div id="distanceLeft">{distanceLeft}</div>
                </div>
                <div id="distanceTotalDiv">
                    <div className="mylabel">TOTAL DISTANCE(km)</div>
                    <div id="distanceTotal">{distanceTotal}</div>
                </div>
            </div>
            <div id="buttonDiv">
                <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/" onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>
                <Link className={nextButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/delivery" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle, deliveryList: deliveryList}} onMouseEnter={nextSwitchOn} onMouseLeave={nextSwitchOff}>NEXT</Link>
            </div>
        </div> 
    )
}
export default Overview;