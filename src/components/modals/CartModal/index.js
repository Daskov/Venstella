import {submitForm} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";

export const submitCartForm = async (values, phoneField, setSuccess, setError) => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const products = cart.products.map(({id, quantity, color}) => ({product: id, count: quantity, color}))
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone_number: '+' + phoneField,
            country: values.country,
            city: values.city,
            order: products
        })
    }
    const res = await submitForm(endpoints.cart, requestOptions)

    if (res.status === 201) {
        setSuccess(true)
    }else if (res.status === 400) {
        const {phone_number} = await res.json()
        setError(phone_number)
    }
}