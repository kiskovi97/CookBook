'use client'

import gStyles from './Grid.module.css'
import SmallReceipt from './Components/SmallReceipt'
import { useState, useEffect } from 'react';
import { fetchDataByTag } from '../lib/dynamoService';
import { Recipe } from "../types/recipe";

interface DishListProps {
  tag?: string;
  maxCount?: number;
  filter?: string;
  orderBy?: string;
}

var DishList: React.FC<DishListProps> = ({tag, maxCount, filter, orderBy}) =>
{
    const [dbData, setDBData] = useState<Recipe[]>([]);
    const [filtered, setFiltered] = useState<Recipe[]>([]);

    const fetchAndSetData = async (tag?: string, orderBy?: string, maxCount?: number) => {
        let result = await fetchDataByTag(tag);
        if (result.success) {
            let resultData = result.data as Recipe[];
            if (orderBy === "date") {
                resultData = [...resultData].sort((first, second) => new Date(first.CreationDate).getTime() - new Date(second.CreationDate).getTime());
            } else if (orderBy === "date-desc") {
                resultData = [...resultData].sort((first, second) => new Date(second.CreationDate).getTime() - new Date(first.CreationDate).getTime());
            } else {
                resultData = [...resultData].sort((first, second) => first.title.localeCompare(second.title));
            }
            if (maxCount)
                resultData = resultData.slice(0, maxCount);
            setDBData(resultData);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }

    const recipeMatchesFilter = (filter: string | undefined, recipe: Recipe): boolean => {
    if (!filter) return true;

    const normalizeText = (text: string) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z\s]/gi, ' ')
        .toLowerCase();

    const words = normalizeText(filter)
      .split(/\s+/)
      .filter(Boolean);

    const searchableFields: string[] = [
        recipe.title,
        recipe.details ?? '',
        ...(recipe.tags ?? []),
        ...(recipe.sources?.map(section => section.link ?? '') ?? []),
        ...(recipe.instructions ?? []),
        ...(recipe.ingredients?.flatMap(section => section.list ?? []) ?? []),
    ];

    const combinedText = normalizeText(searchableFields.join(' '));

    return words.every(word => combinedText.includes(word));
  };
    
     useEffect(() => {
        fetchAndSetData(tag, orderBy, maxCount);
    }, [tag, orderBy, maxCount]);

    
    useEffect(() => {
        setFiltered(dbData.filter((item) => recipeMatchesFilter(filter, item)));
    }, [dbData, filter]);

    return (
    <div className={gStyles.grid_big}>
        {filtered.map((station) => (<SmallReceipt key={station.id} proj={station} hidden={false} />))}
    </div>);
}

export default DishList