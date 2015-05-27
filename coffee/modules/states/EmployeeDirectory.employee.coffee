EmployeeDirectory.employee = do ->
  'use strict'

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
    console.log data
    config.params = if data.hasOwnProperty('employee_id') then data else EmployeeDirectory.read.validateUser(data)

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

  buildProfile = (list)->
    list.html (old,i)->
      return config.templates.contacts(config.params.contacts)
    return

  initModule = ()->
    buildProfile($('#wrapper'))
    return

  {
   configModule: configModule
  }
