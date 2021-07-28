import React, { useContext, useEffect} from "react"
import { CategoryContext } from "./CategoryProvider"

export const CategoryList = () => {
    const {categories, getCategories} = useContext(CategoryContext)

    const alphabeticalCategories = categories.sort((category1, category2) => category1.label.localeCompare(category2.label))

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <h1>Categories</h1>
            {
                alphabeticalCategories.map(category => {
                    return (
                        <div>{category.label}</div>
                    )
                })
            }
        </div>
    )
}