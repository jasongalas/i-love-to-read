import { gql } from '@apollo/client';

export const GET_ME = gql`
query GetUser($userId: ID!) {
    getUser(_id: $userId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;