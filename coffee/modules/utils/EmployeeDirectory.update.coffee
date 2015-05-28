EmployeeDirectory.update = do ->
  'use strict'

  doChangePassword = (confirm,dbid,form)->
    $.ajax
      url: '/user/updatepw/'+ dbid + '?pswrd=' + confirm
      dataType: 'json'
      type: 'POST'
      success: (data)->
        if form.find('.msg').length > 0
          form.find('.msg').html('Your password has been updated.');
        else
          form.find('.modal-body').append('<p class="msg">Your password has been updated.</p>')
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        if form.find('.msg').length > 0
          form.find('.msg').html('There was a problem processing your request. Please try again later.');
        else
          form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>')
        return
    return

  doChangeAvatar = (image,dbid,form)->
    $.ajax
      url: '/user/avatar/'+ dbid + '?graphic=' + image
      dataType: 'json'
      type: 'POST'
      success: (data)->
        if form.find('.msg').length > 0
          form.find('.msg').html('Your avatar has been updated.');
        else
          form.find('.modal-body').append('<p class="msg">Your avatar has been updated.</p>')
        if $('#avatar').find('img') > 0
          $('#avatar img').attr('src', image);
        else
          $('#avatar').html('<img src="' + image + '" alt="profile photo">')
        return
      error: (jqXHR,textStatus,errorThrown)->
        console.log jqXHR,textStatus,errorThrown
        if form.find('.msg').length > 0
          form.find('.msg').html('There was a problem processing your request. Please try again later.');
        else
          form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>')
        return
    return

  {
    doChangePassword : doChangePassword
    doChangeAvatar : doChangeAvatar
  }
