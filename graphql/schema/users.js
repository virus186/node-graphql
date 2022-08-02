const { gql } = require('apollo-server');
const typeDefs = `
type User {
    name: String
    email: String
    password: String
    company_name: String
    address: String
    offers: String
    active: Boolean
    role: String
    token: String
    createdAt: String
    createdBy: String
}

input RegisterUserInput {
    name: String
    email: String
    password: String
}

input LoginUserInput {
    email: String
    password: String
}

type Query {
    getUser( email: String!): User
    getUserById( id: ID!): User
    getUsers: [User]
}

type Mutation {
    registerUser(registerUserInput: RegisterUserInput): User
    loginUser(loginUserInput: LoginUserInput): User
}
`

module.exports = typeDefs