import { defineStore } from 'pinia'

const getListGoods = () => {
    return JSON.parse(localStorage.getItem('allGoods') || '[]')
}

export const useGoodsStore = defineStore('goods', {
    state:()=>({
        rowData: {image:[]},
        title:'添加',
        listGoods: getListGoods()
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
            payload.id = 'id' + (this.listGoods.length + 1);
            this.listGoods.push(payload);
            localStorage.setItem('allGoods', JSON.stringify(this.listGoods));
        },
        modifyData(payload){
            const indexToUpdate = this.listGoods.findIndex(item => item.id === payload.id);
            if (indexToUpdate !== -1) {
              this.listGoods.splice(indexToUpdate, 1, payload);
            }
            localStorage.setItem('allGoods', JSON.stringify(this.listGoods));
        },
        searchGoods(payload){
            return new Promise((resolve, reject) => {
                const tempList = this.listGoods.filter(item => {
                    return item.title.indexOf(payload.name) !== -1
                })
                resolve(tempList)
            })
        },
        deleteGoods(id){
            return new Promise((resolve, reject) => {
                const index = this.listGoods.findIndex(item => item.id === id)
                this.listGoods.splice(index,1)
                localStorage.setItem('allGoods', JSON.stringify(this.listGoods));
                resolve(this.listGoods)
            })
        },
        //清空
        clearGoods(){
            this.title = '添加'
            this.rowData = {}
        }
    }
})