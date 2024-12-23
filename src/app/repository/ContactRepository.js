const { uuid } = require('uuidv4');

let contacts = [
  {
    id: uuid(),
    name: 'Renan',
    email: 'rgmelo94@gmail.com',
    contact_id: uuid(),
  },
  {
    id: uuid(),
    name: 'Renan 2',
    email: 'rgmelo942222@gmail.com',
    contact_id: uuid(),
  },
];

class ContactRepository {
  async findAll() {
    return await awaitToResolve(contacts);
  }

  async findById(id) {
    const contact = contacts.find((contact) => contact.id === id);

    return await awaitToResolve(contact);
  }

  async remove(id) {
    const filtredContacts = contacts.filter((item) => item.id !== id);

    contacts = await awaitToResolve(filtredContacts);

    return contacts;
  }
}

async function awaitToResolve(value) {
  return await new Promise((resolve) => setTimeout(() => resolve(value), 1000));
}

module.exports = new ContactRepository();
