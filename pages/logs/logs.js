var util = require('../../utils/util.js')
Page({
  data: {
    logs:[],
    modalHidden: true,
    toastHidden: true,
    bgimage: '../../image/bg.jpg'
  },
  onShow: function() {
    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs();
    // 背景图片切换
    if (wx.getStorageSync('bgimage'))
     { this.setData({ bgimage: wx.getStorageSync('bgimage') }) }
     else
     {
      this.setData({ bgimage: '../../image/bg.jpg' })
     }
  },
  set: function() {

  },
  getLogs: function() {
    var logs = wx.getStorageSync('logs')
    logs.forEach(function(item, index, arry) {
      item.startTime = new Date(item.startTime).toLocaleString()
    })
    this.setData({
      logs: logs
    })
  },
  onLoad: function() {},
  switchModal: function() {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function(e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
