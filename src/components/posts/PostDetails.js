import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"

export const PostDetails = () => {
    const {post, getPostsDetails, deletePost} = useContext(PostContext)
    const userId = parseInt(localStorage.getItem("rare_user_id"))
    const {postId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getPostsDetails(postId)
    }, [])

    const renderDeleteButton = () => {
        return (
            <button onClick = {() => {
                deletePost(postId).then(()=>{history.push("/myposts")})      
            }}            
            >DELETE POST</button>
        )
    }

    return (
        <div>
            <h1>Post Details</h1>     
                <>
                <div>{post.title}</div>
                <div>{post.publication_date}</div>
                <img src={post.image_url}></img>
                <div>{post.content}</div>
                <div>Category: {post.category?.label}</div>
                <div>Author: {post.user?.first_name} {post.user?.last_name}</div>
                {userId === post.user_id ? renderDeleteButton() : ""}
                </>
        </div>
    )
}




