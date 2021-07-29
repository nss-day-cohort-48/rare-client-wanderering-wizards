import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"

export const CategoryList = () => {
    const {categories, getCategories, deleteCategory} = useContext(CategoryContext)
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState()
    const history = useHistory()

    const alphabeticalCategories = categories.sort((category1, category2) => category1.label.localeCompare(category2.label))

    useEffect(() => {
        getCategories()
    }, [])

    const renderDeleteButton = (categoryId) => {
        return (
            <button onClick={() => {     
                setSelectedCategory(categoryId)
                setDeleteButtonPressed(true)
            }}>DELETE</button>
        )
    }

    const deletePopup = () => {
        return (
            <div>
                <div>Are you sure you want to delete this category?</div>
                <button onClick={
                    ()=>{
                        deleteCategory(selectedCategory).then(()=>{history.push("/categories")})
                        setDeleteButtonPressed(false)
                    }}>confirm</button><button onClick={
                        ()=>{setDeleteButtonPressed(false)}
                        }>cancel</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Categories</h1>
            {deleteButtonPressed ? deletePopup() : ""}
            {
                alphabeticalCategories.map(category => {
                    return (
                        <div>{renderDeleteButton(category.id)} {category.label}</div>
                    )
                })
            }
        </div>
    )
}