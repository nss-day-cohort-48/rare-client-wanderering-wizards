import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { AuthorContext } from "./AuthorProvider"
import { PostContext } from "../posts/PostProvider.js";
import "./Author.css";

export const AuthorDetail = () => {
  const {getAuthorDetails, author} = useContext(AuthorContext)
  const { getPosts, posts } = useContext(PostContext)
  const [authorPosts, setAuthorPosts] = useState([])
  const {authorId} = useParams()
 
    useEffect(() => {
        getAuthorDetails(authorId)
        getPosts()
    }, [])

    useEffect(() => {
        setAuthorPosts(posts.filter(post=>post.user.author.id === author.id))
    }, [posts])

  return (
    <>
    <div className="authorParent">
    <div className="flexAuthor">
      <img src={author.profile_image_url} alt="ProfilePic" className="authorImage"/>
        {/* <h1>{author.bio}</h1> */}
        <div className="authorInfo">
          <strong>{author.user?.first_name} {author.user?.last_name}</strong>
          <div><strong>@</strong>{author.user?.username}</div>
          <div>{author.user?.email}</div>
          <div>Member Since: <br></br> {author.created_on}</div>
          <div>Profile Type: <br></br> {
              author.user?.is_staff ? "Admin": "Author"
            }
          </div>
<<<<<<< HEAD
          <Link to={`/userPosts/${author.id}`} className="totalPostsLink">{authorPosts.length} Total Posts</Link>
=======
          {/* <Link to={"/myposts"} className="totalPostsLink">{authorTotalPosts} Total Posts</Link> */}
>>>>>>> main
        </div>
    </div>
    </div>
    <div className="flexAuthorBio">
    <div>{author.bio}</div>
    </div>
    </>
  )
}