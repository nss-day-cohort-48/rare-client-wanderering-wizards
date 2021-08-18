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
				<h1>Authors</h1>
				{alphabeticalAuthors.map((author) => {
					return (
						<>
							<article className="flex">
								<Link to={`/authors/${author.id}`}>{author.user.username}</Link>
								<div>
									Author: {author.user.first_name} {author.user.last_name}
								</div>
								<div>Username: {author.user.username}</div>
								<div>Admin Status: {author.user.is_staff ? "Admin" : "Author"}</div>
							</article>
						</>
					);
				})}
			</div>
      </>
  )
}