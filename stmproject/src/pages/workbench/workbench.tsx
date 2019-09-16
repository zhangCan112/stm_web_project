import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import Home from "../../containers/home/home";




interface Iprops extends FormComponentProps<any> {

}

class Workbench extends Component<Iprops> {
    
    render() {
        return <Home>
            <div>this is work!</div>
        </Home>
    }
        
}

export default Workbench