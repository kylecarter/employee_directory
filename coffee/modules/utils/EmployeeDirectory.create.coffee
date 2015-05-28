EmployeeDirectory.create = do ->
  'use strict'

  config =
    templates:
      appendEmployee: EmployeeDirectoryViews['hbs/NewEmployee.hbs']

  doAddEmployee = (object,form,admin)->
    url = '/user/create?'
    for key of object
      url += key + '=' + object[key] + '&'
    url += 'admin=false'
    console.log url
    $.ajax
      url: '/user/create?' + url
      dataType: 'json'
      type: 'POST'
      success: (data)->
        console.log data
        form.find('.modal-body').append('<p class="msg">New employee added.</p>')
        object.curprofile = admin
        $('#employee-list').append(config.templates.appendEmployee(object))
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>')
        return
    return

  {
    doAddEmployee: doAddEmployee
  }
