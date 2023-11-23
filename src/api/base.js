//配置文件
const base={
    host: 'http://localhost:6688',
    homeCount: '/api/home/dataCount',
    homeFormat: '/api/home/format',
    homeOrder: '/api/home/orderinfo',

    goodsList: '/api/goods/projectList',
    goodsSearch: '/api/goods/search',
    deleteGoods: '/api/goods/deleteItemById',
    goodsItemCategory: '/api/goods/itemCategory/selectItemCategoryByParentId',
    addGoods: '/api/goods/item/insertTbItem',
    changeGoods: '/api/goods/item/updateTbItem',
    batchDelete: '/api/goods/batchDelete',
    
    batchUpload: '/api/batchUpload',

    itemCategory: '/api/itemCategory',
    insertCategory: '/api/itemCategory/insertCategory',
    updateCategory: '/api/itemCategory/updateCategory',
    deleteContentCategoryById: '/api/content/deleteContentCategoryById',
    insertItemCategory: '/api/itemCategory/insertItemCategory',
}

export default base