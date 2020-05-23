const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

// Graphql server can be found at localhost:4000/graphql
// JSON server can be found at localhost:3000
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});