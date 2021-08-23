import React, { useContext, useEffect, useState} from "react"
import { useHistory, Link } from "react-router-dom"
import { AuthorContext } from "./AuthorProvider"

export const AuthorList = () => {
  const {getAuthors, authors} = useContext(AuthorContext)
  const alphabeticalAuthors = authors.sort((author1, author2) => author1.user.username.localeCompare(author2.user.username))


  useEffect(() => {
    getAuthors()
}, [])

  return (
    <>
			<div>
				{alphabeticalAuthors.map((author) => {
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
					);
				})}
			</div>
      </>
  )
}

// <article className="flex">
// 								<Link to={`/authors/${author.id}`}>{author.user.username}</Link>
// 								<div>
// 									Author: {author.user.first_name} {author.user.last_name}
// 								</div>
//                 <img src={author.profile_image_url}/>
// 								<div>Username: {author.user.username}</div>
// 								<div>Admin Status: {author.user.is_staff ? "Admin" : "Author"}</div>
// 							</article>