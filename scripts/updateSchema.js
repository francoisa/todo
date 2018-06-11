import fs from 'fs';
import path from 'path';
import { TodoSchema } from '../server/graphql/todolistSchema';
import { printSchema } from 'graphql';

const schemaPath = path.resolve(__dirname, '../server/graphql/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(TodoSchema));

console.log('Wrote ' + schemaPath);
