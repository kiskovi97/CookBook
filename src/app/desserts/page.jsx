import Dishes from '../../components/Dishes';
import Navbar from '../../components/Navbar';
import { Suspense } from "react";

export default function Page() {
  return <>
    <Navbar />
    <Suspense fallback={<div>Loading...</div>}>
      <Dishes tag="dessert" />
    </Suspense>
  </>;
}