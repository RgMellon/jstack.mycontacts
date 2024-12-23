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

  async create({ name, email, contact_id }) {
    contacts = [...contacts, { name, email, contact_id }];

    return contacts;
  }

  async findByEmail(email) {
    const emailFound = contacts.find((contact) => contact.email === email);

    return await awaitToResolve(emailFound);
  }

  async update(id, { name, email, contact_id }) {
    const updatedContact = {
      id,
      name,
      email,
      contact_id,
    };

    contacts = contacts.map((contact) =>
      contact.id === id ? updatedContact : contact
    );

    return await awaitToResolve(updatedContact);
  }
}

async function awaitToResolve(value) {
  return await new Promise((resolve) => setTimeout(() => resolve(value), 1000));
}

module.exports = new ContactRepository();
