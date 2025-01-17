const ContactRepository = require('../repository/ContactRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;

    const contacts = await ContactRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact not found' });
    }

    return response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    await ContactRepository.remove(id);

    response.sendStatus(204);
  }

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const emailExist = await ContactRepository.findByEmail(email);

    if (emailExist) {
      return response.status(400).json({ error: 'E-mail already taken' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(contact);
  }

  async update(request, response) {
    const { name, email, phone, category_id } = request.body;
    const { id } = request.params;

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists && contactExists.id !== id) {
      return response.json(400, { error: 'E-mail already taken' });
    }

    const updatedContact = await ContactRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.status(201).json(updatedContact);
  }
}

module.exports = new ContactController();
