import React, { Component } from 'react';
import { Checkbox, Icon } from 'antd';
import css from './gtd.module.css';

interface IProps {

    /**
     * tag标记
     */
    tag?: string,
    /**
     * 当点击了checkboxIcon时
     */
    onCheck?: (tag?: string) => void,
    /**
     * 当点击了置顶按钮时
     */
    onTop?: (tag?: string) => void,

}

interface IState {

}

export default class TaskCell extends Component<IProps, IState> {
    render() {
        return (
            <div className={css.taskCell}>
                <div>
                    <Checkbox />
                    <span className={css.taskTitle}>{'置顶任务会是番茄时间正在工作的内容'}</span>
                </div>
                <div className={css.taskButtonbox}>
                <Icon type="arrow-up" style={{ fontSize: '20px'}} onClick={()=>{}}/>
                <Icon type="ellipsis" style={{ fontSize: '20px'}} onClick={()=>{}}/>
                </div>
            </div>
        )
    }
}