'use client'

import Navbar from '@/components/Navbar';
import styles from "@/components/Page.module.css";
import inputStyles from "@/components/Input.module.css";
import { useState } from 'react';
import { Suspense } from "react";
import AddDishButton from '@/components/ExtractRecipeButton';
import { Recipe } from '@/types/recipe';
import BigReceiptEdit from '@/components/BigReceiptEdit';
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
        { data ? (<BigReceiptEdit proj={data}/>) : null }
      </div>
    </Suspense>
  </>;
}