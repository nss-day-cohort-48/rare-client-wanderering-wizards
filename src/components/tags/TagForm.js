import React, { useContext, useRef, useEffect, useState, useParams } from "react"
import { TagContext } from "./TagProvider"
import { useHistory } from "react-router-dom"

export const TagForm = () => {
    const {addTag} = useContext(TagContext)

    const [ tag, setTag ] = useState({})
    const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag }
        newTag[event.target.id] = event.target.value
        setTag(newTag)
    }

    const handleSaveTag = () => {
        setIsLoading(true)
        addTag({
            label: tag.label
        })
        .then(() => history.push("/tags"))
        
    }

    useEffect(() => {
        setIsLoading(false)
    }, [])

    return (
        <form>
            <h2>Create a new tag</h2>
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
                    handleSaveTag()
                    setTag({})
                }}>Create Tag</button>
            </div>
        </form>
    )
}