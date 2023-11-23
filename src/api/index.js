//请求方法

import axios from 'axios'
import base from './base'

const api={
    getHomeCount(){
        return axios.get(base.homeCount)
    },

    getHomeFormat(){
        return axios.get(base.homeFormat)
    },

    //产品列表
    getGoodsList(params){
        return axios.get(base.goodsList,{params})
    }
}

export default api