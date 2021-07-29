import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagProvider"

export const TagList = () => {
    const {tags, getTags, deleteTag, updateTag} = useContext(TagContext)
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [updateButtonPressed, setUpdateButtonPressed] = useState(false)
    const [userInput, setUserInput] = useState("");
    const [selectedTag, setSelectedTag] = useState()
    const history = useHistory()

    const alphabeticalTags = tags.sort((tag1, tag2) => tag1.label.localeCompare(tag2.label))

    useEffect(() => {
        getTags()
    }, [])

    const HandleUserInput = (event) => {
        setUserInput(event.target.value);
      };

    const renderDeleteButton = (tagId) => {
        return (
            <button onClick={() => {     
                setSelectedTag(tagId)
                setDeleteButtonPressed(true)
            }}>DELETE</button>
        )
    }
    
    const renderUpdateButton = (tagObj) => {
        return (
            <button onClick={() => {     
                setSelectedTag(tagObj)
                setUpdateButtonPressed(true)
            }}>UPDATE</button>
        )
    }

    const deletePopup = () => {
        return (
            <div>
                <div>Are you sure you want to delete this tag?</div>
                <button onClick={
                    ()=>{
                        deleteTag(selectedTag).then(()=>{history.push("/tags")})
                        setDeleteButtonPressed(false)
                    }}>Ok</button><button onClick={
                        ()=>{setDeleteButtonPressed(false)}
                        }>Cancel</button>
            </div>
        )
    }

    const updatePopup = () => {
        return (
            <div>
                <div>Edit this tag</div>
                <input onKeyUp={HandleUserInput} defaultValue={selectedTag.label}></input>
                <button onClick={
                    ()=>{
                        const updated_tag = {
                            id: selectedTag.id,
                            label: userInput
                        }
                        updateTag(updated_tag).then(()=>{history.push("/tags")})
                        setUpdateButtonPressed(false)
                    }}>Ok</button><button onClick={
                        ()=>{setUpdateButtonPressed(false)}
                        }>Cancel</button>
            </div>
        )
    }

    return (
        <div>
            <h1>tags</h1>
            {deleteButtonPressed ? deletePopup() : ""}
            {updateButtonPressed ? updatePopup() : ""}
            {
                alphabeticalTags.map(tag => {
                    return (
                        <div>{renderUpdateButton(tag)} {renderDeleteButton(tag.id)} {tag.label}</div>
                    )
                })
            }
        </div>
    )
}