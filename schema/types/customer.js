const db = require('../../db/db.json')

/**
 * Customer type
 */
const graphql = require('graphql');
const axios = require('axios');
/** Import object types from GraphQL */
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = graphql;

const Customer = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    active: { type: GraphQLInt },
    account_manager_id: { type: GraphQLInt },
    reason_for_joining: { type: GraphQLString },
    created_date: { type: GraphQLString },
    accounts: {
        type: new GraphQLList(require('./account')),
        resolve: (parent) => {
          const accounts = db.accounts.filter(
            ({ customer_id }) => parent.id === customer_id
          )

          return accounts
        }
    }
  })
});
module.exports = Customer;