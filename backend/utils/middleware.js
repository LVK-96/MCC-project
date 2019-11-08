const errorHandler = (error, response) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: 'validation error' });
  } else {
    return response.status(400).json({ error: 'unexpected error' });
  }
};

module.exports = { errorHandler };
