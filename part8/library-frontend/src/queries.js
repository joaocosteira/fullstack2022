import { gql  } from '@apollo/client'

export const ALL_BOOKS = gql`
    query AllBooks {
        allBooks {
            title
            author
            published
        }
    }
`

export const ALL_AUTHORS = gql`
    query AllAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const CREATE_BOOK = gql`
    mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(title: $title, author: $author, published: $published, genres: $genres) {
            title
            published
            author
            id
            genres
        }
    }
`

export const SET_BORN = gql`
    mutation EditAuthor($name: String!, $born: Int!) {
        editAuthor(name: $name, born: $born) {
            name
            id
            born
            bookCount
        }
    }
`

