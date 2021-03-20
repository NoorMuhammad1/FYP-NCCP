import { Badge } from '@material-ui/core';
import React from 'react';
import './style.css'
const Status=(props)=>{
    const completed ='rgb(5, 168, 5)';
    const pending = 'rgb(201, 158, 79)';
    const cancelled ='red';

    const getColor=()=>{
        if(props.status.toLowerCase() =='completed'){
            return completed;
        }
        if(props.status.toLowerCase() ==='pending'){
            return pending;
        }
        if(props.status.toLowerCase() ==='cancelled'){
            return cancelled;
        }
    }
    return(
        <div>
           
            <span className="status-color" style={{backgroundColor:`${
               getColor()
            }`}}></span>
            <span style={{color:`${getColor()}`}}>{props.status}</span>
        </div>
    )
};

export default Status;