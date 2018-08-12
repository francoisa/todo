import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
const schema  = require('./graphql/todolistSchema').TodoSchema;
const ObjectDao = require('./todolistObjectDao').ObjectDao;

const GRAPHQL_PORT = 8080;

const handleNonRoot = function(req, res, next) {
  if (req && req.path === '/favicon.ico') {
    res.sendFile(path.resolve(__dirname, '../../public', 'favicon.ico'));
  }
  else if (next) {
    next();
  }
}

// Expose a GraphQL endpoint
const graphQLServer = express();
const dao = new ObjectDao();
import sessionMiddleware from './sessionMiddleware';
graphQLServer.use(sessionMiddleware);
graphQLServer.use('/', handleNonRoot, graphQLHTTP(({ session, tokenData }) => (
  {
    context: dao,
    graphiql: true,
    pretty: true,
    rootValue: { session, tokenData },
    schema: schema
  }))
);

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `server:GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
