// 检查用户是否登录

module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      console.log('用户未登录')
      return res.render('/admin/login')
    }
    console.log('检测用户是否未登录')
    next()
  },

  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      console.log('用户已登录')
      return res.render('/')
    }
    console.log('检测用户是否已登录')
    next()
  }
}