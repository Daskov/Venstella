import * as Yup from "yup";

export const feedbackValidate = Yup.object({
    name: Yup.string()
        .required(),
    phone_number: Yup.number()
        .required()
})

export const cartValidate = Yup.object({
    firstName: Yup.string()
        .required(),
    lastName: Yup.string()
        .required(),
    email: Yup.string()
        .email()
        .required(),
    country: Yup.string()
        .required(),
    city: Yup.string()
        .required(),
    checkbox: Yup.boolean()
        .required()
        .oneOf([true])
})