import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagProvider"

export const TagList = () => {
    const {tags, getTags, deleteTag} = useContext(TagContext)
    const [deleteButtonPressed, setDeleteButtonPressed] = useState(false)
    const [selectedTag, setSelectedTag] = useState()
    const history = useHistory()

    useEffect(() => {
        getTags()
    }, [])

    const renderDeleteButton = (tagId) => {
        return (
            <button onClick={() => {     
                setSelectedTag(tagId)
                setDeleteButtonPressed(true)
            }}>DELETE</button>
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
                    }}>confirm</button><button onClick={
                        ()=>{setDeleteButtonPressed(false)}
                        }>cancel</button>
            </div>
        )
    }

    return (
        <div>
            <h1>tags</h1>
            {deleteButtonPressed ? deletePopup() : ""}
            {
                tags.map(tag => {
                    return (
                        <div>{renderDeleteButton(tag.id)} {tag.label}</div>
                    )
                })
            }
        </div>
    )
}