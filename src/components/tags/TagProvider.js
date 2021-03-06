import React, {useState} from "react"

export const TagContext = React.createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])

    const getTags = () => {
        return fetch("http://localhost:8000/tags",
        {
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            },
        })
            .then(res => res.json())
            .then(setTags)
    }

    const addTag = Tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Tag)
        })
            .then(getTags)
    }

    const deleteTag = (tagId) => {
        return fetch(`http://localhost:8000/tags/${tagId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${localStorage.getItem("rare_user_id")}`
            }
        }).then(getTags)
    }

    const updateTag = (tagObj) => {
        return fetch(`http://localhost:8000/tags/${tagObj.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(tagObj)
        })
          .then(getTags)
      }

    return (
        <TagContext.Provider value={{
            tags, addTag, getTags, deleteTag, updateTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}