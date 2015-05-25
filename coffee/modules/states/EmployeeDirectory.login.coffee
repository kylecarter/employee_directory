EmployeeDirectory.login = do ->

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
        doFakeLogin($('#user'),$('#password'))
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
        page: 'profile'
        _page:
          id: isUser.employee_id
      $.cookie('loggedin', 'yes')
      $.cookie('user', isUser.employee_id)
      EmployeeDirectory.profile.configModule(isUser)
    return

  {
    configModule: configModule
  }
