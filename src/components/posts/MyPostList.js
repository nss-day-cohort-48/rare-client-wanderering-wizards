import React, { useContext, useEffect} from "react"
import { PostContext } from "./PostProvider"

export const MyPostList = props => {
    const {posts, getPostsByUserId} = useContext(PostContext)
    const currentUserId = parseInt(localStorage.getItem("rare_user_id"))

 

    useEffect(() => {
        getPostsByUserId(currentUserId)
    }, [])

    return (
        <div>
            <h1>My Posts</h1>
            {
                posts.map(post => {
                    return (
                        <>
                        <div>{post.title}</div>
                        <div>{post.category.label}</div>
                        <div>{post.user.first_name} {post.user.last_name}</div>
                        </>
                    )
                })
            }
        </div>
    )
}




