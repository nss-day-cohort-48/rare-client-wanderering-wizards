import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams, Link } from "react-router-dom"
import { AuthorContext } from "./AuthorProvider"
import { PostContext } from "../posts/PostProvider.js";
import "./Author.css";

export const AuthorDetail = () => {
  const {getAuthorDetails, author} = useContext(AuthorContext)
  const { getPostsByUserId, posts } = useContext(PostContext)

  const {authorId} = useParams()
  // const history = useHistory()


    useEffect(() => {
        getAuthorDetails(authorId).then(getPostsByUserId())
    }, [])

    const authorTotalPosts = posts.length

  return (
    <>
    <div className="authorParent">
    <div className="flexAuthor">
      <img src={author.profile_image_url} alt="ProfilePic" className="authorImage"/>
        {/* <h1>{author.bio}</h1> */}
        <div className="authorInfo">
          {/* <div>Name: {author.user?.first_name} {author.user?.last_name}</div> */}

          <div><strong>{author.user?.username}</strong></div>
          <div>{author.user?.email}</div>
          <div>Member Since: <br></br> {author.created_on}</div>
          <div>Profile Type: <br></br> {
              author.user?.is_staff ? "Admin": "Author"
            }
          </div>
          {/* <Link to={"/myposts"} className="totalPostsLink">{authorTotalPosts} Total Posts</Link> */}
        </div>
    </div>
    </div>
    <div className="flexAuthorBio">
    <div>{author.bio}</div>
    </div>
    </>
  )
}