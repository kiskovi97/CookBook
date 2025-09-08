import BigReceiptEdit from '@/components/BigReceiptEdit';
import Navbar from '@/components/Navbar';
import styles from '@/components/Page.module.css'
import { fetchDataById } from "@/lib/dynamoService";
import { Recipe } from "@/types/recipe";
import type { Metadata } from 'next'

type PageProps = {
  params: Promise<{ id: string }>; // 👈 Next.js infers this as a Promise in your case
};

export async function generateMetadata({ params } : PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchDataById(id);

  if (!data.success || !data.data) {
    return {
      title: "Recipe Not Found",
      description: "The requested recipe could not be found.",
    };
  }
  const recipe = data.data;
  var imageLink = recipe?.image?.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images");
  return {
    title: recipe.title,
    description: recipe.details,
    openGraph: {
      title: recipe.title,
      description: recipe.details,
      url: `https://cook-book-virid.vercel.app/dbdish/${recipe.id}`,
      images: [
        {
          url: imageLink || "", // e.g. Supabase/Cloudinary URL
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.details,
      images: [imageLink || ""],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const result = await fetchDataById(id);

  if (!result.success) {
    return (
      <>
        <Navbar search />
        <div className={styles.page}>Error: {result.message}</div>
      </>
    );
  }

  const dbData = result.data;

  return (
    <>
      <Navbar search />
      <div className={styles.page}>
        <BigReceiptEdit proj={dbData as Recipe} />
      </div>
    </>
  );
}
