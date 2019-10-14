import React, { Component } from 'react';
import { Input, Icon, Timeline, List } from 'antd';
import css from './gtd.module.css';
import InfiniteScroll from 'react-infinite-scroller'

interface IProps {

}

interface IState {

}

export default class GTD extends Component<IProps, IState> {
    render() {
        return (
            <div className={css.container}>
                <div style={{ marginBottom: 16 }}>
                    <Input 
                    size={'large'} 
                    placeholder="添加新任务" 
                    suffix={<Icon type="enter" onClick={()=>{}}/>}/>
                </div>
            </div>
        )
    }
}