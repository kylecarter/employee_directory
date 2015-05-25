EmployeeDirectory.profile = do ->

  config =
    params: null
    templates:
      shell: EmployeeDirectoryViews['hbs/UserProfile.hbs']
      contacts: EmployeeDirectoryViews['hbs/ContactsList.hbs']
      results: EmployeeDirectoryViews['hbs/SearchResults.hbs']
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs']
  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  configModule = (userID)->
    isUser = EmployeeDirectory.read.validateUser(userID)
    if !isUser
      $.uriAnchor.setAnchor
        page: '404'
      $.removeCookie('loggedin')
      $.removeCookie('user')
      EmployeeDirectory.notfound.initModule()
    else
      initModule(isUser)

    return

  buildProfile = ()->
    console.log config.params
    EmployeeDirectory.container.html (old,i)->
      return config.templates.shell(config.params)
    return

  initModule = (data)->
    config.params = data
    buildProfile()
    return

  {
    configModule: configModule
    initModule: initModule
  }
