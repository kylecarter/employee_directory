EmployeeDirectory.shell = do ->

  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  # setAppState = ()->
  #   if !state.status
  #     EmployeeDirectory.login.configModule()
  #   else
  #     EmployeeDirectory.profile.configModule()
  #   return

  initModule = ()->
    # setAppState()
    EmployeeDirectory.utils.handleHashValues()
    return

  {
    initModule: initModule
  }
