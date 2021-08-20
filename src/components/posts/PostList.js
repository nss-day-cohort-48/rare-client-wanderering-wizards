import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";

export const PostList = (props) => {
	const { posts, getPosts, managePostApproval } = useContext(PostContext);
	const isAdmin = JSON.parse(localStorage.getItem("rare_admin"));

	// console.log(posts);

	const approvedPosts = posts.filter((post) => post.approved > 0);
	const sortedPosts = approvedPosts.sort(
		(post1, post2) =>
			Date.parse(post2.publication_date) - Date.parse(post1.publication_date)
	);
	const now = new Date();
	// const filteredPostsByDate = sortedPosts.filter(
	//   (post) => Date.parse(post.publication_date) <= now
	// );
	const history = useHistory();

	useEffect(() => {
		getPosts();
	}, []);

	const manageApproval = (post) => {
		if (post.approved) {
			const updatedPost = {
				id: post.id,
				approved: 0,
			};
			managePostApproval(updatedPost);
		} else {
			const updatedPost = {
				id: post.id,
				approved: 1,
			};
			managePostApproval(updatedPost);
		}
	};

	const handleUpdatePost = (post_id) => {
		history.push(`/posts/edit/${post_id}`);
	};

	return (
		<>
			<div className="plContainer">
				<div className="plLeft">
					{posts.map((post) => {
						return (
							<>
								{isAdmin ? (
									<article className="flex">
										<div className="postLeft">
											<div className="postAuthorDiv">
												<img
													className="postPI"
													src={post.user.author?.profile_image_url}
												/>
												<strong>
													{post.user.first_name} {post.user.last_name}
												</strong>
												<p style={{ margin: "0 3px 0 3px" }}>in</p>
												<strong>{post.category.label}</strong>
											</div>
											<strong>
												<Link className="postTitle" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
											</strong>
											<div>{post.content.slice(0, 50).trim()}...</div>
											<div className="postDateTag">
												<div className="postPubDate">
													{post.publication_date}
												</div>
												<span style={{ paddingRight: "8px" }}>•</span>
												{post.tags?.slice(0, 2).map((tag) => {
													return (
														<>
															<div className="postTag">{tag.label}</div>
														</>
													);
												})}
												<label style={{marginLeft: "auto"}} for="approval">Approved </label>
												<input
													type="checkbox"
													id={`approval-${post.id}`}
													name="approval"
													defaultChecked={post.approved ? "true" : ""}
													onChange={() => {
														manageApproval(post);
													}}
												/>
											</div>
										</div>
										<div className="postRight">
											<img className="postImage" src={post.image_url} />
										</div>
									</article>
								) : post.approved ? (
									<article className="flex">
										<div className="postLeft">
											<div className="postAuthorDiv">
												<img
													className="postPI"
													src={post.user.author?.profile_image_url}
												/>
												<strong>
													{post.user.first_name} {post.user.last_name}
												</strong>
												<p style={{ margin: "0 3px 0 3px" }}>in</p>
												<strong>{post.category.label}</strong>
											</div>
											<strong>
												<Link className="postTitle" to={`/posts/${post.id}`}>
													{post.title}
												</Link>
											</strong>
											<div>{post.content.slice(0, 50).trim()}...</div>
											<div className="postDateTag">
												<div className="postPubDate">
													{post.publication_date}
												</div>
												<span style={{ paddingRight: "8px" }}>•</span>
												{post.tags?.slice(0, 2).map((tag) => {
													return (
														<>
															<div className="postTag">{tag.label}</div>
														</>
													);
												})}
											</div>
										</div>
										<div className="postRight">
											<img className="postImage" src={post.image_url} />
										</div>
									</article>
								) : (
									""
								)}
							</>
						);
					})}
				</div>
				<div className="plMiddle"></div>
				<div className="plRight"></div>
			</div>
		</>
	);
};
