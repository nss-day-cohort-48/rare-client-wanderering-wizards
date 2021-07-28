import React, { useContext, useEffect} from "react"
import { CategoryContext } from "./CategoryProvider"

export const CategoryList = () => {
    const {categories, getCategories} = useContext(CategoryContext)

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <h1>Categories</h1>
            {
                categories.map(category => {
                    return (
                        <div>{category.label}</div>
                    )
                })
            }
        </div>
    )
}