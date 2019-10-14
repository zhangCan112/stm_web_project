import React, { Component } from 'react';
import { Timeline, List } from 'antd';
import CountdownButton from "./countdownButton";
import css from './tomato.module.css';
import InfiniteScroll from 'react-infinite-scroller'


interface IProps {

}

interface IState {

}

export default class Tomato extends Component<IProps, IState> {

    state = {

    }
    

    render() {
        return (
            <div className={css.container}>
                <CountdownButton title={'Feedback1234'} workMinutes={1} restMinutes={1} />
                <div className={css.recordList}>
                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={()=>{}}
                        hasMore={false}
                        useWindow={false}
                    >
                        <List
                            dataSource={[1, 2]}
                            renderItem={item => (
                                <List.Item>
                                    <div>
                                        <div className={css.titleBox}>
                                            <span className={css.dateTitle}>2018年03月18日</span>
                                            <span className={css.resultTitle}>完成了3个番茄</span>
                                        </div>
                                        <Timeline pending={item === 1 ? "FeedBack12345": undefined} reverse={true}>
                                            <Timeline.Item >9:00-10:20 活动记录草稿 </Timeline.Item>
                                            <Timeline.Item>10:30-11:20 紧急bug：Feedback-12315</Timeline.Item>
                                            <Timeline.Item>13:30-14:20 多文档上传 </Timeline.Item>
                                            <Timeline.Item>14:30-15:20 团队成员继承 </Timeline.Item>
                                        </Timeline>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}