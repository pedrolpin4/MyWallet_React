import Joi from "joi";

const signUp = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: {allow: false} }).required(),
    password: Joi.string().min(6).max(12).required(),
    repeatPassword: Joi.string().required()
})

const signIn = Joi.object({
    email: Joi.string().email({ tlds: {allow: false} }).required(),
    password: Joi.string().min(6).max(12).required(),
})

const validations = {
    signUp,
    signIn
}

export default validations