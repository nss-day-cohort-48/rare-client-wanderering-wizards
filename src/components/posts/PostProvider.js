import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const PostContext = createContext()

// This component establishes what data can be used.
export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({})

    const getPostsByUserId = (userId) => {
        return fetch(`http://localhost:8088/posts?user=${userId}`)
        .then(res => res.json())
        .then(setPosts)
    }
    const getPostsDetails = (postId) => {
        return fetch(`http://localhost:8088/posts/${postId}`)
        .then(res => res.json())
        .then(setPost)
    }

    const getPosts = () => {
        return fetch(`http://localhost:8088/posts`)
        .then(res => res.json())
        .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, setPosts, post, setPost, getPostsByUserId, getPostsDetails, getPosts
        }}>
            {props.children}
        </PostContext.Provider>
    )
}