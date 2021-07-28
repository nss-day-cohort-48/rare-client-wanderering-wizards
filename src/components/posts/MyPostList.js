import React, { useContext, useEffect} from "react"
import { PostContext } from "./PostProvider"
import "./post.css"
import { Link, useHistory } from "react-router-dom"


export const MyPostList = props => {
    const {posts, getPostsByUserId} = useContext(PostContext)
    const currentUserId = parseInt(localStorage.getItem("rare_user_id"))
    const history = useHistory();

    useEffect(() => {
        getPostsByUserId(currentUserId)
    }, [])

    return (
        <>
        <button
        className="create__button"
        onClick={() => history.push("/Posts/create")}
        >
        Create Post?
      </button>
        <div>
            <h1>My Posts</h1>
            {
                posts.map(post => {
                    return (
                        <>
                        <article className="flex">
                        <div>{post.title}</div>

                        <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        <div>{post.category.label}</div>
                        <div>{post.user.first_name} {post.user.last_name}</div>
                        </article>
                        </>
                    )
                })
            }
        </div>
        </>
    )
}




