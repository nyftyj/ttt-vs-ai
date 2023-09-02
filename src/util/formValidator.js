import { INVALID_EMAIL_MSG } from "../constants";

export const validate = (formValue) => {
    const errors = {};

    // Email Validation definition:
    // The username should only contain alphanumeric, underscore, dash, and/or dot characters
    // The user name should be at least 3 characters long
    // The email id string must have one @ character
    // The domain name should only contain alphanumeric, underscore, or dash characters
    // There must be a dot after the domain name
    // The domain extension should only contain alphanumeric, underscore, or dash characters
    // The domain extension length should be between 2 and 4
    const regex = /^([\w-.]{3,})+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!formValue.email) {
        errors.email = "Email is required!";
    } else if (!regex.test(formValue.email)) {
        errors.email = INVALID_EMAIL_MSG;
    }
    
    return errors;
}