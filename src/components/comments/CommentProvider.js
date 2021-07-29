import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const CommentContext = createContext()

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([])

    const getComments = () => {
        return fetch(`http://localhost:8088/comments`)
        .then(response => response.json())
        .then(setComments)
    }

    const getCommentsByPostId = (postId) => {
        return fetch(`http://localhost:8088/comments/${postId}`)
        .then(response => response.json())
        .then(setComments)
    }

    const createComment = commentObject => {
        return fetch("http://localhost:8088/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentObject)
        })
        .then(getCommentsByPostId)
    }
    
    return (
        <CommentContext.Provider value={{
            comments, getCommentsByPostId, getComments, createComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}