"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './RecipeInspection.module.css';

import { Recipe } from '@/types/recipe';

import { RecipeRef, fetchInspectionData, ProblemType } from '@/lib/recipe-inspection';

import { extractImage } from '@/lib/fetchRecipe';
import { uploadData } from '@/lib/dynamoService';
import { useRouter } from "next/navigation";
import { useAuth } from './AuthContext';

interface RecipeShowcaseProps {
    recipe: Recipe;
}

function ImageProblem({ recipe }: { recipe: Recipe }) {

    const router = useRouter();
    const [ loading, setLoading ] = useState(false);
    const [ fixed, setFixed ] = useState(false);


    if (!recipe.sources || recipe.sources.length === 0) {
        return (<div>
            <Link href={"/dbdish/" + recipe.id + "/edit"} >
                Edit Recipe
            </Link>
        </div>);
    }

    var firstLink = recipe.sources[0];

    const fixImage = async () => {
        setLoading(true);
        if (!firstLink.link)
        {
            alert("No link available to fix the image.");
            return;
        }
        
        const newImage = await extractImage(firstLink.link || "");

        if (!newImage) {
            alert("No recipe or image found at the link.");
            return;
        }

        console.log("Found image:", newImage);
        alert("Found image, opening in new tab. Please copy the image URL and update the recipe.");
        recipe.image = newImage;
        await uploadData(recipe);
        
        setLoading(false);
        setFixed(true);
        if (confirm("Want to go to the recipe page to edit?")) {
            router.push("/dbdish/" + recipe.id); // Navigate after upload
        }
    }

    if (loading) return <div>Fixing image...</div>;
    if (fixed) return <div>Image fixed successfully!</div>;

    return (<div>
        <button onClick={fixImage} >Missing or broken image</button>

        <Link href={recipe.image || ""} >
            test current image
        </Link>
    </div>);
}

function DetailsProblem({ problem }: { problem: RecipeRef }) {
    return (<div>
        <Link href={"/dbdish/" + problem.id + "/edit"} >
            Missing Details
        </Link>
    </div>);
}

function TagProblem({ problem }: { problem: RecipeRef }) {
    return (<div>
        <Link href={"/dbdish/" + problem.id + "/edit"} >
            Missing Tags
        </Link>
    </div>);
}

export default function RecipeInspection({ recipe } : RecipeShowcaseProps) {

    const [ loading, setLoading ] = useState(true);
    const [ problems, setProblems ] = useState<RecipeRef[]>([]);

    const user = useAuth();
    if (!user) return null;

    useEffect(() => {
            setLoading(true);
            fetchInspectionData(recipe).then((data) => {
                setProblems(data);
                setLoading(false);
        });
    }, []);

    if (loading) {
        return (<div className={styles.recipeCard}>
            <div>{recipe.title} is Loading</div>
        </div>
        );
    }

    return (<div className={styles.recipeCard + " " + (problems.length == 0 ? styles.hidden : "")}>
        <div>{recipe.title}</div>
        <div>
            {problems.map((problem, idx) => {
                switch (problem.problem) {
                    case ProblemType.Image:
                        return <ImageProblem key={idx} recipe={recipe} />;
                    case ProblemType.Details:
                        return <DetailsProblem key={idx} problem={problem} />;
                    case ProblemType.Tag:
                        return <TagProblem key={idx} problem={problem} />;
                    default:
                        return null;
                }
            })}
        </div>
    </div>
    );
};