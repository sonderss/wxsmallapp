//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser:true
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res) https://api.weixin.qq.com/sns/jscode2session
        wx.request({
            url:'https://api.weixin.qq.com/sns/jscode2session',
            data:{appid:'wx3c106149b6bcef83',secret:"ca6b5b1a911b1b8c2573648060c76ac8",js_code:res.code,grant_type:"authorization_code"},
            success:res=>{
              this._openid = res.data.openid
              // console.log(this._openid)
            }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框')
              // console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          })
        }
      }
    })
    // console.log('app', this.globalData.userInfo)
  },
  _openid:'',
  globalData: {
    userInfo: {},
    historyList:[],
    access_token:''
  },
  get:function(url,data){
    console.log(url,data)
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'http://zhouxunwang.cn/data/?id=' + url,
        data: data,
        success:(res)=>{
          // console.log(res)
          resolve(res)
        },
        fail:(err)=>{
          // console.log(err)
          reject('请求错误',err)
        }
      })
    })
  }
})