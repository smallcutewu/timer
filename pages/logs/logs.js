var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true,
    workTimePercent: '',
    showStudyTime: '',
    bgimage: '../../image/bg.jpg'
  },
  onShow: function () {
    var time = calculateTime();
    var h = parseInt(time / 3600 / 1000);
    var m = parseInt(time % (1000 * 3600) / 60 / 1000);
    var s = parseInt(time % (1000 * 3600) % (60 * 1000) / 1000);
    this.setData({
      workTimePercent: time / 3600 / 1000/12 * 100 + '%',
      showStudyTime: h + '时' + m + '分' + s + '秒'
    });
    wx.setNavigationBarTitle({
      title: '任务记录'
    });
    this.getLogs();
    if (wx.getStorageSync('bgimage')) { this.setData({ bgimage: wx.getStorageSync('bgimage') })
     }
     else
     {
      this.setData({ bgimage:'../../image/bg.jpg'})
     }
  },
  set: function () {
  },
  getLogs: function () {
    let logs = wx.getStorageSync('logs')
    logs.forEach(function (item, index, arry) {
      item.startTime = new Date(item.startTime).toLocaleString()
    })
    this.setData({
      logs: logs
    })
  },
  onLoad: function () {
  },
  switchModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },
  clearLog: function (e) {
    wx.setStorageSync('logs', [])
    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})

function calculateTime() {
  var time = 0;
  var timestamp = Date.parse(new Date());
  var date = new Date(timestamp);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  let logs = wx.getStorageSync('logs');
  var endTimeTemp;
  logs.forEach(function (item, index, arry) {
    if (item.name == '工作') {
      if (item.action == '开始') {
        var startTime = item.startTime;
        var temp = new Date(startTime);
        var tempY = temp.getFullYear();
        var tempM = (temp.getMonth() + 1 < 10 ? '0' + (temp.getMonth() + 1) : temp.getMonth() + 1);
        var tempD = temp.getDate() < 10 ? '0' + temp.getDate() : temp.getDate();
        if (tempD == D && tempM == M && tempY == Y) {
          time += endTimeTemp - startTime;
        }
      } else {
        endTimeTemp = item.startTime;
      }
    }
  });
  console.log(time);
  return time;
}
