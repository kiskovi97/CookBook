'use client'

import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import SmallReceipt from './Components/SmallReceipt'
import { useState, useEffect } from 'react';
import { fetchDataByTag } from '../lib/dynamoService';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

var Dishes = ({tag}) =>
{
    const searchParams = useSearchParams();
    const [dbData, setDBData] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filter, setFilter] = useState("");
    const [orderBy, setOrderBy] = useState("name");
    const location = useRouter();

    const fetchAndSetData = async (tag, orderBy) => {
        const result = await fetchDataByTag(tag);
        if (result.success) {
            console.log(result.data);
            if (orderBy === "date") {
                setDBData([...result.data].sort((first, second) => new Date(first.CreationDate) - new Date(second.CreationDate)));
            } else if (orderBy === "date-desc") {
                setDBData([...result.data].sort((first, second) => new Date(second.CreationDate) - new Date(first.CreationDate)));
            } else {
                setDBData([...result.data].sort((first, second) => first.title.localeCompare(second.title)));
            }
        } else {
            alert("Error Fetching Data: " + result.message);
        }
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
        fetchAndSetData(tag, orderBy);
    }, [tag, orderBy]);

    
    useEffect(() => {
        setFiltered(dbData.filter((item) => recipeMatchesFilter(filter, item)));
    }, [dbData, filter]);

    
    useEffect(() => {
        if (searchParams)
        {
            const filter = searchParams.get("filter") ?? "";
            if (filter)
            {
                setFilter(filter);
                return;
            }
        }
        setFilter("");
    }, [location]);

    return (
    <div className={styles.page}>
        <div className={styles.filters}>
            <div>
                <input 
                type="text"
                id="search"
                name='search'
                placeholder="Search..."
                value={filter}            
                onChange={(e) => setFilter(e.target.value)} />
            </div>
            <div className={styles.sorting}>
                Order By
                <select name="orderBy" id="orderBy" onChange={(e) => {
                    setOrderBy(e.target.value);
                }}>
                    <option value="name">Name</option>
                    <option value="date">Oldest</option>
                    <option value="date-desc">Newest</option>
                </select>
            </div>
        </div>
        <div className={gStyles.grid_big}>
            {filtered.map((station) => (<SmallReceipt key={station.id} proj={station} index={station.id} />))}
        </div>
    </div>);
}

export default Dishes