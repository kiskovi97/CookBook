import DBDish from '../../../components/DBDish';
import Navbar from '../../../components/Navbar';
import { Suspense } from "react";

type PageProps = {
  params: Promise<{ id: string }>; // 👈 Next.js infers this as a Promise in your case
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <Navbar search />
      <Suspense fallback={<div>Loading...</div>}>
        <DBDish id={id} />
      </Suspense>
    </>
  );
}
