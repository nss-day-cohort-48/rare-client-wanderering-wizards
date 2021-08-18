import React, { useContext, useEffect, useState} from "react"
import { useHistory, useParams } from "react-router-dom"
import { AuthorContext } from "./AuthorProvider"

export const AuthorDetail = () => {
  const {getAuthorDetails, author} = useContext(AuthorContext)

  const {authorId} = useParams()
  // const history = useHistory()


    useEffect(() => {
        getAuthorDetails(authorId)
    }, [])

  return (
    <>
    <div>
      <h1>{author.bio}</h1>
      <div>Name: {author.user?.first_name} {author.user?.last_name}</div>
      <img src={author.profile_image_url} alt="ProfilePic"/>
      <div>Username: {author.user?.username}</div>
      <div>Email: {author.user?.email}</div>
      <div>Created On: {author.created_on}</div>
      <div>Profile Type: {
          author.user?.is_staff ? "Admin": "Author"
        }
        </div>
    </div>
    </>
  )
}