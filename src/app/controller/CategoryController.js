const CategoryRepository = require('../repository/CategoryRepository');

class CategoryController {
  async index(_, response) {
    const result = await CategoryRepository.findAll();

    response.status(200).json(result);
  }

  async create(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.json(400, { error: 'Name is empty' });
    }

    const categories = await CategoryRepository.store(name);

    response.status(201).json(categories);
  }
}

module.exports = new CategoryController();
