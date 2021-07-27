import React, { useContext, useRef, useEffect, useState, useParams } from "react"
import { CategoryContext } from "./CategoryProvider"
import { useHistory } from "react-router-dom"

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
    })

    return (
        <form>
            <h2>Create a new category</h2>
            <fieldset>
                <div>
                    <input type="text" id="label" name="label" required autoFocus placeholder="add text"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div>
                <button disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveCategory()
                    setCategory("")
                }}>Create Category</button>
            </div>
        </form>
    )
}