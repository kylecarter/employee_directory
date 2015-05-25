EmployeeDirectory.utils = do ->

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
          console.log state, $.cookie()
          hashHandlers =
               reset: ->
                    if content.hasClass 'reset-pswrd'
                         false
                    else
                         console.log('reset password')
                         EmployeeDirectory.reset.configModule()
                         return
               profile: ->
                    if content.hasClass 'usr-profile'
                         false
                    else
                         console.log('user profile: ' + $.cookie('user'))
                         EmployeeDirectory.profile.configModule(state.anchor.user)
                         return
               p404: ->
                    if content.hasClass 'notfound'
                         false
                    else
                         console.log('not found')
                         EmployeeDirectory.notfound.configModule()
                         return
               signin: ->
                    if content.hasClass 'loggedout'
                         false
                    else
                         console.log('login')
                         EmployeeDirectory.shell.initModule()
                         return
          if content.length > 1
               if state.status
                    hashHandlers[state.anchor.page]()
               else if state.anchor.page == 'reset'
                    hashHandlers.reset()
               else
                    hashHandlers.signin()
          else
               if state.anchor.page == 'reset'
                    hashHandlers.reset()
               else if state.anchor.page == 'p404'
                    hashHandlers.p404()
               else
                    hashHandlers.signin()
          return

     {
          getLoginStatus : getLoginStatus
          getAppState : getAppState
          showLoading : showLoading
          hideLoading : hideLoading
          handleHashValues : handleHashValues
     }
