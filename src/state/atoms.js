import {atom} from 'recoil'

export const modalState = atom({
    key: 'modalState',
    default: {
        feedback: false,
        cart: false,
        success: false
    }
})

export const contactsState = atom({
    key: 'contactsState',
    default: {}
})

export const collectionState = atom({
    key: 'collectionState',
    default: ''
})

export const searchState = atom({
    key: 'searchState',
    default: {
        searchingProduct: '',
        products: [],
        count: 0,
        currentPage: 1,
    }
})

export const footerState = atom({
    key: 'footerState',
    default: null
})

export const cartState = atom({
    key: 'cartState',
    default: {
        products: [],
        quantity: 0,
        totalPrice: 0,
        totalQuantity: 0
    }
})

export const favoriteState = atom({
    key: 'favoriteState',
    default: []
})
