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
        EmployeeDirectory.read.doLogIn($('#user'),$('#password'))
      return
    return

  forgotClickHandler = (trigger)->
    trigger.on 'click touchend', ->
      $.uriAnchor.setAnchor
        page: 'reset'
      return
    return

  {
    configModule: configModule
  }
