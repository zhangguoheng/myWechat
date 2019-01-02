// pages/index/suqian/suqianpage.js
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
    showModalStatus: false,
    color_view: ['drawer_color_box_item1', 'drawer_color_box_item1',
      'drawer_color_box_item1', 'drawer_color_box_item1',
      'drawer_color_box_item1', 'drawer_color_box_item1',
      'drawer_color_box_item1', 'drawer_color_box_item1'],
    chepaihao:'',
    baoanhao:'',
    caseid:'',
    account:'',
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

  changeshow: function()
  {
    var lin1;
    var lin2;
    if (this.end == false) {
      if (this.index == 0) {
         lin1 = 'color_view[' + this.index + ']';

        this.setData({
          [lin1]: 'drawer_color_box_item2',
        })
      }
      else if (this.index < 8) {
        lin1 = 'color_view[' + this.index + ']';
        var inde = this.index - 1;
        lin2 = 'color_view[' + inde  + ']';
        this.setData({
          [lin1]: 'drawer_color_box_item2',
          [lin2]: 'drawer_color_box_item1'
        })
      }
      else {
        lin2 = 'color_view[' + 7 + ']';
        this.setData({
          [lin2]: 'drawer_color_box_item1'
        })
        this.index = -1;
      }

      this.index++;
      setTimeout(this.changeshow, 1000);
    }
   
  },

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
  canclevideo:function(){
    wx.request({
      url: '/AS/wxCaseManager/stopVideo?caseId=',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success(res) {

      },
      fail(res) {

      }
    });

  },
  callvideo:function(){
    console.log('call video');
    var that = this;
    if( this.appflag == 1 )
    {
      wx.request({
        url: 'https://wxvideotest.hyc.cn/AS/wxCaseManager/callVideo?caseId=' + that.data.caseid,
        method: 'GET',
        header: { 'content-type': 'application/json;charset=utf-8' },
        success(res) {
          console.log(res.data.wxCase.cuVideoUrl);
          console.log(res.data.wxCase.wxVideoUrl);
          console.log(res);
          that.setData({
            showModalStatus: false
          })
          wx.navigateTo({
            url: '../suqianshipin/suqianshipin?liveurl=' + res.data.wxCase.cuVideoUrl + '&pushurl=' + res.data.wxCase.wxVideoUrl + '&caseid=' + that.data.caseid,
          })
        },
        fail(res) {
          console.log(res);
        }
      });
    }
    else if( this.appflag==2 )
    {
      wx.request({
        url: 'https://wxvideotest.hyc.cn/AS/hnWxCaseManager/callUser?account=' + that.data.account,
        method: 'GET',
        header: { 'content-type': 'application/json;charset=utf-8' },
        success(res) {
          console.log(res.data.cuVideoUrl);
          console.log(res.data.wxVideoUrl);
          console.log(res);
          that.setData({
            showModalStatus: false
          })
          wx.navigateTo({
            url: '../suqianshipin/suqianshipin?liveurl=' + res.data.cuVideoUrl + '&pushurl=' + res.data.wxVideoUrl + '&caseid=' + res.data.caseId,
          })
        },
        fail(res) {
          console.log(res);
        }
      });
    }

  },

  stopshenqin:function(e){
    this.powerDrawer(e);
    this.end = true;

    if( this.data.statu == 'paidui' )
    {
        if(this.appflag == 1)
        {
          wx.request({
            url: 'https://wxvideotest.hyc.cn/AS/wxCaseManager/deleteQueue?caseId=' + this.data.caseid,
            method: 'GET',
            header: { 'content-type': 'application/json;charset=utf-8' },
            success(res) {
              console.log(res);
            },
            fail(res) {
              console.log(res);
            }
          });
        }
        else if( this.appflag==2 )
        {
          wx.request({
            url: 'https://wxvideotest.hyc.cn//AS/hnWxCaseManager/deleteQueue?caseId=' + this.data.caseid,
            method: 'GET',
            header: { 'content-type': 'application/json;charset=utf-8' },
            success(res) {
              console.log(res);
            },
            fail(res) {
              console.log(res);
            }
          });
        }
    }

  },

  getcasestatu:function(){


    if(this.end == false)
    {
      var that = this;
      if( this.appflag == 1 )
      {
        wx.request({
          url: 'https://wxvideotest.hyc.cn/AS/wxCaseManager/pullQueueStatus?caseId=' + this.data.caseid,
          method: 'GET',
          header: { 'content-type': 'application/json;charset=utf-8' },
          success(res) {
            if (res.data.result == 2) {
              console.log(res);
              console.log('call  callvideo');
              that.end = true;
              that.util('open');
              that.callvideo();

              return;
            }
            else if (res.data.result == 1) {
              console.log(res);
              setTimeout(that.getcasestatu, 2000);
            }

          },
          fail(res) {
            console.log(res);
          }
        });
      }
      else if( this.appflag ==2 )
      {
        wx.request({
          url: 'https://wxvideotest.hyc.cn//AS/hnWxCaseManager/pullQueueStatus?caseId=' + this.data.caseid,
          method: 'GET',
          header: { 'content-type': 'application/json;charset=utf-8' },
          success(res) {
            if (res.data.result == 2) {
              console.log(res);
              console.log('call  callvideo');
              that.end = true;
              that.util('open');
              that.callvideo();

              return;
            }
            else if (res.data.result == 1) {
              console.log(res);
              setTimeout(that.getcasestatu, 2000);
            }

          },
          fail(res) {
            console.log(res);
          }
        });
      }
    }

  },
  shenqing: function(e){
    this.powerDrawer(e);
    this.end = false;
    setTimeout(this.changeshow, 1000);
      var that = this;
      if( this.appflag == 1 ){
        wx.request({
          url: 'https://wxvideotest.hyc.cn/AS/wxCaseManager/putWxCase',
          method: 'POST',
          data: {
            wxId: this.data.baoanhao,
            caseNo: this.data.baoanhao,
            corporationId: '1',
            carNo: this.data.chepaihao
          },
          header: { 'content-type': 'application/json;charset=utf-8' },
          success(res) {
            if (res.statusCode == 200) {
              that.setData({
                caseid: res.data.wxCase.caseId,
                statu: "paidui"
              });
              setTimeout(that.getcasestatu, 1000);
            }
          },
          fail(res) {
            console.log(res);
          }
        });
      }
      else if( this.appflag == 2 ){
        var username = null;
              wx.getLocation({
                type: 'gcj02', //返回可以用于wx.openLocation的经纬度
                success: function (res) {
                  var latitude = res.latitude
                  var longitude = res.longitude
                  console.log("latiude %f,longitude %f", latitude, longitude);
                  username = latitude+""+longitude;
                  console.log(username);
                  wx.request({
                    url: 'https://wxvideotest.hyc.cn/AS/hnWxCaseManager/getAssessUser',
                    method: 'POST',
                    data: {
                      wxId: username,
                      gpsX: longitude,
                      gpsY: latitude,
                    },
                    header: { 'content-type': 'application/json;charset=utf-8' },
                    success(res) {
                      if (res.statusCode == 200) {
                        if (res.data.result == 1){
                          that.setData({
                            account: res.data.account
                          });
                          setTimeout(that.callvideo, 1000);
                        }
                        else{
                          wx.showModal({
                            title: '提示',
                            content: '当前区域没有查勘人员，请稍后重试',
                            showCancel: false,
                            success: function (res) {
                              if (res.confirm) {
                                console.log('用户点击确定')
                              }
                            }
                          })
                        }                   
                      }
                    },
                    fail(res) {
                      console.log(res);
                    }
                  });

                }
              });
      }
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },

  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  

    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
          
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  }  

})