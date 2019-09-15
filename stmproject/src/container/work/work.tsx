import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Button, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';





interface Iprops extends FormComponentProps<any> {

}

class Work extends Component<Iprops> {
    
    render() {
        return <div>this is work!</div>
    }
        
}

export default Work