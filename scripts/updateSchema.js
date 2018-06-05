import fs from 'fs';
import path from 'path';
import { TodoSchema } from '../server/todolistSchema';
import { printSchema } from 'graphql';

const schemaPath = path.resolve(__dirname, '../schema.graphql');

fs.writeFileSync(schemaPath, printSchema(TodoSchema));

console.log('Wrote ' + schemaPath);
