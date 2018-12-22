var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    me: Me
  }
  type Me {
    name: String
    birthday: String
    country: String
    email: String
    job: String
  }
`);

class Me {
    constructor(name, birthday, country, email, job) {
        this.name = name;
        this.birthday = birthday;
        this.country = country;
        this.email = email;
        this.job = job;
    }
};

// The root provides a resolver function for each API endpoint
var root = {
    me: () => {
        return new Me(
            "chihiro",
            "1996/03/28",
            "Kanagawa, Japan",
            "mail@alicemacs.com",
            "Security Engineer"
        );
    }
};

var app = express();
app.use('/graphql', graphqlHTTP(
    {
        schema: schema,
        rootValue: root,
        graphiql: true,
    },
));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
