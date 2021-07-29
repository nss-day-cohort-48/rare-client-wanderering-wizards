import React, { useContext, useEffect } from "react"
import { PostContext } from "./PostProvider"
import { useHistory, useParams } from "react-router-dom"
import { CommentContext } from "../comments/CommentProvider"

export const PostDetails = () => {
    const {post, getPostsDetails, deletePost} = useContext(PostContext)
    const { comments, getCommentsByPostId, createComment } = useContext(CommentContext)

    const userId = parseInt(localStorage.getItem("rare_user_id"))

    const {postId} = useParams()
    const history = useHistory()

    const commentsByPost = comments.filter((postComments => post.id === postComments.post_id))

    useEffect(() => {
        getPostsDetails(postId).then(getCommentsByPostId(postId))
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
        <>
        <div>
            <h1>{post.title}</h1>     
                <div>{post.publication_date}</div>
                <img src={post.image_url}></img>
                <div>{post.content}</div>
                <div>Category: {post.category?.label}</div>
                <div>Author: {post.user?.first_name} {post.user?.last_name}</div>
                {userId === post.user_id ? renderDeleteButton() : ""}

                {commentsByPost.map((comments) => {
                    return (
                        <>
                        <div style={{
                            marginTop: "3rem",
                            marginBottom: "3rem"
                        }}>
                            {comments.content}
                            
                        </div>
                        </>
                    )
                })}
                <button onClick={() => {
                    history.push(`/posts/comment/${postId}`)
                }}>Comment</button>
        </div>
        </>
    )
}




