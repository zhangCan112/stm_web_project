import React, { Component } from 'react';
import Home from "../../containers/home/home";
import Tomato from '../../components/tomato/tomato';
import GTD from '../../components/gtd/gtd';
import css from './workbench.module.css';

interface Iprops {

}

class Workbench extends Component<Iprops> {

    render() {
        return (
            <Home>
                <div className={css.container}>
                    <Tomato />
                    <span className={css.space}/>
                    <GTD />
                </div>
            </Home>
        )
    }

}

export default Workbench