'use client'

import Navbar from '../../../../components/Navbar';
import styles from '../../../../components/Page.module.css'
import BigReceiptEdit from '../../../../components/BigReceiptEdit'
import { useEffect, useState } from 'react';
import { Recipe } from "../../../../types/recipe";
import { fetchDataById } from "../../../../lib/dynamoService";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // 👈 Next.js infers this as a Promise in your case
};

export default function Page({ params }: PageProps) {

  const [dbData, setDBData] = useState<Recipe>();
  const [id, setId] = useState<string>("");
  
  const fetchAndSetData = async (id: string) => {
      const result = await fetchDataById(id);
      if (result.success) {
          console.log(result.data);
          setDBData(result.data);
      } else {
          alert("Error Fetching Data: " + result.message);
      }
  }
  
  const fetchId = async (params: Promise<{ id: string }>) => {
    const { id } = await params;
    setId(id);
  }
  
  useEffect(() => {
    if (id)
      fetchAndSetData(id);
  }, [id]);

  useEffect(() => {
    fetchId(params);
  }, [params])

  return (
    <>
      <Navbar search />
      <Suspense fallback={<div>Loading...</div>}>
        {dbData 
          ? (<div className={styles.page}>
                <BigReceiptEdit proj={dbData}/>
            </div>)
          : (<div className={styles.page}>Loading...</div>)
        }
      </Suspense>
    </>
  );
}
