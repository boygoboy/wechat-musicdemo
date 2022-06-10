import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isPlay:false,
  sonfInfo:[],
  musicId:null
  },
  handlePlay(){
  this.setData({
    isPlay:!this.data.isPlay
  })
  if(this.data.isPlay){
   this.BackgroundAudioManager.play()
  }else{
    this.BackgroundAudioManager.pause()
  }
  },
  async getSongDetail(musicId){
   let songInfo=await request('/song/detail',{ids:musicId})
   console.log(songInfo)
   this.setData({
     sonfInfo:songInfo.songs
   })
   wx.setNavigationBarTitle({
    title: this.data.sonfInfo[0].al.name
  })
  this.BackgroundAudioManager.title=this.data.sonfInfo[0].al.name
   console.log(this.data.sonfInfo)
  },
  async getMusicAudio(musicId){
    let audio=await request('/song/url',{id:musicId})
    console.log(audio)
    this.BackgroundAudioManager.src=audio.data[0].url
    this.BackgroundAudioManager.pause()
  },
  initAudio(){
    let appInstance=getApp()
    this.BackgroundAudioManager=wx.getBackgroundAudioManager()
    this.getMusicAudio(this.data.musicId)
    if(this.data.isPlay){
      this.BackgroundAudioManager.play()
     }else{
       this.BackgroundAudioManager.pause()
     }
    this.BackgroundAudioManager.onPlay(()=>{
      console.log(this.data.isPlay)
      this.setData({
        isPlay:true
      })
      appInstance.appData.isPlay=true
      appInstance.appData.musicId=this.data.musicId
    })
    this.BackgroundAudioManager.onPause(()=>{
      console.log(this.data.isPlay)
      this.setData({
        isPlay:false
      })
      appInstance.appData.isPlay=false
    })
    this.BackgroundAudioManager.onStop(()=>{
      console.log(this.data.isPlay)
      this.setData({
        isPlay:false
      })
    })
  },
  checkIsPlay(){
  let appInstance=getApp()
   console.log(appInstance.appData)
   if(this.data.musicId==appInstance.appData.musicId&&appInstance.appData.isPlay){
     this.setData({
       isPlay:true
     })
   }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  let musicId=options.musicId
  this.setData({
    musicId:musicId
  })
  this.checkIsPlay()
  this.getSongDetail(musicId)
  this.initAudio()
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