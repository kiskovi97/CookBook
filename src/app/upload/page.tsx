'use client'

import Navbar from '@/components/Navbar';
import styles from "@/components/Page.module.css";
import inputStyles from "@/components/Input.module.css";
import { useState } from 'react';
import { Suspense } from "react";
import AddDishButton from '@/components/AddDishButton';
import { Recipe } from '@/types/recipe';
import BigReceipt from '@/components/BigReceipt';
import { uploadNewData } from '@/lib/dynamoService';
import { useAuth } from '@/components/AuthContext';

export default function Page() {

    const [ data, setData ] = useState<Recipe | null>(null);
    const { user } = useAuth();

    const uploadRecepie = async () => {
        if (!data) return;

        await uploadNewData(data);
        
        alert('Dish uploaded successfully!');
        setData(null);
    }

  if (!user) return <div>Please log in to upload a recipe.</div>;
  return <>
    <Navbar search={false} />
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.page}>
        <AddDishButton onClickedAndChanged={(recipe) => setData(recipe)}/>
        <button onClick={uploadRecepie} disabled={!data} className={inputStyles.button}>UPLOAD AS NEW</button>
        { data ? (<BigReceipt proj={data}/>) : null }
      </div>
    </Suspense>
  </>;
}