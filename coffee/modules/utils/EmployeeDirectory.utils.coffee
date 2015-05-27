EmployeeDirectory.utils = do ->
     'use strict'

     getLoginStatus = ()->
          if $.cookie('loggedin')? and $.cookie('loggedin') != 'no'
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
          console.log $.cookie(), state
          hashHandlers =
               reset: ->
                    if content.hasClass 'reset-pswrd'
                         false
                    else
                         EmployeeDirectory.reset.configModule()
                         return
               employee: ->
                    console.log state.anchor._page.id
                    if content.hasClass 'usr-profile'
                         false
                    else
                         EmployeeDirectory.employee.configModule(state.anchor._page.id)
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
          if state.status && state.anchor.page == 'employee'
               hashHandlers.employee()
          if state.anchor.page == 'reset'
               $.cookie('loggined', 'no')
               $.removeCookie('user')
               hashHandlers.reset()
          else if state.anchor.page == 'p404'
               $.cookie('loggined', 'no')
               $.removeCookie('user')
               hashHandlers.p404()
          else
               $.cookie('loggined', 'no')
               $.removeCookie('user')
               hashHandlers.signin()
          return

     {
          getLoginStatus : getLoginStatus
          getAppState : getAppState
          showLoading : showLoading
          hideLoading : hideLoading
          handleHashValues : handleHashValues
     }
