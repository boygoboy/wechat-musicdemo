import request from '../../utils/request'
import PubSub from 'pubsub-js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  month:null,
  day:null,
  recommendList:[],
  index:0
  },
  async getEverydaySong(){
    let cookies=wx.getStorageSync('cookies')
    if(!cookies){
      wx.showToast({
        title: '请先登录',
        icon:'none',
        success:function(){
          wx.reLaunch({
            url:'/pages/login/login'
          })
        }
      })
    }
   let recommandSong=await request('/recommend/songs')
   this.setData({
    recommendList:recommandSong.recommend
   })
   console.log(this.data.recommendList)
  },
  openSongDetail(e){
  let musicId=e.currentTarget.dataset.musicid
  wx.navigateTo({
    url:`/pages/songDetail/sonfDetail?musicId=${musicId}`
  })
  this.setData({
    index:e.currentTarget.dataset.index
  })
  let switchSong = PubSub.subscribe('switchSongCallback', (msg,data)=>{
    console.log(msg,data)
    let {index}=this.data
    if(data=='last'){
      index--
      if(index<0){
      index=0
      wx.showToast({
        title: '已经是第一首歌！',
      })
      }
    }
    if(data=='next'){
      index++
      if(index>this.data.recommendList.length){
        index=this.data.recommendList.length-1
        wx.showToast({
          title: '已经是最后一首歌！',
        })
      }
    }
    this.setData({
      index
    })
    let musicid=this.data.recommendList[index].id
    PubSub.publish('sendMusicId', musicid);
  });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     month:Number((new Date().getMonth+1))<10?`0${(new Date().getMonth+1)}`:new Date().getMonth()+1,
     day:new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()
   })
   this.getEverydaySong()
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