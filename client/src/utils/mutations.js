import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const CREATE_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const DELETE_BOOK = gql`
mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      _id
      authors
      description
      bookId
      title
      image
      link
    }
  }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($book: NewBook!) {
  saveBook(book: $book) {
    _id
    username
    email
    bookCount
    savedBooks {
      _id
      authors
      description
      bookId
      title
      image
      link
    }
  }
}
`;