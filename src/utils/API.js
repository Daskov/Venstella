const {REACT_APP_BASE_URL_DEV} = process.env

export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(REACT_APP_BASE_URL_DEV + endpoint)
        return await res.json()
    } catch (e) {
        console.log(e)
    }
}

export const submitForm = async (endpoint, options) => {
    try {
        const res = await fetch(REACT_APP_BASE_URL_DEV + endpoint, options)
        return await res
    } catch (e) {
        console.log(e)
    }
}
