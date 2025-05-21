import React, { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import DBReceipt from './Components/DBReceipt'
import { useState } from 'react';
import { fetchData } from '../dynamoService';
import AddDishButton from "./Components/AddDishButton.jsx";
import AddAllDishButton from './Components/AddAllDishButton.jsx';

var DBDishes = () =>
{
    const [changed, setChanged] = useState(true);
    const [dbData, setDBData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState("");

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

    const recipeMatchesFilter = (filter, recipe) => {
        const normalizeText = text => text
            .normalize('NFD')                      // decompose accents
            .replace(/[\u0300-\u036f]/g, '')       // remove accent marks
            .replace(/[^a-z\s]/gi, ' ')            // remove special characters
            .toLowerCase();

        const words = normalizeText(filter)
            .split(/\s+/)
            .filter(Boolean);

        // Collect all searchable text fields from the recipe
        const searchableFields = [
            recipe.title,
            recipe.details,
            ...(recipe.tags || []),
            ...(recipe.sources?.flatMap(section => section.link) || []),
            ...(recipe.instructions || []),
            ...(recipe.ingredients?.flatMap(section => section.list) || [])
        ];

        // Combine all fields into a single lowercase string
        const combinedText = normalizeText(searchableFields.join(' '));

        // Check if every word from the filter exists in the combined text
        return words.every(word => combinedText.includes(word));
    }

    useEffect(() => {
        if (changed)
        {
            fetchAndSetData();
        }
    }, [changed]);

    useEffect(() => {
        setFiltered(dbData.filter((item) => recipeMatchesFilter(filter, item)));
    }, [dbData, filter]);
    
    return(<div className={styles.page}>
        <div className={styles.filters}>
            <input 
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className={gStyles.grid_big}>
            {filtered.map((item) => (<DBReceipt proj={item} />))}
        </div>
    </div>)
}
    

export default DBDishes