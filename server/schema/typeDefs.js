const typeDefs = `
type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Int
    savedBooks: [Book]
}

type: Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type: Query {
    users: [User]
    user(username: String!): User
    bookcount()
    books(username: String): [Book]
}

type Mutation {
    createUser(username: String!, email! String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookInput!): User
    removeBook(bookId: String!): User
}
`;

module.exports = typeDefs;