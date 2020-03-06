// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }
const request = (option)=>{
  return new Promise((resolve,reject)=>{
    wx.request({
      url: option.url,
      data: option.data,
      success:(res)=>{
        console.log(res)
        resolve(res)
      },
      fail:(err)=>{
        console.log(err)
        reject(err)
      }
    })
  })
}

module.exports = {
  // formatTime: formatTime
  request:request
}