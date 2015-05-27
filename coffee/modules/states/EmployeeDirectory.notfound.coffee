EmployeeDirectory.notfound = do ->
  'use strict'

  config =
    params: null
    templates:
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs']
  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  configModule = ()->
    EmployeeDirectory.container.html (old,i)->
      return config.templates.notfound({})
    initModule()
    return

  initModule = ()->
    signinClickHandler($('#notfound'))
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
