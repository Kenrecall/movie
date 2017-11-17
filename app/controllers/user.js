var User = require('../models/user')

// 用户注册
exports.signup = function (req, res) {
  var _user = req.body.user

  User.find({name: _user.name}, function (err, user) {
    if (err) {
      console.log(err)
    }
    if (user) {
      return res.redirect('/')
    } else {
      var user = new User(_user)

      user.save(function (err, newUser) {
        if (err) {
          console.log(err)
        }

        res.redirect('/admin/userlist')
      })
    }
  })
}

// 用户登录
exports.signin = function (req, res) {
  var _user = req.body.user
  var name = _user.name
  var password = _user.password

  User.findOne({name: name}, function (err, user) {
    if (err) {
      console.log(err)
    }

    if (!user) {
      return res.redirect('/')
    }

    user.comparePassword(password, function (err, isMatch) {
      if (err) {
        console.log(err)
      }

      if (isMatch) {
        console.log('Password is matched')
        req.session.user = user
        return res.redirect('/')
      } else {
        console.log('Password is not matched')
      }
    })
  })
}

exports.logout = function (req, res) {
  delete req.session.user
  // delete app.locals.user

  res.redirect('/')
}

// 用户列表
exports.list = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.log(err)
    }

    res.render('userlist', {
      title: '用户列表页',
      users: users
    })
  })
}
