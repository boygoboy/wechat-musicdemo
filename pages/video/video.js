// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  avtiveTabId:null,
  dhData:[],
  videoList:[],
  videoId:null,
  videoTimeData:[],
  isTriggered:false
  },
  async getAllTab(){
   let res=await request('/video/group/list')
    this.setData({
      dhData:res.data.splice(0,11)
    })
    console.log(this.data.dhData)
    this.setData({
      avtiveTabId:this.data.dhData.length?this.data.dhData[0].id:null
    })
    wx.showLoading({
      title: '加载中',
    })
    let videoRes=await request('/video/group',{id:this.data.avtiveTabId})
    console.log(videoRes)
    this.setData({
      videoList:videoRes.datas
    })
    this.data.videoList.map((item,index)=>{
      item.id=index
    })
    wx.hideLoading()
  },
  async activeTab(e){
    console.log(e)
  this.setData({
    avtiveTabId:Number(e.currentTarget.dataset.id)
  })
  wx.showLoading({
    title: '加载中',
  })
  this.setData({
    videoList:[]
  })
  let videoRes=await request('/video/group',{id:this.data.avtiveTabId})
  console.log(videoRes)
  this.setData({
    videoList:videoRes.datas
  })
  this.data.videoList.map((item,index)=>{
    item.id=index
  })
  wx.hideLoading()
  },
  async getVideo(){
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      videoList:[]
    })
    let videoRes=await request('/video/group',{id:this.data.avtiveTabId})
    console.log(videoRes)
    this.setData({
      videoList:videoRes.datas,
      isTriggered:false
    })
    this.data.videoList.map((item,index)=>{
      item.id=index
    })
    wx.hideLoading()
  },
  handlePlay(e){
  //  let vid=e.currentTarget.id
  //  this.vid!=vid&&this.VideoContext&&this.VideoContext.stop()
  //  this.vid=vid
  //  this.VideoContext=wx.createVideoContext(vid)
   this.setData({
     videoId:e.currentTarget.id
   })
   let causeId=wx.createVideoContext(this.data.videoId)
   causeId.play()
   let {videoTimeData}=this.data
   let resultItem=videoTimeData.find(item=>item.id==e.currentTarget.id)
   if(resultItem){
    causeId.seek(resultItem.currentTime)
   }
  },
  handleTimeUpdate(e){
    let {videoTimeData}=this.data
    let resultItem=videoTimeData.find(item=>item.id==e.currentTarget.id)
    if(resultItem){
    resultItem.currentTime=e.detail.currentTime
    }else{
      let obj={
        id:e.currentTarget.id,
        currentTime:e.detail.currentTime
      }
      videoTimeData.push(obj)
    }
    this.setData({
      videoTimeData
    })
  },
  handleEnded(e){
  let {videoTimeData}=this.data
   let index=videoTimeData.findIndex(item=>item.id==e.currentTarget.id)
   videoTimeData.splice(index,1)
   this.setData({
     videoTimeData
   })
  },
  handleScrollTop(){
   this.setData({
     isTriggered:true
   })
   this.getVideo()
  },
  handleScrollBottom(e){
  console.log("到底了")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getAllTab()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})