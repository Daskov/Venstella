export const checkId = (favorites, productId) => {
    if (favorites) {
        for (var i = 0; i < favorites.length; i++) {
            if (favorites[i].id === Number(productId)) {
                return true
            }
        }
    }
    return false
}

export const addToFavorite = (isFavorite, setIsFavorite, productData, productId, setFavorite) => {
    const sFavorites = JSON.parse(localStorage.getItem('favorites'))
    let favorite = {
        title: productData.title,
        size: productData.size,
        new_price: productData.new_price,
        price: productData.price,
        color: productData.color,
        id: Number(productId)
    }

    if (isFavorite) {
        const filtered = sFavorites.filter(itm => itm.id !== favorite.id)
        setIsFavorite(false)
        localStorage.setItem('favorites', JSON.stringify(filtered))
        setFavorite(filtered)
    } else {
        const favoriteId = sFavorites.find(itm => itm.id === favorite.id)
        setIsFavorite(true)
        if (!favoriteId) {
            sFavorites.push(favorite)
            localStorage.setItem('favorites', JSON.stringify(sFavorites))
            setFavorite(sFavorites)
        }
    }
}