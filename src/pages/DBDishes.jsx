import React, { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import DBReceipt from './Components/DBReceipt'
import { useState } from 'react';
import { fetchData } from '../dynamoService';
import AddDishButton from "./Components/AddDishButton.jsx";

var DBDishes = () =>
{
    const [changed, setChanged] = useState(true);
    const [dbData, setDBData] = useState([]);

    const fetchAndSetData = async () => {
        const result = await fetchData();
        if (result.success) {
            console.log(result.data);
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
        setChanged(false);
    }

    useEffect(() => {
        if (changed)
        {
            fetchAndSetData();
        }
    }, [changed]);
    
    return(<div className={styles.page}>
        <AddDishButton onClickedAndChanged={() => setChanged(true)}/>
        <div className={gStyles.grid_big}>
            {dbData.map((item) => (<DBReceipt proj={item} />))}
        </div>
    </div>)
}
    

export default DBDishes