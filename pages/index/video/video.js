// pages/index/suqianshipin/suqianshipin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      liveurl:'',
      pushurl:'',
      showModalStatus:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      liveurl: options.liveurl,
    });
    console.log(this.data.liveurl);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
  
   */
  initdata:function(){
    this.setData(
      {
        showModalStatus:true
      }
    );
    console.log("-------开始直播");
    var playerContext1 = wx.createLivePlayerContext("player1");
    setTimeout(function () {
      playerContext1.play()
    }, 2000);
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
  guaduan:function(){
    var playerContext1 = wx.createLivePlayerContext("player1");
    playerContext1.stop();
    wx.navigateBack({

    });
  }
})