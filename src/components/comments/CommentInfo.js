// import React, { useContext, useEffect, useState } from "react";
// import { CommentContext } from "./CommentProvider";

// export const CommentInfo = ({ postId }) => {
// 	const { getCommentsByPostId } = useContext(CommentContext);

// 	const [comments, setComments] = useState({});

// 	useEffect(() => {
// 		getCommentsByPostId(postId).then((res) => {
// 			setComments(res.comment);
// 		});
// 	}, []);

// 	return (
// 		<>
// 			<div className="potionIngredientDetailNames">{comments.first_name}</div>
// 		</>
// 	);
// };