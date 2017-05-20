import React, {Component} from 'react';
import './Get.css';
import Poke from "./Poke.js";

class Get extends Component{
    render(){
        return(
            <div >
                <h1>Get Component</h1>
                <Poke id='1' />
                <Poke id='2'/>
                <Poke id='3'/>
                <Poke id='not id'/>
            </div>
        );
    }
}

export default Get;