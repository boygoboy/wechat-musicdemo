// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
   handleInput(e){
   console.log(e)
   this.setData({
     [e.currentTarget.id]:e.detail.value
   })
   console.log(this.data.password)
   console.log(this.data.phone)
   },
   async hendleLogin(){
    let {phone,password}=this.data
    let regExp=/^1[3-9]\d{9}$/
    if(!phone){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }
    if(!regExp.test(phone)){
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:'none'
      })
      return
    }
   let res=await request('/login/cellphone',{phone,password,isLogin:true})
   console.log(res)
   if(res.code==200){
     wx.showToast({
       title: '登录成功',
       icon:'success'
     })
     wx.setStorageSync('profile', JSON.stringify(res.profile))
     wx.reLaunch({
       url: '/pages/personal/personal',
     })
   }else if(res.code==502){
     wx.showToast({
      title:'密码错误',
      icon:'none'
     })
    }else{
      wx.showToast({
        title:'登录失败',
        icon:'none'
       })
    }
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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