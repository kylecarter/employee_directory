EmployeeDirectory = do ->

     state = new Object()

     watchPageLoad = (state)->
          $(document).ready ->
               EmployeeDirectory.utils.handleHashValues(state)
               return
          return

     watchHashChange = ->
          state =
               status: EmployeeDirectory.utils.getLoginStatus()
               anchor: EmployeeDirectory.utils.getAppState()
          EmployeeDirectory.utils.handleHashValues(state)
          return

     initApp = ()->
          state =
               status: EmployeeDirectory.utils.getLoginStatus()
               anchor: EmployeeDirectory.utils.getAppState()
          @container = $('#application-data')
          watchPageLoad(state)
          $(window).on 'hashchange', ->
               watchHashChange()
               return
          return

     {
         initApp : initApp
     }
