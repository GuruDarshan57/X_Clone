export const types = `#graphql
  input PostData{
    content:String!
    imageUrl:String
  }
  type Post{
    id:ID!
    content:String!
    imageUrl:String
    author:User!
    likes:[User]
    bookmarks:[User]
    comments:[Comment]
  }
  type Comment{
    post:Post
    author:User
    comment:String
  }
`;
