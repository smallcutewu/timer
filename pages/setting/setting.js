// var common=require('../../utils/common.util.js')
Page({
  data: {
    image: '',
    isshow:false,
    modalHidden:true,
    toastHidden: true,
  },
  // 选择图片
  selectBg: function(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        
       this.setData(
         {
            image: res.tempFilePaths,
            isshow:true
         }
       )
       
      console.log(this.data.image)
      },
      fail :()=>
      {
         console.log("fail")
      }
    })
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //   }
    // })
    
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.setData(
      {
        image : '',
        isshow:false,
        
      }
    )
    wx.setStorage({
      key: 'bgimage',
      data: ''
    })
    // $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    wx.previewImage({
      current: image,  //当前预览的图片
      // urls: image,  //所有要预览的图片
    })
},
 
 chooseImage(e)
 {
   wx.setStorage({
     key: 'bgimage',
     data: this.data.image
   })
   this.setData({isshow:false})
 },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.setData({
    	workTime: wx.getStorageSync('workTime'),
    	restTime: wx.getStorageSync('restTime')
    })
  },
  changeWorkTime:  function(e) {
  	wx.setStorage({
  		key: 'workTime',
  		data: e.detail.value
  	})
  },
  changeRestTime:  function(e) {
  	wx.setStorage({
  		key: 'restTime',
  		data: e.detail.value
  	})
  },

  switchModal: function () {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  clearSet: function () {
        wx.setStorageSync("bgimage", "");
        wx.setStorageSync("workTime", 25); 
        wx.setStorageSync("restTime", 5); 
        this.switchModal();
    this.setData({
      toastHidden: false
    })
  },
   hideToast: function () {
    this.setData({
      toastHidden: true
    })
  },


})
 