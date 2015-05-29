EmployeeDirectory = do ->

     state = new Object()

     initApp = ()->
          state =
               status: EmployeeDirectory.utils.getLoginStatus()
               anchor: EmployeeDirectory.utils.getAppState()
          @container = $('#application-data')
          EmployeeDirectory.utils.handleHashValues state
          $(window).on 'hashchange', ->
               state =
                    status: EmployeeDirectory.utils.getLoginStatus()
                    anchor: EmployeeDirectory.utils.getAppState()
               EmployeeDirectory.utils.handleHashValues state
               return
          return

     {
         initApp : initApp
     }
