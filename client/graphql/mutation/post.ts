import { graphql } from "@gql";

export const createPostMutation = graphql(`
  #graphql
  mutation CreatePost($payload: PostData!) {
    createPost(payload: $payload) {
      id
    }
  }
`);

export const LikePostMutation = `#graphql
mutation Mutation($postId: String!) {
  likePost(postId: $postId)
}
`;

export const UnLikePostMutation = `#graphql
mutation Mutation($postId: String!) {
  unlikePost(postId: $postId)
}
`;

export const BookmarkPostMutation = `#graphql
mutation Mutation($postId: String!) {
  bookmarkPost(postId: $postId)
}
`;

export const UnBookmarkPostMutation = `#graphql
mutation Mutation($postId: String!) {
  unbookmarkPost(postId: $postId)
}
`;
