import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { CategoryContext } from "./CategoryProvider"
import gear from "../../images/gear.png"
import trash from "../../images/trash.png"

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
            }}>
                <img className={"icon"} src={trash} alt="" />
            </button>
        )
    }

    const renderUpdateButton = (categoryObj) => {
        return (
            <button onClick={() => {     
                setSelectedCategory(categoryObj)
                setUpdateButtonPressed(true)
            }}>
                <img className={"icon"} src={gear} alt="" />
            </button>
        )
    }

    const deletePopup = () => {
        return (
            <div className={"controls_wrapper"}>
                <div className={"controls_text controls_item"}>Are you sure you want to delete this category?</div>
                <div className={"controls_item"}>
                <button className={"controls_button"} onClick={
                    ()=>{
                        deleteCategory(selectedCategory).then(()=>{history.push("/categories")})
                        setDeleteButtonPressed(false)
                    }}>confirm</button><button className={"controls_button"} onClick={
                        ()=>{setDeleteButtonPressed(false)}
                        }>cancel</button>
                </div>
            </div>
        )
    }

    const updatePopup = () => {
        return (
            <div className={"controls_wrapper"}>         
                <div className={"controls_text controls_item"}>Edit this category</div>
                <div className={"controls_item"}>
                    <input onKeyUp={HandleUserInput} defaultValue={selectedCategory.label}></input>
                </div>
                <div className={"controls_item"}>
                    <button className={"controls_button"} onClick={
                        ()=>{
                            const updated_category = {
                                id: selectedCategory.id,
                                label: userInput
                            }
                            updateCategory(updated_category).then(()=>{history.push("/categories")})
                            setUpdateButtonPressed(false)
                        }}>Ok</button><button className={"controls_button"} onClick={
                            ()=>{setUpdateButtonPressed(false)}
                            }>Cancel</button>
                </div>
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