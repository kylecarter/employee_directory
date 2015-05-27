EmployeeDirectory.read = do ->
  'use strict'

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
    data = {}
    $.ajax
      url: '/user/read/' + userID
      dataType: 'json'
      type: 'GET'
      success: (data)->
        console.log data
        if data.length > 0
          $.uriAnchor.setAnchor
            page: 'employee'
            _page:
              id: data[0].employee_id
          EmployeeDirectory.employee.configModule(data[0])
        else
          $.uriAnchor.setAnchor
            page: 'p404'
          EmployeeDirectory.notfound.configModule({})
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        $.uriAnchor.setAnchor
          page: 'p404'
        EmployeeDirectory.notfound.configModule({})
        return
    console.log data
    data

  {
    verifyUser: verifyUser
    validateUser: validateUser
  }
