const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
let authors = require('./data/authors')
let books = require('./data/books')

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!,
    born: Int,
    bookCount: Int
  }
  type Query {
    bookCount:Int!,
    authorCount:Int!,
    allBooks(author: String, genre: String):[Book!]!,
    allAuthors:[Author!]!
  }
  type Mutation {
    addBook(
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!,
    born: Int!
  ): Author
  }
`

const resolvers = {
  Query: {
    bookCount : () => books.length,
    authorCount: () => authors.length,
    allBooks: (root,args) => {

        let result = books

        result = args.author ? result.filter(b => b.author === args.author) : result
        result = args.genre ? result.filter(b => b.genres.includes(args.genre)) : result

        return result
    },
    allAuthors: () => authors
  },
  Mutation: {
    addBook : (root,args) => {

        if(!authors.find(a => a.name === args.author)){
            authors = authors.concat({ name : args.author , id: uuid() })
        }
        const book = { ...args, id: uuid() }
        books = books.concat(book)
        return book
    },
    editAuthor: (root,args) => {
        const author = authors.find(a => a.name === args.name)
        if(!author){
            return null
        }
        const updatedAuthor = {...author , born : args.born}
        authors = authors.map( a => a.name === updatedAuthor.name ? updatedAuthor : a)

        return updatedAuthor
    }
  },
  Author:{
    bookCount : (root) => books.filter(b => b.author === root.name).length
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})