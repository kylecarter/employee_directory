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

  configModule = (data)->
    config.params = if data.employee_id? && data.employee_id != undefined then data else EmployeeDirectory.read.validateUser(data)

    if !config.params
      $.uriAnchor.setAnchor
        page: 'p404'
      $.removeCookie('loggedin')
      $.removeCookie('user')
      EmployeeDirectory.notfound.configModule()
    else
      EmployeeDirectory.container.html (old,i)->
        return config.templates.shell(config.params)

    initModule()
    return

  buildProfile = ()->
    return

  initModule = (data)->
    buildProfile()
    return

  {
    configModule: configModule
  }
