export const increment = (color, actualPrice, quantity, setActive, id, setCart) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const currentProduct = localCart.products.find(item => item.color === color && item.id === id)

    if (currentProduct) currentProduct.quantity = quantity + 1
    localCart.totalPrice = localCart.totalPrice + actualPrice
    localCart.totalQuantity = localCart.totalQuantity + 1
    setActive(true)
    localStorage.setItem('cart', JSON.stringify(localCart))
    setCart(localCart)
}

export const decrement = (color, actualPrice, quantity, setActive, id, setCart) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const currentProduct = localCart.products.find(item => item.color === color && item.id === id)

    if (quantity > 1 && currentProduct) {
        currentProduct.quantity = quantity - 1
        localCart.totalPrice = localCart.totalPrice - actualPrice
        localCart.totalQuantity = localCart.totalQuantity - 1
        quantity === 2 ? setActive(false) : setActive(true)
    }
    localStorage.setItem('cart', JSON.stringify(localCart))
    setCart(localCart)
}

export const onBlur = (color, actualPrice, newQuantity, quantity, id, setCart) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const currentProduct = localCart.products.find(item => item.color === color && item.id === id)

    if (currentProduct) currentProduct.quantity = newQuantity
    localCart.totalQuantity = (localCart.totalQuantity - quantity) + Number(newQuantity)
    localCart.totalPrice = (localCart.totalPrice - (actualPrice * quantity)) + (actualPrice * Number(newQuantity))
    localStorage.setItem('cart', JSON.stringify(localCart))
    setCart(localCart)
}

export const deleteFromCart = (color, actualPrice, quantity, id, setCart) => {
    const localCart = JSON.parse(localStorage.getItem('cart'))
    const currentProduct = localCart.products.find(item => item.id === id && item.color === color)

    localCart.totalQuantity = localCart.totalQuantity - quantity
    localCart.totalPrice = localCart.totalPrice - (actualPrice * quantity)
    if (currentProduct) localCart.products = localCart.products.filter(itm => itm !== currentProduct)
    if (quantity > 0) {
        localCart.quantity = localCart.quantity - 1
    }
    localStorage.setItem('cart', JSON.stringify(localCart))
    setCart(localCart)
}