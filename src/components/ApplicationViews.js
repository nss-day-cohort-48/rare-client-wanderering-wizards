import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./category/CategoryProvider";
import { CategoryList } from "./category/CategoryList";
import { CategoryForm } from "./category/CategoryForm";
import { PostProvider } from "./posts/PostProvider";
import { MyPostList } from "./posts/MyPostList";
import { PostDetails } from "./posts/PostDetails";
import { PostEdit } from "./posts/PostEdit";
import { PostList } from "./posts/PostList";
import { PostForm } from "./posts/PostForm";
import { TagProvider } from "./tags/TagProvider";
import { TagList } from "./tags/TagList";
import { TagForm } from "./tags/TagForm";
import { CommentProvider } from "./comments/CommentProvider";
import { CommentForm } from "./comments/CommentForm";
import { AuthorProvider } from "./authors/AuthorProvider";
import { AuthorList } from "./authors/AuthorList.js";
import { AuthorDetail } from "./authors/AuthorDetail.js";
import { CommentEditForm } from "./comments/CommentEditForm";
import { AuthorPostList } from "./posts/AuthorPostList";

export const ApplicationViews = () => {
	return (
		<>
			<main
				style={{
					margin: "5rem 2rem",
					lineHeight: "1.75rem",
				}}
			></main>

			<PostProvider>
				<CategoryProvider>
					<CommentProvider>
						<TagProvider>
							<AuthorProvider>
								<Route exact path="/categories">
									<CategoryList />
								</Route>
								<Route exact path="/categories/create">
									<CategoryForm />
								</Route>
								<Route exact path="/myposts">
									<MyPostList />
								</Route>
								<Route exact path="/userPosts/:authorId(\d+)">
									<AuthorPostList />
								</Route>
								<Route exact path="/posts/create">
									<PostForm />
								</Route>
								<Route exact path="/posts/:postId(\d+)">
									<PostDetails />
								</Route>
								<Route exact path="/">
									<PostList />
								</Route>
								<Route exact path="/posts/edit/:postId(\d+)">
									<PostEdit />
								</Route>
								<Route exact path="/tags">
									<TagList />
								</Route>
								<Route exact path="/tags/create">
									<TagForm />
								</Route>
								<Route exact path="/posts/comments/:postId(\d+)">
									<CommentForm />
								</Route>
                <Route exact path="/comments/edit/:commentId(\d+)">
                  <CommentEditForm />
                </Route>

								<Route exact path="/authors">
									<AuthorList />
								</Route>
								<Route exact path="/authors/:authorId(\d+)">
									<AuthorDetail />
								</Route>
							</AuthorProvider>
						</TagProvider>
					</CommentProvider>
				</CategoryProvider>
			</PostProvider>
		</>
	);
};
