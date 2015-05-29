EmployeeDirectory.employee = do ->
  'use strict'

  config =
    params: null
    templates:
      shell: EmployeeDirectoryViews['hbs/UserProfile.hbs']
      results: EmployeeDirectoryViews['hbs/SearchResults.hbs']
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs']
      changepswrd: EmployeeDirectoryViews['hbs/ChangePassword.hbs']
      changeavtr: EmployeeDirectoryViews['hbs/ChangeAvatar.hbs']
      addemployee: EmployeeDirectoryViews['hbs/AddEmployee.hbs']
  state =
    status: EmployeeDirectory.utils.getLoginStatus()
    anchor: EmployeeDirectory.utils.getAppState()

  configModule = (data)->
    console.log data
    config.params = if data == undefined || data == null then EmployeeDirectory.read.validateUser(data) else data

    if !config.params
      $.uriAnchor.setAnchor
        page: 'p404'
      $.removeCookie('loggedin')
      $.removeCookie('user')
    else
      EmployeeDirectory.container.html (old,i)->
        return config.templates.shell(config.params)
      EmployeeDirectory.read.doListEmployees($('#wrapper'),$('#content').attr('data-admin'))
    return

  handlePasswordChange = (trigger)->
    trigger.on 'click touchend', ->
      $('#myModal').html(config.templates.changepswrd({}))
      form = $('#ChangePassword')
      form.validate
        rules:
          old:
            required: true
          diffrnt:
            required: true
          confirm:
            required: true
        messages:
          old: 'You must enter your old password.'
          diffrnt: 'You must enter a value that does not equal your old passord.'
          confirm: 'Verify you entered the same value as the new password.'
        validClass: 'has-success control-label'
        errorClass: 'has-error control-label'
        highlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success')
          return
        unhighlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error')
          return
      $('#ChangePassword .btn-primary').on 'click touchend', ->
        if form.valid()
          old = $('#old').val()
          confirm = $('#confirm').val()
          diffrnt = $('#diffrnt').val()
          if confirm == diffrnt
            if confirm != old and diffrnt != old
              EmployeeDirectory.update.doChangePassword confirm,$('.usr-profile').attr('data-id'),form
            else
              form.find('.modal-body').append('<p class="msg">Your new password cannot be set to your old password.</p>')
          else
            form.find('.modal-body').append('<p class="msg">The new password and confirm password must match.</p>')
        return
      return
    return

  handleAvatarChange = (trigger)->
    trigger.on 'click touchend', ->
      $('#myModal').html(config.templates.changeavtr({}))
      form = $('#ChangeAvatar')
      form.validate
        rules:
          'upload-avatar':
            required: true
            url: true
        messages:
          'upload-avatar': 'You must enter a valid URL.'
        validClass: 'has-success control-label'
        errorClass: 'has-error control-label'
        highlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success')
          return
        unhighlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error')
          return
      $('#ChangeAvatar .btn-primary').on 'click touchend', ->
        if form.valid()
          EmployeeDirectory.update.doChangeAvatar $('#upload-avatar').val(),$('.usr-profile').attr('data-id'),form
        return
      return
    return

  handleLogOut = (trigger)->
    trigger.on 'click touchend', ->
      EmployeeDirectory.read.doLogOut()
      return
    return

  handleMakeAdmin = (trigger)->
    trigger.each ->
      $this = $(this)
      $this.on 'click touchend', ->
        EmployeeDirectory.update.doMakeAdmin($this.parents('li').attr('data-db'),$this)
        return
      return
    return

  handleDeleteEmployee = (trigger)->
    trigger.each ->
      $this = $(this)
      $this.on 'click touchend', ->
        if window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')
          EmployeeDirectory.delete.doDeleteEmployee($this.parents('li').attr('data-db'),$this.parents('li'))
        return
      return
    return

  handleAddEmployee = (trigger)->
    trigger.on 'click touchend', ->
      $('#myModal').html(config.templates.addemployee({}))
      form = $('#AddEmployee')
      form.validate
        rules:
          "new-fname":
            required: true
          "new-lname":
            required: true
          "job-title":
            required: true
          "new-email":
            required: true
            email: true
        messages:
          "new-fname": "Employee first name is required"
          "new-lname": "Employee last name is required"
          "job-title": "Employee job title is required"
          "new-email": "A valid employee email address is required"
        validClass: 'has-success control-label'
        errorClass: 'has-error control-label'
        highlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success')
          return
        unhighlight: (element, errorClass, validClass)->
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error')
          return
      $('#AddEmployee .btn-primary').on 'click touchend', ->
        if form.valid()
          object =
            "first_name": $('#new-fname').val()
            "last_name": $('#new-lname').val()
            "title": $('#job-title').val()
            "street_address": $('#street').val()
            "street_address_addtnal": $('#street2').val()
            "city": $('#city').val()
            "state": $('#state').val()
            "zip": $('#zip').val()
            "phone": $('#new-phone').val()
            "email": $('#new-email').val()
          EmployeeDirectory.create.doAddEmployee(object,form,$('.usr-profile').attr('data-admin'))
        return
      return
    return

  initModule = ()->
    handleLogOut $('#loggout')
    handlePasswordChange $('#change-pswrd.js-modal-trigger')
    handleAvatarChange $('#update-profile.js-modal-trigger')
    handleAddEmployee $('#employee-add .js-modal-trigger')
    handleMakeAdmin $('.js-trigger-admin')
    handleDeleteEmployee $('.js-trigger-delete')
    return

  {
   configModule: configModule
   initModule: initModule
  }
