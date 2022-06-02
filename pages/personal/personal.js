import request from '../../utils/request'

// pages/personal/personal.js
let moveY=null
let moveDistance=null
let startY=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransForm:'',
    coverTransition:'',
    userProfile:{},
    weekData:[]
  },
  openLogin(){
  wx.navigateTo({
    url: '/pages/login/login'
  })
  },
  handleTouchStart(e){
   startY=e.touches[0].clientY
   this.setData({
     coverTransition:''
   })
  },
  handleTouchMove(e){
  moveY=e.touches[0].clientY
  moveDistance=moveY-startY
  if(moveDistance<0) return
  if(moveDistance>80){
    moveDistance=80
  }
  this.setData({
    coverTransForm:`translateY(${moveDistance}rpx)`,
  })
  },
  handleTouchEnd(){
    this.setData({
      coverTransForm:`translateY(0rpx)`,
      coverTransition:'transform 1s linear'
    })
  },
  async getRecentRecord(userId){
    let res=await request('/user/record',{uid:userId,type:1})
    console.log(res)
    this.setData({
      weekData:res.weekData.splice(0,10)
    })
    this.data.weekData.map((item,index)=>{
    item.id=index
    })
    console.log(this.data.weekData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('profile')){
      this.setData({
        userProfile:JSON.parse(wx.getStorageSync('profile'))
      })
      this.getRecentRecord(this.data.userProfile.userId)
    }
  console.log(this.data.userProfile)
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