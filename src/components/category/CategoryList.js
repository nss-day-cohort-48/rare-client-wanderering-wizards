import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"

export const CategoryList = () => {
    const {categories, getCategories, deleteCategory, updateCategory} = useContext(CategoryContext)
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [updateButtonPressed, setUpdateButtonPressed] = useState(false)
    const [userInput, setUserInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState()
    const history = useHistory()
    const alphabeticalCategories = categories.sort((category1, category2) => category1.label.localeCompare(category2.label))

    useEffect(() => {
        getCategories()
    }, [])

    const HandleUserInput = (event) => {
        setUserInput(event.target.value);
      };

    const renderDeleteButton = (categoryId) => {
        return (
            <button onClick={() => {     
                setSelectedCategory(categoryId)
                setDeleteButtonPressed(true)
            }}>DELETE</button>
        )
    }

    const renderUpdateButton = (categoryObj) => {
        return (
            <button onClick={() => {     
                setSelectedCategory(categoryObj)
                setUpdateButtonPressed(true)
            }}>UPDATE</button>
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

    const updatePopup = () => {
        return (
            <div>
                <div>Edit this category</div>
                <input onKeyUp={HandleUserInput} defaultValue={selectedCategory.label}></input>
                <button onClick={
                    ()=>{
                        const updated_category = {
                            id: selectedCategory.id,
                            label: userInput
                        }
                        updateCategory(updated_category).then(()=>{history.push("/tags")})
                        setUpdateButtonPressed(false)
                    }}>Ok</button><button onClick={
                        ()=>{setUpdateButtonPressed(false)}
                        }>Cancel</button>
            </div>
        )
    }

    return (
        <div>
            <h1>Categories</h1>
            {deleteButtonPressed ? deletePopup() : ""}
            {updateButtonPressed ? updatePopup() : ""}
            {
                alphabeticalCategories.map(category => {
                    return (
                        <div>{renderUpdateButton(category)} {renderDeleteButton(category.id)} {category.label}</div>
                    )
                })
            }
        </div>
    )
}