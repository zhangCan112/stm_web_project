import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { countdown } from "../../utils/tools";
import css from './tomato.module.css';

enum CountdownStage {
    /**
     * 未开始
     */
    Normal,
    /**
     * 工作
     */
    Working,
    /**
     * 休息
     */
    Resting,
}

interface IProps {

    /**
     * 开始的标题内容
     */
    title: string,
    /**
     * 工作倒计时时长，单位分钟,默认25分钟
     */
    workMinutes: number,
    /**
     * 休息倒计时时长，单位分钟，默认5分钟
     */
    restMinutes: number,
    /**
     * 倒计时被终止时的回调
     * @param stage 被终止时的状态阶段     
     */
    onTerminated?: (stage: CountdownStage) => void,
    /**
     * 倒计时正常结束时的回调
     * @param stage 被终止时的状态阶段     
     */
    onEnd?: (stage: CountdownStage) => void,
}

interface IState {
    stage: CountdownStage,
    leftSeconds?: number,
}

export default class CountdownButton extends Component<IProps, IState> {

    /**
     * 计时器终止句柄
     */
    timeHandler?: () => void

    constructor(props: IProps) {
        super(props)
        this.state = {
            stage: CountdownStage.Normal,
        }
    }

    render() {
        let lefts = this.state.leftSeconds || 0
        let totalTime = this.getTotalTime()        
        let percent =  0;
        if (totalTime > 0) {
            percent = 1 - (lefts / totalTime)            
        }

        let progressOverStyle = { backgroundColor: '#00000000'}
        let progressClipStyle = { backgroundColor: '#00000000'} as any
        if (this.state.stage == CountdownStage.Normal) {
            progressOverStyle = { backgroundColor: '#00000000'}
            progressClipStyle = { backgroundColor: '#00000000'}
        } else {
            progressOverStyle = { backgroundColor: 'green'}
            progressClipStyle = { backgroundColor: 'red', width: `${percent*100}%`}
        }

        return (
            <div className={css.progressOver} style={progressOverStyle} onClick={this.onClick}>
                <div style={progressClipStyle}>
                    <div className={css.button} >
                        <Icon style={{marginRight: 5}} type={this.getButtonIcon()} /> {this.getButtonTitle()}
                    </div>
                </div>
            </div>
        )
    }

    onClick = () => {
        switch (this.state.stage) {
            case CountdownStage.Working:
                this.terminateWork()
                break;
            case CountdownStage.Resting:
                this.terminateRest()
                break;
            default:
                this.startWork()
                break;
        }
    }

    startWork = () => {
        this.timeHandler = countdown(
            (lefts: number) => {
                this.setState({
                    stage: CountdownStage.Working,
                    leftSeconds: lefts
                })
                if (lefts == 0) {
                    this.endWork()
                    this.startRest()
                }
            },
            this.props.workMinutes * 60,
            1000)
    }

    startRest = () => {
        this.timeHandler = countdown(
            (resetLefts: number) => {
                this.setState({
                    stage: CountdownStage.Resting,
                    leftSeconds: resetLefts
                })
            },
            this.props.restMinutes * 60,
            1000)
    }

    endWork = () => {
        this.timeHandler && this.timeHandler()
        this.props.onEnd && this.props.onEnd(CountdownStage.Working)
    }

    endRest = () => {
        this.timeHandler && this.timeHandler()
        this.props.onEnd && this.props.onEnd(CountdownStage.Resting)
        this.setState({
            stage: CountdownStage.Normal,
        })
    }


    terminateWork = () => {
        this.timeHandler && this.timeHandler()
        this.props.onTerminated && this.props.onTerminated(CountdownStage.Working)
        this.setState({
            stage: CountdownStage.Normal,
        })
    }

    terminateRest = () => {
        this.timeHandler && this.timeHandler()
        this.props.onTerminated && this.props.onTerminated(CountdownStage.Resting)
        this.setState({
            stage: CountdownStage.Normal,
        })
    }

    getButtonTitle = () => {
        let btnTitle = `开始${this.props.title}`
        let lefts = this.state.leftSeconds || 0
        switch (this.state.stage) {
            case CountdownStage.Working:
                btnTitle = `处理${this.props.title}`
                break;
            case CountdownStage.Resting:
                btnTitle = `休息中`
                break;
            default:
                btnTitle = `开始${this.props.title}`
                break;
        }
        return btnTitle;
    }

    getButtonIcon = () => {
        switch (this.state.stage) {
            case CountdownStage.Working:
                return "loading";
            case CountdownStage.Resting:
                return "clock-circle";
            default:
                return "play-circle";
        }
    }

    getTotalTime = () => {
        switch (this.state.stage) {
            case CountdownStage.Working:
                return this.props.workMinutes * 60;
            case CountdownStage.Resting:
                return this.props.restMinutes * 60;
            default:
                return 0;
        }
    }


    secondsToTime = (seconds: number) => {
        let mintinues = Math.floor(seconds / 60)
        let restSeconds = seconds % 60
        return (mintinues == 0 ? '' : `${Math.ceil(seconds / 60)}分`) +
            (seconds % 60 == 0 ? '' : `${seconds % 60}秒`)
    }

}