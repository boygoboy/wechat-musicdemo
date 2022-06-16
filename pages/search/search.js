import request from '../../utils/request'
let isRequest=true
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hotSearchList:[],
  defaultWord:{},
  searchList:[],
  searchValue:null,
  historyList:[]
  },
  async getHotList(){
  let res=await request('/search/hot/detail')
  console.log(res)
  this.setData({
      hotSearchList:res.data
  })
  this.data.hotSearchList.map((item,index)=>{
      item.id=index
  })
  },
  async getDefaultWord(){
  let res=await request('/search/default')
  this.setData({
      defaultWord:res.data
  })
  },
  handleSearch(e){
   this.setData({
       searchValue:e.detail.value
   })
   if(!this.data.searchValue){
       this.setData({
           searchList:[]
       })
       return
   }
   if(!isRequest){
    return
   }
   this.getSearchInfo(this.data.searchValue)
   isRequest=false
   setTimeout(()=>{
       isRequest=true
   },300)

  },
  async getSearchInfo(value){
  let res=await request('/search',{keywords:value,limit:30})
  this.setData({
    searchList:res.result.songs
  })
  let {historyList}=this.data
  if(historyList.indexOf(value)!=-1){
    historyList.splice(historyList.indexOf(value),1)
  }
  historyList.unshift(value)
  this.setData({
    historyList
  })
  wx.setStorageSync('historyList', this.data.historyList)
  console.log(this.data.searchList)
  },
  getHistoryList(){
  if(wx.getStorageSync('historyList')){
    this.setData({
      historyList:wx.getStorageSync('historyList')
    })
  }
  },
  handleCancelSearch(){
    this.setData({
      searchValue:null,
      searchList:[]
    })
    this.getHistoryList()
  },
  deleteHistory(){
    wx.showModal({
      title:'删除确认',
      content:'是否确认删除历史记录？',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            historyList:[]
          })
          wx.removeStorageSync('historyList')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  this.getHotList()
  this.getDefaultWord()
  this.getHistoryList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})