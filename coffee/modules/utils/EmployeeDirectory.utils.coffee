EmployeeDirectory.utils = do ->
     'use strict'

     config =
          params: null

     setData = (shared)->
          config.params = shared
          return

     getLoginStatus = ()->
          if $.cookie('loggedin')?
               status = true
          else
               status = false
          status

     getAppState = ()->
          anchor = $.uriAnchor.makeAnchorMap()
          anchor

     showLoading = ()->
          $('.spinner').show()

     hideLoading = ()->
          $('.spinner').hide()

     handleHashValues = (state)->
          content = $('#content')
          console.log state, $.cookie()
          hashHandlers =
               reset: ->
                    if content.hasClass 'reset-pswrd'
                         false
                    else
                         EmployeeDirectory.reset.configModule()
                         return
               employee: ->
                    if content.hasClass 'usr-profile'
                         false
                    else
                         EmployeeDirectory.employee.configModule(config.params)
                         return
               p404: ->
                    if content.hasClass 'notfound'
                         false
                    else
                         EmployeeDirectory.notfound.configModule()
                         return
               signin: ->
                    if content.hasClass 'loggedout'
                         false
                    else
                         EmployeeDirectory.login.configModule()
                         return
          if state.status and state.anchor.page == 'employee'
               hashHandlers.employee()
          if state.anchor.page == 'reset'
               $.cookie('loggedin','no')
               $.cookie('user','')
               hashHandlers.reset()
          else if state.anchor.page == 'p404'
               $.cookie('loggedin','no')
               $.cookie('user','')
               hashHandlers.p404()
          else
               $.cookie('loggedin','no')
               $.cookie('user','')
               hashHandlers.signin()
          return

     {
          setData : setData
          getLoginStatus : getLoginStatus
          getAppState : getAppState
          showLoading : showLoading
          hideLoading : hideLoading
          handleHashValues : handleHashValues
     }
