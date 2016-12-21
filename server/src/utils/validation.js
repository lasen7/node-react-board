import inspector from 'schema-inspector';
import mongoose from 'mongoose';

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

export const validateAddEvents = (body) => {
  const validation = {
    type: 'object',
    properties: {
      eventName: {
        type: 'string',
        pattern: /^[0-9a-z_]{4,20}$/
      },
      eventId: {
        type: 'number',
        gte: 1000,
        lte: 99999
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateEventId = (body) => {
  const validation = {
    type: 'object',
    properties: {
      eventId: {
        type: 'number',
        gte: 1000,
        lte: 99999
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateAddEvent = (body) => {
  const validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      content: {
        type: 'string'
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateEditProfile = (body) => {
  const validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      }
    }
  };

  return inspector.validate(validation, body);
};