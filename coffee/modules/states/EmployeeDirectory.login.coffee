EmployeeDirectory.login = do ->
  'use strict'

  config =
    params: null
    templates:
      login: EmployeeDirectoryViews['hbs/LoggedOut.hbs']
  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  configModule = ()->
    EmployeeDirectory.container.html (old,i)->
      return config.templates.login({})
    initModule()
    return

  initModule = ()->
    loginSubmitHandler($('#log-in'),$('#login-submit'))
    forgotClickHandler($('#forgot'))
    return

  loginSubmitHandler = (form,btn)->
    form.validate
      rules:
        user:
          required: true
        password:
          required: true
      messages:
        user: 'Verify your user name is accurate.'
        password: 'If you are having trouble with your password, you can request to change it.'
      validClass: 'has-success control-label'
      errorClass: 'has-error control-label'
      highlight: (element, errorClass, validClass)->
        $(element).parent('.log-in__cmnpt').addClass('has-error').removeClass('has-success')
        return
      unhighlight: (element, errorClass, validClass)->
        $(element).parent('.log-in__cmnpt').addClass('has-success').removeClass('has-error')
        return

    btn.on 'click touchend', ->
      if form.valid()
        doLogin($('#user'),$('#password'))
      return
    return

  forgotClickHandler = (trigger)->
    trigger.on 'click touchend', ->
      $.uriAnchor.setAnchor
        page: 'reset'
      EmployeeDirectory.reset.configModule()
      return
    return

  doFakeLogin = (usr,pswrd)->
    isUser = EmployeeDirectory.read.verifyUser(usr.val(),pswrd.val())
    if !isUser
      form.after('<div class="container-fluid"><div class="col-sm-12"><p style="margin-top: 18px; font-size: 0.775em;">The information provided does not match a known employee. Please check the information you entered and try again. If you contine to have problems contact IT.</p></div></div>')
    else
      $.uriAnchor.setAnchor
        page: 'employee'
        _page:
          id: isUser.employee_id
      $.cookie('loggedin', 'yes')
      $.cookie('user', isUser.employee_id)
      EmployeeDirectory.employee.configModule(isUser)
    return

  doLogin = (usr,pswrd)->
    console.log usr,pswrd
    $.ajax
      url: '/user/login/' + usr.val() + '/' + pswrd.val()
      dataType: 'json'
      type: 'GET'
      success: (data)->
        if data.length > 0
          $.uriAnchor.setAnchor
            page: 'employee'
            _page:
              id: data[0].employee_id
          $.cookie('loggedin', 'yes')
          $.cookie('user', data[0].employee_id)
          EmployeeDirectory.employee.configModule(data[0])
        else
          $.uriAnchor.setAnchor
            page: 'p404'
          EmployeeDirectory.notfound.configModule({})
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        return
    return

  {
    configModule: configModule
  }
