import React, { Component } from 'react';
import Home from "../../containers/home/home";
import Tomato from '../../components/tomato/tomato';


interface Iprops {

}

class Workbench extends Component<Iprops> {
    
    render() {
        return <Home>
            <div>this is work!</div>
            <Tomato></Tomato>
        </Home>
    }
        
}

export default Workbench