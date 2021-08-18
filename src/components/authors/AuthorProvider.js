import React, { useState, createContext } from "react"

export const AuthorContext = createContext();

export const AuthorProvider = (props) => {
	const [authors, setAuthors] = useState([]);
	const [author, setAuthor] = useState({});

  const getAuthors = () => {
		return fetch(`http://localhost:8000/authors`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
			.then((response) => response.json())
			.then(setAuthors);
	};

	const getAuthorDetails = (authorId) => {
		return (
			fetch(`http://localhost:8000/authors/${authorId}`,
			{
				headers: {
					Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
				},
			}		
		)).then((res) => res.json())
		.then(setAuthor)
	};

  return (
		<AuthorContext.Provider
			value={{authors, getAuthors, author, getAuthorDetails
			}}
		>
			{props.children}
		</AuthorContext.Provider>
	);
};
