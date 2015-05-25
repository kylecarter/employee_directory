EmployeeDirectory = do ->

     initApp = ()->
          state =
               status: EmployeeDirectory.utils.getLoginStatus()
               anchor: EmployeeDirectory.utils.getAppState()
          @container = $('#application-data')

          console.log state, $.cookie()

          if state.anchor.page == 'reset' && !state.status
               console.log('reset password')
               EmployeeDirectory.reset.configModule(@container)
          else if state.status && state.anchor.page == 'profile' && ($.cookie('user')? || state.anchor.user)
               console.log('user profile: ' + $.cookie('user'))
               userID = unless $.cookie('user')? then $.cookie('user') else state.anchor.user
               EmployeeDirectory.profile.configModule(@container,userID)
          else if state.anchor.page == '404'
               console.log('not found')
               EmployeeDirectory.notfound.configModule(@container)
          else
               console.log('login')
               EmployeeDirectory.shell.initModule(@container)

          return

     {
         initApp : initApp
     }
