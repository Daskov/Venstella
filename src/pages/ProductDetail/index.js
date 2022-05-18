export const addToCart = (productData, productId, setIsInCart, imagesObj, id, setCart) => {
    const sCart = JSON.parse(localStorage.getItem('cart'))
    const product = {
        image: imagesObj.product_image[0].image ?? '',
        color: imagesObj.color,
        title: productData.title,
        size: productData.size,
        actualPrice: productData.new_price && parseFloat(productData.new_price),
        quantity: 1,
        price: parseFloat(productData.price),
        id: Number(productId)
    }
    localStorage.setItem('cart', JSON.stringify({
        ...sCart,
        totalPrice: sCart.totalPrice + (productData.new_price ? product.actualPrice : product.price),
        quantity: sCart.quantity + product.quantity,
        totalQuantity: sCart.totalQuantity + product.quantity,
        products: [...sCart.products, product]
    }))
    setCart(JSON.parse(localStorage.getItem('cart')))
    setIsInCart(checkCart(imagesObj, id))
}

export const checkCart = (imagesObj, id) => {
    const sCart = JSON.parse(localStorage.getItem('cart'))
    if (sCart && imagesObj) {
        for (let i = 0; i < sCart.products.length; i++) {
            if (sCart.products[i].color === imagesObj.color && sCart.products[i].id === id) {
                return true
            }
        }
    }
    return false
}
