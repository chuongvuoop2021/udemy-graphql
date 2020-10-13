const graphql = require('graphql')
const _ = require('lodash')

//Mock data
const userData = [
  {id: '1', name: 'Test 1', age: 1},
  {id: '2', name: 'Test 2', age: 2},
  {id: '3', name: 'Test 3', age: 3},
  {id: '4', name: 'Test 4', age: 4},
]

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql

//Create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLString} ,
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
})

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(userData, { id: args.id })
        //We resolve with data, get and return data from data source
      }
    }
  }
})

/*
  {
    user(id: "1") {
      name
    }
  }
*/

module.exports = new GraphQLSchema({
  query: RootQuery
})