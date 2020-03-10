import React, { Component } from "react";
import { Button } from "../components/Button";

export default ({user, handleClick}) => {        
    return (
        <div>
            El usuario "{user.username}" es {user.type} y su id es: {user.id}
            <button value = {user.id} onClick = {handleClick}>Promover</button>
        </div>
    )
}
