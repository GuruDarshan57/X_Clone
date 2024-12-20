import { graphql } from "@gql";

export const FollowUserMutation = `#graphql
mutation Mutation($to: String!) {
  followUser(to: $to)
}`;

export const UnFollowUserMutation = `#graphql
mutation Mutation($to: String!) {
  unFollowUser(to: $to)
}`;
