import request from '@/utils/request'

const globalData = {
  key: ''
}

/**
 * 获取登录二维码
 * 
 */
export async function getLoginQr() {
  // 调用此接口可生成一个 key
  const res = await request({
    url: '/login/qr/key',
    data: {
      timestamp: Date.now()
    }
  })

  globalData.key = res.data.unikey

  // 根据key生成二维码
  const {
    data
  } = await request({
    url: '/login/qr/create',
    data: {
      key: res.data.unikey,
      qrimg: 'true',
      timestamp: Date.now()
    }
  })
  return data.qrimg
}

/**
 * 是否扫码登录成功
 * @param key
 * @returns {{
 * code: 800|801|802|803,
 * "message": string,
 * "cookie": "",
 * isLogin:boolean
 * }}
 */
export async function isLogin() {
  if (!globalData.key) {
    return {
      isLogin: false,
      message: 'key未定义'
    }
  }

  const res = await request({
    url: '/login/qr/check',
    data: {
      key: globalData.key,
      timestamp: Date.now(),
      noCookie: 'true'
    }
  })

  res.isLogin = res.code == 803 ? true : false
  return res
}

/**
 * 游客登录
 */
export function touristLanding() {
  return request({
    url: '/register/anonimous'
  })
}


/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/logout'
  })
}