import React, { Component } from 'react';
import { Button, Result } from 'antd';
import History from "../../history";

export default class NotFoundPage extends Component {

    render() {
        return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => History.push('/')}>
            Back Home
          </Button>
        }
      ></Result>
    }   
}