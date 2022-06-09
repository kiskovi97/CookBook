import React from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import Receipt from './Components/Receipt'
import dishes from './dishes.js';

class Home extends React.Component {
    state = {
        filter: (item) => true,
        top: true,
        all: false,
    }

    onAllClicked = () => {
        var filterFunc = (item) => true;
        this.setState({ filter: filterFunc, all: true, top: false });
    }

    onTopClicked = () => {
        var filterFunc = (item) => true;
        this.setState({ filter: filterFunc, all: false, top: true });
    }

    render() {
        let reverse = [...dishes].sort((item1, item2) => item2.index.localeCompare(item1.index));
        let receipts = reverse.filter(this.state.filter);
        if (this.state.top)
            receipts = receipts.slice(0, 5);
        return (
            <div className={styles.page}>
                <Me />
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=student-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - student-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?ssoid=vcloud&token=teacher-viewrestricted-offline"target="_blank" rel="noreferrer">BookrDeeplink - teacher-viewrestricted-offline</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=student-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and student-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2&ssoid=vcloud&token=teacher-viewrestricted-exit"target="_blank" rel="noreferrer">BookrDeeplink - book = 2 and teacher-viewrestricted-exit</a></h3>
                <h3><a href="bookrclass://?book=2"target="_blank" rel="noreferrer">BookrDeeplink - book = 2</a></h3>
                <div className={gStyles.grid_big} key="top-recepies">
                    {receipts.map((station, index) => (<Receipt proj={station} index={index} key={index}/>))}
                </div>
            </div>)
    }
}

/*<div className={styles.filters}>
                    <button type="button" onClick={this.onAllClicked} className={this.state.all ? styles.selected:""}>All</button>
                    <button type="button" onClick={this.onTopClicked} className={this.state.top ? styles.selected:""}>Top 5</button>
                </div>*/

export default Home