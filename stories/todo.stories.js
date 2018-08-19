import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import AddTodo from '../client/components/AddTodo';
import { setupGraphiQL } from '@storybook/addon-graphql'

const graphiql = setupGraphiQL({ url: 'http://localhost:3000/graphql' });

storiesOf('AddTodo', module).add('Form', () => <AddTodo/>);
