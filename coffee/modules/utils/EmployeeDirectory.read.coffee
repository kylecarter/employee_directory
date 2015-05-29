EmployeeDirectory.read = do ->
  'use strict'

  config =
    params: null
    templates:
      employeeslist: EmployeeDirectoryViews['hbs/EmployeeList.hbs']

  getData = (data)->
    config.params = data
    return

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
    $.ajax
      url: '/user/read/' + userID
      dataType: 'json'
      type: 'GET'
      success: (data)->
        if data.length > 0
          $.uriAnchor.setAnchor
            page: 'employee'
            _page:
              id: data[0].employee_id
          $.cookie('loggedin', 'yes', {expires: 30})
          $.cookie('user', data[0].employee_id, {expires: 30})
          getData(data[0])
        else
          $.uriAnchor.setAnchor
            page: 'p404'
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        $.uriAnchor.setAnchor
          page: 'p404'
        return
    config.params

  doLogIn = (usr,pswrd)->
    $.uriAnchor.setAnchor
      login: 'verifying'
    $.ajax
      url: '/user/login?usr=' + usr.val() + '&pswrd=' + pswrd.val()
      dataType: 'json'
      type: 'POST'
      success: (data)->
        if data.length > 0
          $.uriAnchor.setAnchor
            page: 'employee'
            _page:
              id: data[0].employee_id
          $.cookie('loggedin', 'yes', {expires: 30})
          $.cookie('user', data[0].employee_id)
          EmployeeDirectory.utils.setData(data[0])
        else
          EmployeeDirectory.notfound.configModule({})
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        $.cookie('loggedin', 'no')
        $.cookie('user','')
        form.after('<div class="container-fluid"><div class="col-sm-12"><p style="margin-top: 18px; font-size: 0.775em;">The information provided does not match a known employee. Please check the information you entered and try again. If you contine to have problems contact IT.</p></div></div>')
        return
    return

  doLogOut = ()->
    $.uriAnchor.setAnchor
      page: 'signin'
    return

  doListEmployees = (list,isadmin)->
    $.ajax
      url: '/user/read'
      dataType: 'json'
      type: 'GET'
      success: (data)->
        variable = new Object
        variable.curadmin = if isadmin == 'true' then true else false
        variable.size = data.length
        variable.employee = data
        list.html (old,i)->
          return config.templates.employeeslist(variable)
        EmployeeDirectory.employee.initModule()
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        list.html (old,i)->
          return '<li>We are experiencing some difficulties processing your request. Please try again later.</li>'
        return
    return

  {
    verifyUser: verifyUser
    validateUser: validateUser
    doLogIn: doLogIn
    doLogOut: doLogOut
    doListEmployees: doListEmployees
  }
