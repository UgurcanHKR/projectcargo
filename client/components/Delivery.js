import React from 'react'
import { useState, useEffect} from 'react';
import {Link, useLocation} from "react-router-dom"

function Delivery() {
    
    const location = useLocation()

    const [selectedVehicle, setSelectedVehicle] = useState(location.state.selectedVehicle)
    const [selectedCargoCenter, setSelectedCargoCenter] = useState(location.state.selectedCargoCenter) 
    const [deliveryList, setDeliveryList] = useState(location.state.deliveryList)   

    const [completed, setCompleted] = useState(false)

    const [backButtonSwitch, setBackButtonSwitch] = useState(0)
    const [nextButtonSwitch, setNextButtonSwitch] = useState(0)

    const [cargoId, setCargoId] = useState(0)
    const [recipient, setRecipient] = useState("")
    const [address, setAddress] = useState("")
    const [distance, setDistance] = useState("") 

    async function fetchCargoInfo() {
        if(deliveryList[0].status_id == 1){
            await fetch("/api/delivery_started/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
        }

        const response = await fetch("/api/cargo_info/center/" + selectedCargoCenter + "/vehicle/" + selectedVehicle);
        const cargoList = await response.json()

        cargoList.forEach(element => {
            deliveryList.forEach(c => {
                if(element.cargo_id == c.cargo_id){
                    c.status_id = element.status_id
                }
            })
        })

        setDeliveryList(deliveryList)
        
        var check = true

        for(var i = 0; i < deliveryList.length; i++){
            const c = deliveryList[i]            
            if(c.status_id == 2){                
                check = false
                setCargoId(c.cargo_id)
                setRecipient(c.recipient_name + " " + c.recipient_surname)
                setAddress(c.recipient_address)
                setDistance(c.distance)
                break
            }
        }

        if(check){
            setCompleted(true)
        }
    };
    useEffect(()=>{
        fetchCargoInfo()
    }, []);

    async function setAsDelivered(){
        await fetch('/api/delivered/' + cargoId)        
        deliveryList.forEach(element => {
            if(element.cargo_id == cargoId){
                element.status_id = 3
            }
        })
        setDeliveryList(deliveryList)
        fetchCargoInfo()
    }

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
 
    function deliveryNotCompleted(){
        return(
            <div id="main">
                <div id="pageTitle">CARGO #{cargoId}</div>
                <div id="cargoNameDiv">
                    <div className="mylabel">RECIPIENT</div>
                    <div className="mytext" style={{fontSize: "32px"}}>{recipient}</div>            
                </div>
                <hr />
                <div id="cargoLocationDiv">
                    <div className="mylabel">ADDRESS</div>
                    <div className="mytext">{address}</div>
                </div>
                <hr />
                <div id="cargoDistanceDiv">
                    <div className="mylabel">REMAINING DISTANCE(km)</div>
                    <div className="mytext">{distance}</div>
                </div> 
                <hr />       
                <div id="buttonDiv">
                    <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/overview" state={{selectedCargoCenter: selectedCargoCenter, selectedVehicle: selectedVehicle, deliveryList: deliveryList}} style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>
                    <button className={nextButtonSwitch ? "mybuttonOn" : "mybuttonOff"} style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={nextSwitchOn} onMouseLeave={nextSwitchOff} onClick={setAsDelivered}>DELIVERED</button>               
                </div>
            </div>
        )        
    }

    function deliveryCompleted(){
        return(
            <div id="main">
                <div id="pageTitle">CARGO</div>
                <div style={{fontSize: "64px",height: "67%",position: "relative"}}>
                    <div style={{top: "50%",left: "50%",transform: "translate(-50%, -50%)",position: "absolute",}}>DELIVERY COMPLETED</div>
                </div>
                <hr />       
                <div id="buttonDiv">
                    <Link className={backButtonSwitch ? "mybuttonOn" : "mybuttonOff"} to="/overview" style={{padding: "0px 5%",marginLeft: "2%",marginRight: "2%"}} onMouseEnter={backSwitchOn} onMouseLeave={backSwitchOff}>BACK</Link>                    
                </div>
            </div>
        )
    }

    return (
        <div id="main">
            {completed ? deliveryCompleted() : deliveryNotCompleted()}
        </div>
    )
}
export default Delivery;
