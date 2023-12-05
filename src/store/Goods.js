import { defineStore } from 'pinia'

export const useGoodsStore = defineStore('goods', {
    state:()=>({
        rowData: {image:[]},
        title:'添加'
    }),
    getters:{

    },
    actions:{
        //设置数据
        changeTitle(payload){
            this.title = payload
        },
        changeRowData(payload){
            this.rowData = payload
        },
        addNewData(payload){
            const allGoods = JSON.parse(localStorage.getItem('allGoods'));
            payload.id = 'id' + (allGoods.length + 1);
            const newGoodsForm = JSON.parse(JSON.stringify(payload))
            allGoods.push(newGoodsForm);
            localStorage.setItem('allGoods', JSON.stringify(allGoods));
        },
        modifyData(payload){
            const allGoods = JSON.parse(localStorage.getItem('allGoods'));
            const indexToUpdate = allGoods.findIndex(item => item.id === payload.id);
            if (indexToUpdate !== -1) {
              allGoods.splice(indexToUpdate, 1, payload);
            }
            localStorage.setItem('allGoods', JSON.stringify(allGoods));
        },
        //清空
        clearGoods(){
            this.title = '添加'
            this.rowData = {}
        }
    }
})