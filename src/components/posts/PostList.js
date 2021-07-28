import React, { useContext, useEffect} from "react"
import { PostContext } from "./PostProvider"

export const PostList = props => {
    const {posts, getPosts} = useContext(PostContext)
    const approvedPosts = posts.filter(post => post.approved > 0)
    const sortedPosts = approvedPosts.sort((post1, post2) => (Date.parse(post2.publication_date) - Date.parse(post1.publication_date)))
    const now = new Date()
    const filteredPostsByDate = sortedPosts.filter(post => Date.parse(post.publication_date) < now)


    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            <h1>My Posts</h1>
            {
                filteredPostsByDate.map(post => {
                    return (
                        <>
                        <div>Title: {post.title}</div>
                        <div>Author: {post.user.first_name} {post.user.last_name}</div>
                        <div>Category: {post.category.label}</div>
                        </>
                    )
                })
            }
        </div>
    )
}