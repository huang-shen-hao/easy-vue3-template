import { defineStore } from 'pinia'

const settingStore = defineStore('setting', {
  state: () => {
    return {
      isFlod: false, //控制折叠
      refresh: false, //控制刷新
    }
  },
  actions: {},
  getters: {},
})
export default settingStore
