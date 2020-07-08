const db = require('../../db/db.json')

/**
 * Account type
 */
const graphql = require('graphql');
const axios = require('axios');
/** Import object types from GraphQL */
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } = graphql;

const Account = new GraphQLObjectType({
  name: 'Account',
  fields: () => ({
    id: { type: GraphQLString },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    solar_farm_id: { type: GraphQLInt },
    capacity_share: { type: GraphQLFloat },
    created_date: { type: GraphQLString },
    customer_id: { type: GraphQLInt },
    customers: {
      type: new GraphQLList(require('./customer')),
      resolve: (parent) => {
        const customers = db.customers.filter(
          ({ id }) => parent.customer_id === id
        )

        return customers
      }
    }
  })
});

module.exports = Account;