import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const PostContext = createContext()

// This component establishes what data can be used.
export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPostsByUserId = (userId) => {
        return fetch(`http://localhost:8088/posts?user=${userId}`)
        .then(res => res.json())
        .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, setPosts, getPostsByUserId
        }}>
            {props.children}
        </PostContext.Provider>
    )
}