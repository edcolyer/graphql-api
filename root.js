const fakeDatabase = {
  users: [
    {
      id: 1,
      name: 'John Smith',
      isAdmin: true
    },
    {
      id: 2,
      name: 'Joe Bloggs',
      isAdmin: false
    },
    {
      id: 3,
      name: 'Jane Doe',
      isAdmin: false
    }
  ]
};

class Message {
  constructor(id, {content, author}) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

module.exports = {
  getMessage: function ({id}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: function ({input}) {
    // Create a random id for our "database".
    var id = require('crypto').randomBytes(10).toString('hex');

    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: function ({id, input}) {
    if (!fakeDatabase[id]) {
      throw new Error('no message exists with id ' + id);
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input;
    return new Message(id, input);
  }
};
