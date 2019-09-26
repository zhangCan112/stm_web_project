import React, { Component } from 'react';
import { Icon, Button} from 'antd';
import { countdown } from "../../utils/tools";
import css from './tomato.module.css';


interface IProps {
    
    /**
     * 开始
     */
    title: string,
    /**
     * 设置的倒计时时长，单位分钟
     */
    minutes: number,
    /**
     * 倒计时结束时的回调
     * @param isTerminated 是否被人为打断而终止 True：人为终止 False: 自然结束
     * @param completedMilliseconds 已完成的时间，单位为毫秒
     */
    onEnd?: (isTerminated: boolean ,completedMilliseconds: number)=>void,    
}

interface IState {
    count: number
    isEnd: boolean
}

export default class CountdownButton extends Component<IProps, IState> {
         
    constructor(props: IProps) {
        super(props)
        this.state = {
            count: 0,
            isEnd: true,
        }
    }

    render() {
        return (
            <Button className={css.button} onClick={this.onClick}>
                    <Icon type="caret-right" />开始FeedBack1234{this.state.count}
            </Button>
        )
    }

    onClick = () => {

    }
}