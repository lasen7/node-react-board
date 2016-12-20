import inspector from 'schema-inspector';

export const validateSignupBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        pattern: /^[0-9a-z_]{4,20}$/
      },
      password: {
        type: 'string',
        minLength: 5
      },
      email: {
        type: 'string',
        pattern: 'email'
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateSigninBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      password: {
        type: 'string',
        minLength: 5
      },
      email: {
        type: 'string',
        pattern: 'email'
      }
    }
  };

  return inspector.validate(validation, body);
};