import React, { Component } from "react";
import { Button } from "../components/Button";

export default ({user, handlePromClick, handleDemClick}) => {        
    return (
        <div>
            El usuario "{user.username}" es {user.type} y su id es: {user.id}
            {user.type === "admin"? <button value = {user.id} onClick = {handleDemClick}>Degradar</button> : <button value = {user.id} onClick = {handlePromClick}>Promover</button>}
            

        </div>
    )
}
