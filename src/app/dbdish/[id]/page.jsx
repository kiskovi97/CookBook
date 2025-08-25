import DBDish from '../../../components/DBDish';
import Navbar from '../../../components/Navbar';
import { Suspense } from "react";

export default async function Page({params}) {
  const { id } = await params
  return <>
    <Navbar search/>
    <Suspense fallback={<div>Loading...</div>}>
      <DBDish id={id} />
    </Suspense>
  </>;
}