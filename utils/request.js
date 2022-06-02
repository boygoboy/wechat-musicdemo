import config from './config'

export default (url,data={},method='GET')=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url:config.host+url,
      data,
      method,
      header:{
        cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>item.indexOf('MUSIC_U')!=-1):''
      },
      success:(res)=>{
        if(data.isLogin){
          wx.setStorageSync('cookies', res.cookies)
        }
      console.log('success',res)
      resolve(res.data)
      },
      fail:(err)=>{
      console.log('err',err)
      reject(err)
      }
    })
  })
}