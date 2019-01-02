// pages/index/suqianshipin/suqianshipin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      liveurl:'',
      pushurl:'',
      showModalStatus:false,
      caseid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      liveurl: options.liveurl,
      pushurl: options.pushurl,
      caseid: options.caseid
    });
    console.log(this.data.liveurl);
    console.log(this.data.pushurl);
    console.log(this.data.caseid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
  
   */

  hujiaortmp:function(){
    var pusherContext = wx.createLivePusherContext("pusher1");

    setTimeout(function () {
      pusherContext.start();
    }, 2000);



    var playerContext1 = wx.createLivePlayerContext("player1");

    setTimeout(function () {
      playerContext1.play()
    }, 2000);
  },

  initdata:function(){
    this.setData(
      {
        showModalStatus:true
      }
    );
    console.log("333333333555");

    setTimeout(this.hujiaortmp,1000);
  },

  onShow: function () {

    setTimeout(this.initdata, 3000);

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.guaduan();
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
  
  },

  qiehuan:function(){
    var pusherContext = wx.createLivePusherContext("pusher1");
    pusherContext.switchCamera();
  },

  guaduan:function(){

    var pusherContext = wx.createLivePusherContext("pusher1");
    var playerContext1 = wx.createLivePlayerContext("player1");

    pusherContext.stop();
    playerContext1.stop();

    wx.request({
      url: 'https://wxvideotest.hyc.cn/AS/hnWxCaseManager/stopUser?account='+this.data.caseid,
      method: 'GET',
      header: { 'content-type': 'application/json;charset=utf-8' },
      success(res) {
        console.log("cancle video is ok----");
      },
      fail(res) {

      },
      complete(e)
      {
        wx.navigateBack({
          
        })
      }
    });

  },

  chonghu:function(){

    var pusherContext = wx.createLivePusherContext("pusher1");
    pusherContext.stop();

    setTimeout(function () {
      pusherContext.start();
    }, 2000);
    


    var playerContext1 = wx.createLivePlayerContext("player1");
    playerContext1.stop();

    setTimeout(function () {
      playerContext1.play()
    }, 2000);

    console.log("启动推送");
    

  }
})