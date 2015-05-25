EmployeeDirectory.read = do ->

  verifyUser = (usr,pswrd)->
    i = 0
    isUser = false
    while i < user.length
      if usr == user[i].email
        if pswrd == user[i].password
          isUser = user[i]
          break
      i++
    isUser

  validateUser = (userID)->
    i = 0
    isUser = false
    while i < user.length
      if userID == user[i].employee_id
        isUser = user[i]
        break
      i++
    isUser

  {
    verifyUser: verifyUser
    validateUser: validateUser
  }
