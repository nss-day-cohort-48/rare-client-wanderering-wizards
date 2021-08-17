import React, { useState, createContext } from "react"

export const AuthorContext = createContext();

export const AuthorProvider = (props) => {
	const [authors, setAuthors] = useState([]);

  const getAuthors = () => {
		return fetch(`http://localhost:8000/authors`, {
			headers: {
				Authorization: `Token ${localStorage.getItem("rare_user_id")}`,
			},
		})
			.then((response) => response.json())
			.then(setAuthors);
	};

  return (
		<AuthorContext.Provider
			value={{authors, getAuthors
			}}
		>
			{props.children}
		</AuthorContext.Provider>
	);
};
