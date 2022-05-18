const endpoints = {
    trendProducts: 'products/product_list?is_trend=is_trend&page_size=',
    newProducts: 'products/product_list?is_new=is_new&page_size=',
    productDetail: 'products/product_detail/',
    collection: 'products/collection_list?page_size=',
    collectionDetail: 'products/collection/',
    similarProducts: 'products/ramdom-product/',
    aboutUs: 'common/about_us/',
    contacts: 'common/contact_list/',
    advantages: 'common/advantages/',
    banners: 'common/banners/',
    news: 'common/news/',
    faq: 'common/faq/',
    search: 'products/search-product/?search=',
    feedback: 'common/feedback/',
    cart: 'products/order_create/',
    publicOffer: 'common/public_offer/'
}

export default endpoints
