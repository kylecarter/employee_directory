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

     {
          getLoginStatus : getLoginStatus
          getAppState : getAppState
          showLoading : showLoading
          hideLoading : hideLoading
     }
