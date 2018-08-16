import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import AddTodo from '../client/components/AddTodo';

storiesOf('AddTodo', module).add('Form', () => <AddTodo/>);
