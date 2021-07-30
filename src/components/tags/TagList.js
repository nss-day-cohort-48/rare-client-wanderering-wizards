import React, { useContext, useEffect, useState} from "react"
import { useHistory } from "react-router-dom"
import { TagContext } from "./TagProvider"
import gear from "../../images/gear.png"
import trash from "../../images/trash.png"
import "../../components/tags/Tags.css"

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
            }}>
                <img className={"icon"} src={trash} alt="" />
            </button>
        )
    }
    
    const renderUpdateButton = (tagObj) => {
        return (
            <button onClick={() => {     
                setSelectedTag(tagObj)
                setUpdateButtonPressed(true)
            }}>
                <img className={"icon"} src={gear} alt="" />
            </button>
        )
    }

    const deletePopup = () => {
        return (
            <div className={"controls_wrapper"}>
                <div className={"controls_text controls_item"}>Are you sure you want to delete this tag?</div>
                <div className={"controls_item"}>
                <button className={"controls_button"} onClick={
                    ()=>{
                        deleteTag(selectedTag).then(()=>{history.push("/tags")})
                        setDeleteButtonPressed(false)
                    }}>Ok</button><button className={"controls_button"} onClick={
                        ()=>{setDeleteButtonPressed(false)}
                        }>Cancel</button>
                </div>
            </div>
        )
    }

    const updatePopup = () => {
        return (
            <div className={"controls_wrapper"}>
                <div className={"controls_text controls_item"}>Edit this tag</div>
                <div className={"controls_item"}>
                    <input onKeyUp={HandleUserInput} defaultValue={selectedTag.label}></input>
                </div>
                <div className={"controls_item"}>
                    <button className={"controls_button"} onClick={
                    ()=>{
                        const updated_tag = {
                            id: selectedTag.id,
                            label: userInput
                        }
                        updateTag(updated_tag).then(()=>{history.push("/tags")})
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