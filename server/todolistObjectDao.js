var listItems = {
  '1': { id: '1', text: 'mill flour', status: 'open'},
  '2': { id: '2', text: 'buy milk', status: 'working'},
  '3': { id: '3', text: 'do taxes', status: 'blocked'},
  '4': { id: '4', text: 'clean bathroom', status: 'closed'}
};

var user = {
  id: '1',
  name: 'Andre Francois',
  email: 'afrancois1@bloomerg.net',
  username: 'francoisa',
  password: 'password',
  list: ['1', '2', '3', '4']
};

export function ObjectDao() {}

ObjectDao.prototype.createSession = function(username, password) {
    if (user.username === username &&
        user.password === password) {
      return user;
    }
    else {
      return {status: 'not found'};
    }
}

ObjectDao.prototype.getSession = function(id) {
    if (user.id === id) {
      let session = {id: id,
                    isLoggedIn: true,
                     username: user.username,
                     email: user.email,
                     token: 'token',
                     list: user.list};
      return session;
    }
    else {
      let session = {id: null, isLoggedIn: false};
      return session;
    }
}

ObjectDao.prototype.getTodos = function(id) {
  let itemArray = [];
  if (user.id === id) {
    for (var i in listItems) {
      itemArray.push(listItems[i]);
    }
  }
  return itemArray;
}

ObjectDao.prototype.getTodo = function(id) {
    return listItems[id];
}

ObjectDao.prototype.addTodo = function(text) {
  const id = String(user.list.reduce((a, v) => a = Math.max(a, v)) + 1);
  listItems[id] = {id: id, text: text, status: 'open'};
  user.list.push(id);
  return listItems[id];
}

ObjectDao.prototype.editTodo = function(id, text, status) {
  if (id in listItems) {
    console.log('listItems[' + id + '] ' + JSON.stringify(listItems[id]));
    if (text && text !== null) {
      listItems[id].text = text;
    }
    else if (status && status !== null) {
      listItems[id].status = status;
    }
    else {
      console.log('Nothing to update!');
    }
    console.log('listItems[' + id + '] ' + JSON.stringify(listItems[id]));
  }
  else {
    console.log('editTodo: Id: "' + JSON.stringify(id) + '" not found');
  }
  return listItems[id];
}

ObjectDao.prototype.deleteTodo = function(id) {
  if (id in listItems) {
    console.log('deleting todo item with Id: ' + JSON.stringify(id));
    delete listItems[id];
    user.list = user.list.filter(v => v !== id);

    return true;
  }
  else {
    console.log('todo item with Id: ' + JSON.stringify(id) + ' not found');
    return false;
  }
}
