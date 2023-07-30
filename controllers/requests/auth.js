const { object, string, oneOf, ref } = require('yup');

const validate = async (form, req) => {
    try {
        await form.validate(req);
        return { success: true }
    } catch (err) {
        return {
            success: false,
            message: err.errors
        }
    }
}

const authentication = async (req) => {
    let form = object({
        email: string().email().required(),
        password: string().required(),
    });

    return validate(form, req);
}

const signup = async (req) => {
    let form = object({
        name: string().required(),
        email: string().email().required(),
        password: string().required(),
        confirm_password: string().required().oneOf([ref('password'), null], 'Password did not match'),
    });

    return validate(form, req);
}

module.exports = {
    authentication,
    signup
} 