import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql/utilities';

import { TodoSchema } from '../server/graphql/todolistSchema';

const schemaPath = path.resolve(__dirname, '../server/graphql/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(TodoSchema));

console.log('Wrote ' + schemaPath);
