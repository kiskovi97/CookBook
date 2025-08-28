'use client'

import SearchBar from '../../components/SearchBar';
import DishList from '../../components/DishList';
import Navbar from '../../components/Navbar';
import styles from "../../components/Page.module.css";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Suspense } from "react";

export default function Page() {

  const searchParams = useSearchParams();

  const [filter, setFilter] = useState("");
  const [orderBy, setOrderBy] = useState("name");

  useEffect(() => {
    const filterSearch = searchParams.get("filter") ?? "";
    if (filterSearch)
      setFilter(filterSearch)
  }, [searchParams])
  
  return <>
    <Navbar search={false} />
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.page}>
        <SearchBar filter={filter} orderBy={orderBy} setFilter={(value => setFilter(value))} setOrderBy={(value => setOrderBy(value))}/>
        <DishList filter={filter} orderBy={orderBy} tag='' />
      </div>
    </Suspense>
  </>;
}