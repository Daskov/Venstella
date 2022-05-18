import {submitForm} from "../../../utils/API";
import endpoints from "../../../utils/endpoints";

export const submitFeedback = async (values, setSuccess, setError) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: values.name,
            phone_number: values.phone_number
        })
    }
    const res = await submitForm(endpoints.feedback, requestOptions)

    if (res.status === 201) {
        setSuccess(true)
    }else if (res.status === 400) {
        const {phone_number} = await res.json()
        setError(phone_number)
    }
}