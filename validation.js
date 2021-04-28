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
        role: Joi.array()
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

const counselorValidation = (data) => {
    const schema = {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).required(),
        password2: Joi.string().min(7).required(),
        phoneNo: Joi.string().min(11).max(14).required(),
        aboutMe: Joi.string().required()
    };
    return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.counselorValidation = counselorValidation;