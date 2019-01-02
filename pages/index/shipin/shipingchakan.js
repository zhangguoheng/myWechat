//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {

  },
  stateChange: function (e) {
    console.log(JSON.stringify(e));
  },
  startTalk: function () {
    var pusherContext = wx.createLivePusherContext("pusher");
    var playerContext1 = wx.createLivePlayerContext("player1");

    pusherContext.start();

    setTimeout(function () {
      playerContext1.start()
    }, 4000);
    setTimeout(function () {
      playerContext1.play()
    }, 4000);

  },
  stopTalk: function () {
    var pusherContext = wx.createLivePusherContext("pusher");
    var playerContext2 = wx.createLivePlayerContext("player1");
    pusherContext.stop();
    playerContext2.stop();
  },
  switchCamera: function () {
    var pusherContext = wx.createLivePusherContext();
    pusherContext.switchCamera();
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
