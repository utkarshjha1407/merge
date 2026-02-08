// Example controller
const exampleController = {
  getAll: async (req, res, next) => {
    try {
      // TODO: Implement logic
      res.status(200).json({ message: 'Get all items' });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // TODO: Implement logic
      res.status(200).json({ message: `Get item ${id}` });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      // TODO: Implement logic
      res.status(201).json({ message: 'Item created' });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      // TODO: Implement logic
      res.status(200).json({ message: `Item ${id} updated` });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      // TODO: Implement logic
      res.status(200).json({ message: `Item ${id} deleted` });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = exampleController;
