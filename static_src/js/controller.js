var EmployeeDirectory;

EmployeeDirectory = (function() {
  var initApp, state, watchHashChange, watchPageLoad;
  state = new Object();
  watchPageLoad = function(state) {
    $(document).ready(function() {
      EmployeeDirectory.utils.handleHashValues(state);
    });
  };
  watchHashChange = function() {
    state = {
      status: EmployeeDirectory.utils.getLoginStatus(),
      anchor: EmployeeDirectory.utils.getAppState()
    };
    EmployeeDirectory.utils.handleHashValues(state);
  };
  initApp = function() {
    state = {
      status: EmployeeDirectory.utils.getLoginStatus(),
      anchor: EmployeeDirectory.utils.getAppState()
    };
    this.container = $('#application-data');
    watchPageLoad(state);
    $(window).on('hashchange', function() {
      watchHashChange();
    });
  };
  return {
    initApp: initApp
  };
})();

EmployeeDirectory.utils = (function() {
  'use strict';
  var getAppState, getLoginStatus, handleHashValues, hideLoading, showLoading;
  getLoginStatus = function() {
    var status;
    if (($.cookie('loggedin') != null) && $.cookie('loggedin') !== 'no') {
      status = true;
    } else {
      status = false;
    }
    return status;
  };
  getAppState = function() {
    var anchor;
    anchor = $.uriAnchor.makeAnchorMap();
    return anchor;
  };
  showLoading = function() {
    return $('.spinner').show();
  };
  hideLoading = function() {
    return $('.spinner').hide();
  };
  handleHashValues = function(state) {
    var content, hashHandlers;
    content = $('#content');
    hashHandlers = {
      reset: function() {
        if (content.hasClass('reset-pswrd')) {
          return false;
        } else {
          EmployeeDirectory.reset.configModule();
        }
      },
      employee: function() {
        if (content.hasClass('usr-profile')) {
          return false;
        } else {
          EmployeeDirectory.employee.configModule(state.anchor._page.id);
        }
      },
      p404: function() {
        if (content.hasClass('notfound')) {
          return false;
        } else {
          EmployeeDirectory.notfound.configModule();
        }
      },
      signin: function() {
        if (content.hasClass('loggedout')) {
          return false;
        } else {
          EmployeeDirectory.login.configModule();
        }
      }
    };
    if (state.status && state.anchor.page === 'employee') {
      hashHandlers.employee();
    }
    if (state.anchor.page === 'reset') {
      $.cookie('loggined', 'no');
      $.removeCookie('user');
      hashHandlers.reset();
    } else if (state.anchor.page === 'p404') {
      $.cookie('loggined', 'no');
      $.removeCookie('user');
      hashHandlers.p404();
    } else {
      $.cookie('loggined', 'no');
      $.removeCookie('user');
      hashHandlers.signin();
    }
  };
  return {
    getLoginStatus: getLoginStatus,
    getAppState: getAppState,
    showLoading: showLoading,
    hideLoading: hideLoading,
    handleHashValues: handleHashValues
  };
})();

EmployeeDirectory.create = (function() {
  'use strict';
  var config, doAddEmployee;
  config = {
    templates: {
      appendEmployee: EmployeeDirectoryViews['hbs/NewEmployee.hbs']
    }
  };
  doAddEmployee = function(object, form, admin) {
    var key, url;
    url = '/user/create?';
    for (key in object) {
      url += key + '=' + object[key] + '&';
    }
    url += 'admin=false';
    console.log(url);
    $.ajax({
      url: '/user/create?' + url,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        console.log(data);
        form.find('.modal-body').append('<p class="msg">New employee added.</p>');
        object.curprofile = admin;
        $('#employee-list').append(config.templates.appendEmployee(object));
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>');
      }
    });
  };
  return {
    doAddEmployee: doAddEmployee
  };
})();

EmployeeDirectory["delete"] = (function() {
  'use strict';
  var config, configModule, initModule, selectors, state;
  config = new Object();
  state = new Object();
  selectors = new Object();
  configModule = function() {};
  initModule = function() {};
  return {
    configModule: configModule,
    initModule: initModule
  };
})();

