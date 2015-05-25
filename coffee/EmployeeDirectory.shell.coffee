EmployeeDirectory.shell = do ->

  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  setAppState = (container)->
    if !state.status
      EmployeeDirectory.login.configModule(container)
    else
      EmployeeDirectory.profile.configModule(container)
    return

  initModule = (container)->
    setAppState(container)
    return

  {
    initModule: initModule
  }
