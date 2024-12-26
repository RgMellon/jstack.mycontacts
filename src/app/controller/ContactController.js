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
      response.json(404, { error: 'User not found' });
      return;
    }

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    await ContactRepository.remove(id);
    response.json(201, { message: 'User removed' });
  }

  async store(request, response) {
    const { name, email, phone, contact_id } = request.body;

    const emailExist = await ContactRepository.findByEmail(email);

    console.log(emailExist, 'email exist');
    if (emailExist) {
      return response.json(400, { error: 'E-mail already taken' });
    }

    const contact = await ContactRepository.create({
      name,
      email,
      phone,
      contact_id,
    });

    response.json(201, contact);
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

    response.json(200, updatedContact);
  }
}

module.exports = new ContactController();