EmployeeDirectory.read = (function() {
  'use strict';
  var config, doListEmployees, doLogIn, doLogOut, validateUser, verifyUser;
  config = {
    templates: {
      employeeslist: EmployeeDirectoryViews['hbs/EmployeeList.hbs']
    }
  };
  verifyUser = function(usr, pswrd) {
    var i, isUser;
    i = 0;
    isUser = false;
    while (i < user.length) {
      if (usr === user[i].email) {
        if (pswrd === user[i].password) {
          isUser = user[i];
          break;
        }
      }
      i++;
    }
    return isUser;
  };
  validateUser = function(userID) {
    return $.ajax({
      url: '/user/read/' + userID,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        if (data.length > 0) {
          $.uriAnchor.setAnchor({
            page: 'employee',
            _page: {
              id: data[0].employee_id
            }
          });
          EmployeeDirectory.employee.configModule(data[0]);
        } else {
          $.uriAnchor.setAnchor({
            page: 'p404'
          });
          EmployeeDirectory.notfound.configModule({});
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        $.uriAnchor.setAnchor({
          page: 'p404'
        });
        EmployeeDirectory.notfound.configModule({});
      }
    });
  };
  doLogIn = function(usr, pswrd) {
    $.ajax({
      url: '/user/login?usr=' + usr.val() + '&pswrd=' + pswrd.val(),
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        if (data.length > 0) {
          $.uriAnchor.setAnchor({
            page: 'employee',
            _page: {
              id: data[0].employee_id
            }
          });
          $.cookie('loggedin', 'yes');
          $.cookie('user', data[0].employee_id);
          EmployeeDirectory.employee.configModule(data[0]);
        } else {
          EmployeeDirectory.notfound.configModule({});
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        $.removeCookie('loggedin');
        $.removeCookie('user');
        form.after('<div class="container-fluid"><div class="col-sm-12"><p style="margin-top: 18px; font-size: 0.775em;">The information provided does not match a known employee. Please check the information you entered and try again. If you contine to have problems contact IT.</p></div></div>');
      }
    });
  };
  doLogOut = function() {
    $.uriAnchor.setAnchor({
      page: 'signin'
    });
    $.removeCookie('loggedin');
    $.removeCookie('user');
    EmployeeDirectory.login.configModule();
  };
  doListEmployees = function(list, isadmin) {
    $.ajax({
      url: '/user/read',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        var variable;
        variable = new Object;
        variable.curadmin = isadmin === 'true' ? true : false;
        variable.size = data.length;
        variable.employee = data;
        list.html(function(old, i) {
          return config.templates.employeeslist(variable);
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        list.html(function(old, i) {
          return '<li>We are experiencing some difficulties processing your request. Please try again later.</li>';
        });
      }
    });
  };
  return {
    verifyUser: verifyUser,
    validateUser: validateUser,
    doLogIn: doLogIn,
    doLogOut: doLogOut,
    doListEmployees: doListEmployees
  };
})();

EmployeeDirectory.update = (function() {
  'use strict';
  var doChangeAvatar, doChangePassword;
  doChangePassword = function(confirm, dbid, form) {
    $.ajax({
      url: '/user/updatepw/' + dbid + '?pswrd=' + confirm,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        if (form.find('.msg').length > 0) {
          form.find('.msg').html('Your password has been updated.');
        } else {
          form.find('.modal-body').append('<p class="msg">Your password has been updated.</p>');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        if (form.find('.msg').length > 0) {
          form.find('.msg').html('There was a problem processing your request. Please try again later.');
        } else {
          form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>');
        }
      }
    });
  };
  doChangeAvatar = function(image, dbid, form) {
    $.ajax({
      url: '/user/avatar/' + dbid + '?graphic=' + image,
      dataType: 'json',
      type: 'POST',
      success: function(data) {
        if (form.find('.msg').length > 0) {
          form.find('.msg').html('Your avatar has been updated.');
        } else {
          form.find('.modal-body').append('<p class="msg">Your avatar has been updated.</p>');
        }
        if ($('#avatar').find('img') > 0) {
          $('#avatar img').attr('src', image);
        } else {
          $('#avatar').html('<img src="' + image + '" alt="profile photo">');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        if (form.find('.msg').length > 0) {
          form.find('.msg').html('There was a problem processing your request. Please try again later.');
        } else {
          form.find('.modal-body').append('<p class="msg">There was a problem processing your request. Please try again later.</p>');
        }
      }
    });
  };
  return {
    doChangePassword: doChangePassword,
    doChangeAvatar: doChangeAvatar
  };
})();

EmployeeDirectory.contact = (function() {
  'use strict';
  var config, configModule, initModule, selectors, state;
  config = new Object();
  state = new Object();
  selectors = new Object();
  configModule = function() {};
  initModule = function() {};
  return {
    configModule: configModule,
    initModule: initModule
  };
})();

EmployeeDirectory.employee = (function() {
  'use strict';
  var buildProfile, config, configModule, handleAddEmployee, handleAvatarChange, handleLogOut, handlePasswordChange, initModule, state;
  config = {
    params: null,
    templates: {
      shell: EmployeeDirectoryViews['hbs/UserProfile.hbs'],
      results: EmployeeDirectoryViews['hbs/SearchResults.hbs'],
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs'],
      changepswrd: EmployeeDirectoryViews['hbs/ChangePassword.hbs'],
      changeavtr: EmployeeDirectoryViews['hbs/ChangeAvatar.hbs'],
      addemployee: EmployeeDirectoryViews['hbs/AddEmployee.hbs']
    }
  };
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  configModule = function(data) {
    config.params = data.hasOwnProperty('employee_id') ? data : EmployeeDirectory.read.validateUser(data);
    if (!config.params) {
      $.uriAnchor.setAnchor({
        page: 'p404'
      });
      $.removeCookie('loggedin');
      $.removeCookie('user');
      EmployeeDirectory.notfound.configModule();
    } else {
      EmployeeDirectory.container.html(function(old, i) {
        return config.templates.shell(config.params);
      });
    }
    initModule();
  };
  buildProfile = function(list) {
    EmployeeDirectory.read.doListEmployees(list, $('#content').attr('data-admin'));
  };
  handlePasswordChange = function(trigger) {
    trigger.on('click touchend', function() {
      var form;
      $('#myModal').html(config.templates.changepswrd({}));
      form = $('#ChangePassword');
      form.validate({
        rules: {
          old: {
            required: true
          },
          diffrnt: {
            required: true
          },
          confirm: {
            required: true
          }
        },
        messages: {
          old: 'You must enter your old password.',
          diffrnt: 'You must enter a value that does not equal your old passord.',
          confirm: 'Verify you entered the same value as the new password.'
        },
        validClass: 'has-success control-label',
        errorClass: 'has-error control-label',
        highlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error');
        }
      });
      $('#ChangePassword .btn-primary').on('click touchend', function() {
        var confirm, diffrnt, old;
        if (form.valid()) {
          old = $('#old').val();
          confirm = $('#confirm').val();
          diffrnt = $('#diffrnt').val();
          if (confirm === diffrnt) {
            if (confirm !== old && diffrnt !== old) {
              EmployeeDirectory.update.doChangePassword(confirm, $('.usr-profile').attr('data-id'), form);
            } else {
              form.find('.modal-body').append('<p class="msg">Your new password cannot be set to your old password.</p>');
            }
          } else {
            form.find('.modal-body').append('<p class="msg">The new password and confirm password must match.</p>');
          }
        }
      });
    });
  };
  handleAvatarChange = function(trigger) {
    trigger.on('click touchend', function() {
      var form;
      $('#myModal').html(config.templates.changeavtr({}));
      form = $('#ChangeAvatar');
      form.validate({
        rules: {
          'upload-avatar': {
            required: true,
            url: true
          }
        },
        messages: {
          'upload-avatar': 'You must enter a valid URL.'
        },
        validClass: 'has-success control-label',
        errorClass: 'has-error control-label',
        highlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error');
        }
      });
      $('#ChangeAvatar .btn-primary').on('click touchend', function() {
        if (form.valid()) {
          EmployeeDirectory.update.doChangeAvatar($('#upload-avatar').val(), $('.usr-profile').attr('data-id'), form);
        }
      });
    });
  };
  handleLogOut = function(trigger) {
    trigger.on('click touchend', function() {
      EmployeeDirectory.read.doLogOut();
    });
  };
  handleAddEmployee = function(trigger) {
    trigger.on('click touchend', function() {
      var form;
      $('#myModal').html(config.templates.addemployee({}));
      form = $('#AddEmployee');
      form.validate({
        rules: {
          "new-fname": {
            required: true
          },
          "new-lname": {
            required: true
          },
          "job-title": {
            required: true
          },
          "new-email": {
            required: true,
            email: true
          }
        },
        messages: {
          "new-fname": "Employee first name is required",
          "new-lname": "Employee last name is required",
          "job-title": "Employee job title is required",
          "new-email": "A valid employee email address is required"
        },
        validClass: 'has-success control-label',
        errorClass: 'has-error control-label',
        highlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-error').removeClass('has-success');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').addClass('has-success').removeClass('has-error');
        }
      });
      $('#AddEmployee .btn-primary').on('click touchend', function() {
        var object;
        if (form.valid()) {
          object = {
            "first_name": $('#new-fname').val(),
            "last_name": $('#new-lname').val(),
            "title": $('#job-title').val(),
            "street_address": $('#street').val(),
            "street_address_addtnal": $('#street2').val(),
            "city": $('#city').val(),
            "state": $('#state').val(),
            "zip": $('#zip').val(),
            "phone": $('#new-phone').val(),
            "email": $('#new-email').val()
          };
          EmployeeDirectory.create.doAddEmployee(object, form, $('.usr-profile').attr('data-admin'));
        }
      });
    });
  };
  initModule = function() {
    buildProfile($('#wrapper'));
    handlePasswordChange($('#change-pswrd.js-modal-trigger'));
    handleAvatarChange($('#update-profile.js-modal-trigger'));
    handleLogOut($('#loggout'));
    handleAddEmployee($('#employee-add .js-modal-trigger'));
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.login = (function() {
  'use strict';
  var config, configModule, forgotClickHandler, initModule, loginSubmitHandler, state;
  config = {
    params: null,
    templates: {
      login: EmployeeDirectoryViews['hbs/LoggedOut.hbs']
    }
  };
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  configModule = function() {
    EmployeeDirectory.container.html(function(old, i) {
      return config.templates.login({});
    });
    initModule();
  };
  initModule = function() {
    loginSubmitHandler($('#log-in'), $('#login-submit'));
    forgotClickHandler($('#forgot'));
  };
  loginSubmitHandler = function(form, btn) {
    form.validate({
      rules: {
        user: {
          required: true
        },
        password: {
          required: true
        }
      },
      messages: {
        user: 'Verify your user name is accurate.',
        password: 'If you are having trouble with your password, you can request to change it.'
      },
      validClass: 'has-success control-label',
      errorClass: 'has-error control-label',
      highlight: function(element, errorClass, validClass) {
        $(element).parent('.log-in__cmnpt').addClass('has-error').removeClass('has-success');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parent('.log-in__cmnpt').addClass('has-success').removeClass('has-error');
      }
    });
    btn.on('click touchend', function() {
      if (form.valid()) {
        EmployeeDirectory.read.doLogIn($('#user'), $('#password'));
      }
    });
  };
  forgotClickHandler = function(trigger) {
    trigger.on('click touchend', function() {
      $.uriAnchor.setAnchor({
        page: 'reset'
      });
      EmployeeDirectory.reset.configModule();
    });
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.notfound = (function() {
  'use strict';
  var config, configModule, initModule, signinClickHandler, state;
  config = {
    params: null,
    templates: {
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs']
    }
  };
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  configModule = function() {
    EmployeeDirectory.container.html(function(old, i) {
      return config.templates.notfound({});
    });
    initModule();
  };
  initModule = function() {
    signinClickHandler($('#notfound'));
  };
  signinClickHandler = function(trigger) {
    trigger.on('click touchend', function() {
      $.uriAnchor.setAnchor({
        page: 'signin'
      });
      EmployeeDirectory.login.configModule();
    });
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.reset = (function() {
  'use strict';
  var config, configModule, initModule, resetSubmitHandler, signinClickHandler, state;
  config = {
    params: null,
    templates: {
      reset: EmployeeDirectoryViews['hbs/ResetPsswrd.hbs']
    }
  };
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  configModule = function() {
    EmployeeDirectory.container.html(function(old, i) {
      return config.templates.reset({});
    });
    initModule();
  };
  initModule = function() {
    resetSubmitHandler($('#reset'), $('#request-submit'));
    signinClickHandler($('#sign-in'));
  };
  resetSubmitHandler = function(form, btn) {
    form.validate({
      rules: {
        email: {
          required: true
        }
      },
      messages: {
        user: 'Verify your email address is accurate.',
        required: 'A valid email address is needed to reset your password.'
      },
      validClass: 'has-success control-label',
      errorClass: 'has-error control-label',
      highlight: function(element, errorClass, validClass) {
        $(element).parent('.log-in__cmnpt').addClass('has-error').removeClass('has-success');
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).parent('.log-in__cmnpt').addClass('has-success').removeClass('has-error');
      }
    });
    btn.on('click touchend', function() {
      var delay;
      if (form.valid()) {
        EmployeeDirectory.utils.showLoading();
        delay = window.setTimeout(function() {
          form.hide();
          $('#request-sent').show();
          EmployeeDirectory.utils.hideLoading();
          window.clearTimeout(delay);
        }, 900);
      }
    });
  };
  signinClickHandler = function(trigger) {
    trigger.on('click touchend', function() {
      $.uriAnchor.setAnchor({
        page: 'signin'
      });
      EmployeeDirectory.login.configModule();
    });
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.shell = (function() {
  var initModule, state;
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  initModule = function() {
    EmployeeDirectory.utils.handleHashValues();
  };
  return {
    initModule: initModule
  };
})();
