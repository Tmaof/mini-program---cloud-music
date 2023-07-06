import {
  request,
  uploadFile
} from '@/utils/request'

/**
 * 更改用户信息
 * @param {*} data 
 */
export function editUserInfo(data) {
  return request({
    url: '/user/update',
    method: 'POST',
    data,
  })
}

/**
 * 修改头像
 * @param {File} file 文件本地路径
 */
export function changeAvatar(file) {
  return uploadFile({
    url: '/avatar/upload',
    filePath: file,
    name: 'imgFile'
  })

}