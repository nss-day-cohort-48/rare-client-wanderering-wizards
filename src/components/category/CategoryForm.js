import React, { useContext, useRef, useEffect, useState, useParams } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory } from "react-router-dom"
import "../posts/post.css"
export const CategoryForm = () => {
    const {addCategory} = useContext(CategoryContext)

    const [ category, setCategory ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newCategory = { ...category }
        newCategory[event.target.id] = event.target.value
        setCategory(newCategory)
    }

    const handleSaveCategory = () => {
        setIsLoading(true)
        addCategory({
            label: category.label
        })
        .then(() => history.push("/categories"))
        
    }

    useEffect(() => {
        setIsLoading(false)
    }, [category])

    return (
        <form className="postFormContainer">
            <div className="postFormBox">
            <fieldset className="postFormSet">
                <div>
                    <input className="postFormField" type="text" id="label" name="label" required autoFocus placeholder="Type Category Here"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div>
                <button 
                className="postSubmitButton"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveCategory()
                    setCategory("")
                }}>Create Category</button>
            </div>
            </div>
        </form>
    )
}