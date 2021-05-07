const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string()
                  .min(7)
                  .required(),
        password2: Joi.string()
                  .min(7)
                  .required(),
        role: Joi.string()
    };
    return Joi.validate(data, schema)
};

const loginValidation = (data) => {
    const schema = {
        username: Joi.string()
                  .min(6)
                  .required(),
        password: Joi.string()
                  .min(6)
                  .required()
    };
    return Joi.validate(data, schema)
};

const therapistValidation = (data) => {
    const schema = {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        age: Joi.string().required(),
        gender: Joi.string().required(),
        phone_no: Joi.string().required(),
        gender_preference: Joi.string().required(),
        specialty: Joi.array().required(),
        state_of_residence: Joi.string().required(),
    };
    return Joi.validate(data, schema)
}

const clientValidation = (data) => {
    const schema = {
        firstname: Joi.string(),
        lastname: Joi.string(),
        age: Joi.string().required(),
        gender: Joi.string().required(),
        gender_preference: Joi.string().required(),
        issue: Joi.string().required(),
        previous_therapy: Joi.string().required()
    };
    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.therapistValidation = therapistValidation;
module.exports.clientValidation = clientValidation;