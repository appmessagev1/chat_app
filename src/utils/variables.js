const variables = {
  mongo: {
    idLength: 24,
  },

  user: {
    maxNameLength: 50,
    maxEmailLength: 50,
    maxTitleLength: 50,
    minPasswordLength: 12,
    maxPasswordLength: 50,
  },

  message: {
    maxMessageLength: 1000,
  },

  task: {
    maxTitleLength: 200,
    maxContentLength: 1000,
  },

  group: {
    maxNameLength: 100,
  },

  event: {
    maxTitleLength: 100,
    maxDescLength: 1000,
  },
};

module.exports = variables;