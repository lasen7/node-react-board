import inspector from 'schema-inspector';
import mongoose from 'mongoose';
import uuidValidate from 'uuid-validate';

export const validateSignupBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        pattern: /^[0-9a-z_]{4,20}$/,
        code: 1
      },
      email: {
        type: 'string',
        pattern: 'email',
        code: 2
      },
      password: {
        type: 'string',
        minLength: 5,
        code: 3
      }
    }
  };

  return inspector.validate(validation, body);
};

export const validateSigninBody = (body) => {
  const validation = {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        pattern: 'email',
        code: 1
      },
      password: {
        type: 'string',
        minLength: 5,
        code: 2
      },
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
        // pattern: /^[0-9a-z_]{4,20}$/,
        code: 1
      },
      eventId: {
        type: 'number',
        gte: 1000,
        lte: 99999,
        code: 2
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
        type: 'string',
        pattern: /\S+/
      }
    }
  };

  return inspector.validate(validation, body);
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

export const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const validateUUID = (uuid) => {
  return uuidValidate(uuid);
};