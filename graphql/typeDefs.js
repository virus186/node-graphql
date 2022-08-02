const { gql } = require('apollo-server');
const usertypeDefs = require('./schema/users');

let typeDefs = usertypeDefs

module.exports = typeDefs