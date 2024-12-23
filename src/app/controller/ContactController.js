const ContactRepository = require('../repository/ContactRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactRepository.findAll();
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
}

module.exports = new ContactController();
