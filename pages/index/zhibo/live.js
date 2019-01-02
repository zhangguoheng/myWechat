const app = getApp()
const APP_SECRET = '54f24f56b1ff34b7c081e9fb1bec2ab9'
const APP_ID = 'wx380287e1aa418234'
Page({
  /**
   * 页面的初始数据
   */
  appflag:2,
  index:0,
  end:true,
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
    statu:'init',
    userInfo:''
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
  },
  shenqing: function(e){
    var liveurl ='rtmp://58.240.173.169:1935/live/zghlive';
    var pushurl = 'rtmp://58.240.173.169:1935/live/zghpush'
    wx.navigateTo({
        url: '../video/video?liveurl='+liveurl+'&pushurl='+pushurl,
    });
  }
})