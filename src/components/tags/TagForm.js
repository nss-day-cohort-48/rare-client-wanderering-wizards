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
    }, [tag])

    return (
        <form className="postFormContainer">
            <div className="postFormBox">
            <fieldset className="postFormSet">
                <div>
                    <input className="postFormField" type="text" id="label" name="label" required autoFocus placeholder="Type Tag Here"
                    onChange={handleControlledInputChange}/>
                </div>
            </fieldset>
            <div>
                <button 
                className="postSubmitButton"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault()
                    handleSaveTag()
                    setTag({})
                }}>Create Tag</button>
            </div>
            </div>
        </form>
    )
}