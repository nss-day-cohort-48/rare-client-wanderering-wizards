import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { CommentContext } from "../comments/CommentProvider";

export const PostDetails = () => {
	const { post, getPostsDetails } = useContext(PostContext);

	const userId = parseInt(localStorage.getItem("rare_user_id"));
	console.log(userId)

	const { postId } = useParams();
	const history = useHistory();

	useEffect(() => {
		getPostsDetails(postId);
	}, []);



	return (
		<>
    <button onClick={() => {
      history.goBack([-1])
    }}>Back to All Posts</button>
			<div>
				<h1>{post.title}</h1>
				<div>{post.publication_date}</div>
				<img src={post.image_url}></img>
				<div>{post.content}</div>
				<div>Category: {post.category?.label}</div>
				<div>
        {/* <img src={post.user.author?.profile_image_url} />{" "}
											{post.user.first_name} {post.user.last_name} */}
				</div>
				{
                post.tags?.map(tag => {
                    return (
											<>
                        <div>Tag: {tag.label}</div>
											</>
												
                    )
                })
            }

				<button onClick={() => {
          history.push(`/posts/comments/${postId}`)
        }}>View Comments</button>
			</div>
		</>
	);
};

