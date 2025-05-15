import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Me from './Components/Me'
import { useState, useEffect } from 'react';
import { fetchLastXData } from '../dynamoService';
import DBReceipt from './Components/DBReceipt.jsx'

const Home = () => {
    const [dbData, setDBData] = useState([]);

    const fetchAndSetData = async () => {
        const result = await fetchLastXData(5);
        if (result.success) {
            console.log(result.data);
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }
    
     useEffect(() => {
        fetchAndSetData();
    }, []);
    return (
        <div className={styles.page}>
            <Me />
            <div className={gStyles.grid_big} key="top-recepies">
                {dbData.map((station, index) => (<DBReceipt proj={station}/>))}
            </div>
        </div>)
};

export default Home