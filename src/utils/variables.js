const variables = {
  user: {
    maxNameLength: 50,
    maxEmailLength: 50,
    maxTitleLength: 50,
    minPasswordLength: 12,
    maxPasswordLength: 50,
    userIdLength: 24,
  },

  message: {
    maxMessageLength: 1000,
  },

  task: {
    maxTitleLength: 200,
    maxContentLength: 1000,
  }
}

module.exports = variables;