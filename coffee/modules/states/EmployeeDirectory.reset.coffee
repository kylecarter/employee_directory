EmployeeDirectory.reset = do ->

  config =
    params: null
    templates:
      reset: EmployeeDirectoryViews['hbs/ResetPsswrd.hbs']
  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  configModule = ()->
    EmployeeDirectory.container.html (old,i)->
      return config.templates.reset({})
    initModule()
    return

  initModule = ()->
    resetSubmitHandler($('#reset'),$('#request-submit'))
    signinClickHandler($('#sign-in'))
    return

  resetSubmitHandler = (form,btn)->
    form.validate
      rules:
        email:
          required: true
      messages:
        user: 'Verify your email address is accurate.'
        required: 'A valid email address is needed to reset your password.'
      validClass: 'has-success control-label'
      errorClass: 'has-error control-label'
      highlight: (element, errorClass, validClass)->
        $(element).parent('.log-in__cmnpt').addClass('has-error').removeClass('has-success')
        return
      unhighlight: (element, errorClass, validClass)->
        $(element).parent('.log-in__cmnpt').addClass('has-success').removeClass('has-error')
        return

    btn.on 'click touchend', ()->
      if form.valid()
        EmployeeDirectory.utils.showLoading()
        delay = window.setTimeout(->
          form.hide()
          $('#request-sent').show()
          EmployeeDirectory.utils.hideLoading()
          window.clearTimeout(delay)
          return
        ,900)
        return
    return

  signinClickHandler = (trigger)->
    trigger.on 'click touchend', ->
      $.uriAnchor.setAnchor
        page: 'signin'
      EmployeeDirectory.login.configModule()
      return
    return

  {
    configModule: configModule
  }
