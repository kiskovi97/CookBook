import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import Receipt from './Components/Receipt'
import dishes from './dishes.js';

class Home extends React.Component {
    state = {
        filter: (item) => true,
        top: false,
        all: true,
    }

    onAllClicked = () => {
        var filterFunc = (item) => true;
        this.setState({filter: filterFunc, all: true, top: false});
    }

    onTopClicked = () => {
        var filterFunc = (item) => true;
        this.setState({filter: filterFunc, all: false, top: true});
    }

    render () {
        let receipts = dishes.filter(this.state.filter);
        if (this.state.top) 
            receipts = receipts.slice(0,5);
        return(
            <div className={styles.page}>
                <Me/>
                <div className={styles.filters}>
                    <button type="button" onClick={this.onAllClicked} className={this.state.all ? styles.selected:""}>All</button>
                    <button type="button" onClick={this.onTopClicked} className={this.state.top ? styles.selected:""}>Top 5</button>
                </div>
                <div className={gStyles.grid_big}>
                    {receipts.map((station, index) => (<Receipt proj={station} index={'/dessert/'+ index}/>))}
                </div>
            </div>)
    }
}

export default Home