import Message from 'tdesign-miniprogram/message/index';
import {
  getProvince,
  getCity
} from '@/utils/getArea'

import {
  injectUserStore
} from '@/behaviors/injectUserStore'

import {
  editUserInfo,
  changeAvatar
} from '@/packages/package-personal-center/api/edit-info/editInfo'

Page({
  behaviors: [injectUserStore],
  options: {
    styleIsolation: 'shared'
  },
  /**
   * 页面的初始数据
   */
  data: {
    avatarFile: null, //头像图片
    dateVisible: false, //日期选择
    startTime: new Date(Date.now() - 120 * 1000 * 60 * 60 * 24 * 30 * 12).getTime(),
    endTime: Date.now(),
    defaultValueTime: new Date(Date.now() - 20 * 1000 * 60 * 60 * 24 * 30 * 12).getTime(),
    areaVisible: false, //地区选择
    provinces: [],
    cities: [],
    areaValue: [],
    formData: {
      nickname: '',
      gender: 0,
      birthday: 0,
      province: 0,
      city: 0,
      signature: ''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const provinces = getProvince()
    const cities = getCity(provinces[0].value)
    this.setData({
      provinces,
      cities,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this._initFormData()
  },
  /**
   * 初始化表单数据
   * 
   */
  _initFormData() {
    const {
      nickname,
      gender,
      birthday,
      province,
      city,
      signature
    } = this.data.userInfo
    this.setData({
      formData: {
        nickname: nickname || '',
        gender: gender || 1,
        birthday: birthday || 0,
        province: province || 0,
        city: city || 0,
        signature: signature || ''
      }
    })
  },

  /**
   * 处理头像上传
   * 
   */
  handleAvatarAdd(e) {
    const file = e.detail.files[0]
    if (file.size > (1024 * 1024 * 2)) {
      Message.warning({
        align: 'center',
        context: this,
        offset: [20, 32],
        content: '图片大于2M,请重新选择!',
      });
      return
    }
    // console.log(file)
    this.setData({
      avatarFile: file
    })
  },

  /**
   * 编辑昵称
   * @param {*} e 
   */
  onEditName(e) {
    const name = e.detail.value.trim()
    this.setData({
      'formData.nickname': name
    })
  },
  /**
   * 编辑性别
   */
  onChangeGender(e) {
    const num = parseInt(e.detail.value)
    this.setData({
      'formData.gender': num
    })
  },
  /**
   * 显示日期选择器
   */
  onShowDatePicker() {
    this.setData({
      dateVisible: true
    })
  },
  /**
   * 确定日期
   */
  onConfirmDate(e) {
    // console.log(e.detail.value)
    const time = new Date(e.detail.value).getTime()
    // console.log(time)
    this.setData({
      'formData.birthday': time,
    })
  },
  /**
   * 显示地区选择器
   * 
   */
  onShowAreaPicker() {
    // 定位到原来的省份
    const pid = this.data.userInfo.province
    const cid = this.data.userInfo.city
    const cities = getCity(pid)
    //可见
    this.setData({
      cities,
      areaValue: [pid, cid],
      areaVisible: true
    })
  },
  /**
   * 选择的地区改变
   * @param {*} e 
   */
  onAreaColumnChange(e) {
    // console.log(e.detail.value)
    const pid = e.detail.value[0]
    const cid = e.detail.value[1]
    const cities = getCity(pid)
    // console.log(cities)
    this.setData({
      cities,
      areaValue: [pid, cid] //必须有
    })
  },

  /**
   * 确定地区
   */
  onAreaPickerChange(e) {
    // console.log(e.detail.value, 'change')
    const pid = e.detail.value[0]
    const cid = e.detail.value[1]
    this.setData({
      'formData.province': pid,
      'formData.city': cid,
      areaValue: [pid, cid] //必须有
    })
  },

  /**
   * 修改签名
   */
  onChangeSignature(e) {
    const text = e.detail.value
    this.setData({
      'formData.signature': text
    })
  },

  /**
   * 点击确认保存
   */
  async onConfirmSave() {

    const {
      success,
      msg
    } = this.checkFormDataLegality()
    if (!success) {
      Message.warning({
        align: 'center',
        context: this,
        offset: [20, 32],
        content: msg,
      });
      return
    }

    // 修改头像
    if (this.data.avatarFile) {
      changeAvatar(this.data.avatarFile.url)
    }

    // 修改信息
    const {
      code
    } = await editUserInfo(this.data.formData)
    if (code == 200) {
      Message.success({
        align: 'center',
        context: this,
        offset: [20, 32],
        content: '修改个人信息成功！'
      })
      // 更新用户信息
      this.updateUserInfo()

      // 路由跳转
      wx.reLaunch({
        url: '/pages/TB-personal-center/personal-center',
      })
    }

  },

  /**
   * 检查表单数据合法性
   * @returns {{success:boolean,msg:string}
   */
  checkFormDataLegality() {
    const res = {
      success: true,
      msg: ''
    }
    const {
      nickname,
      gender,
      birthday,
      province,
      city,
      signature
    } = this.data.formData
    if (!nickname) {
      res.success = false
      res.msg = '请填写昵称'
      return res
    }
    if (!gender) {
      res.success = false
      res.msg = '请填写性别'
      return res
    }
    if (!birthday) {
      res.success = false
      res.msg = '请填写生日'
      return res
    }
    if (!province) {
      res.success = false
      res.msg = '请填写省份'
      return res
    }
    if (!city) {
      res.success = false
      res.msg = '请填写城市'
      return res
    }
    if (!signature) {
      res.success = false
      res.msg = '请填写签名'
      return res
    }

    return res
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})