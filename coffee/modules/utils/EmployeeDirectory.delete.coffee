EmployeeDirectory.delete = do ->
  'use strict'

  doDeleteEmployee = (user,el)->
    $.ajax
      url: '/user/delete/'+ user
      dataType: 'json'
      type: 'GET'
      success: (data)->
        el.remove()
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        window.alert('We are having difficulty processing your request please try again later.');
        return
    return
    return

  {
    doDeleteEmployee: doDeleteEmployee
  }
