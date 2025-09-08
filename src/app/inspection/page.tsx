import React from "react";
import Navbar from "@/components/Navbar";
import { fetchData } from "@/lib/dynamoService";
import { Recipe } from "@/types/recipe";
import RecipeInspection from "@/components/RecipeInspection";


export default async function InspectionPage() {

    const data = await fetchData();
    const recepts = (data.data as Recipe[]).sort((a, b) => (b.sources?.length || 0) - (a.sources?.length || 0));
    return (
        <div>
            <Navbar search />
            <div style={{ maxWidth: "50em", margin: "2em auto", padding: "2em" }}>
                <h1>Recipe Inspection:</h1>
                <ul>
                    {recepts.map((recipe, idx) => (
                        <RecipeInspection key={idx} recipe={recipe} />
                    ))}
                </ul>
            </div>
        </div>
    );
}