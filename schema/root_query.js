const graphql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLList } = graphql;

/** Data Types */
const customer = require('./types/customer');
const account = require('./types/account');

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    customers: {
      type: new GraphQLList(customer),
      resolve(parentValue, args) {
       return axios
         .get(`http://localhost:3004/customers`)
         .then(response => response.data);
      }
    },
    accounts: {
      type: new GraphQLList(account),
      resolve(parentValue, args) {
       return axios
         .get(`http://localhost:3004/accounts`)
         .then(response => response.data);
       }
    }
  })
});
module.exports = rootQuery;