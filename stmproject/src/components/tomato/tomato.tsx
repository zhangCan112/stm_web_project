import React, { Component } from 'react';
import { Timeline, Icon, Progress, Button, Popover, message } from 'antd';
import { countdown } from "../../utils/tools";
import CountdownButton from "./countdownButton";
import css from './tomato.module.css';


interface IProps {

}

interface IState {
    
}

export default class Tomato extends Component<IProps, IState> {

    state = {
        
    }

    constructor(props: IProps) {
        super(props)        
    }

    render() {
        return (
            <div className={css.container}>                                                
                <CountdownButton title={'Feedback1234'} workMinutes={1} restMinutes={1}/>
                <div>2018年03月18日</div>
                <Timeline pending="正在进行FeedBack12345" reverse={true}>
                    <Timeline.Item >9:00-10:20 活动记录草稿 </Timeline.Item>
                    <Timeline.Item>10:30-11:20 紧急bug：Feedback-12315</Timeline.Item>
                    <Timeline.Item>13:30-14:20 多文档上传 </Timeline.Item>
                    <Timeline.Item>14:30-15:20 团队成员继承 </Timeline.Item>
                </Timeline>
            </div>
        )
    }
}