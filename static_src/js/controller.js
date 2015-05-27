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
    console.log($.cookie(), state);
    hashHandlers = {
      reset: function() {
        if (content.hasClass('reset-pswrd')) {
          return false;
        } else {
          EmployeeDirectory.reset.configModule();
        }
      },
      employee: function() {
        console.log(state.anchor._page.id);
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

EmployeeDirectory.premissions = (function() {
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
  var validateUser, verifyUser;
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
    var data;
    data = {};
    $.ajax({
      url: '/user/read/' + userID,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        console.log(data);
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
    console.log(data);
    return data;
  };
  return {
    verifyUser: verifyUser,
    validateUser: validateUser
  };
})();

EmployeeDirectory.update = (function() {
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
  var buildProfile, config, configModule, initModule, state;
  config = {
    params: null,
    templates: {
      shell: EmployeeDirectoryViews['hbs/UserProfile.hbs'],
      contacts: EmployeeDirectoryViews['hbs/ContactsList.hbs'],
      results: EmployeeDirectoryViews['hbs/SearchResults.hbs'],
      notfound: EmployeeDirectoryViews['hbs/EmployeeNotFound.hbs']
    }
  };
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  configModule = function(data) {
    console.log(data);
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
    list.html(function(old, i) {
      return config.templates.contacts(config.params.contacts);
    });
  };
  initModule = function() {
    buildProfile($('#wrapper'));
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.login = (function() {
  'use strict';
  var config, configModule, doFakeLogin, doLogin, forgotClickHandler, initModule, loginSubmitHandler, state;
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
        doLogin($('#user'), $('#password'));
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
  doFakeLogin = function(usr, pswrd) {
    var isUser;
    isUser = EmployeeDirectory.read.verifyUser(usr.val(), pswrd.val());
    if (!isUser) {
      form.after('<div class="container-fluid"><div class="col-sm-12"><p style="margin-top: 18px; font-size: 0.775em;">The information provided does not match a known employee. Please check the information you entered and try again. If you contine to have problems contact IT.</p></div></div>');
    } else {
      $.uriAnchor.setAnchor({
        page: 'employee',
        _page: {
          id: isUser.employee_id
        }
      });
      $.cookie('loggedin', 'yes');
      $.cookie('user', isUser.employee_id);
      EmployeeDirectory.employee.configModule(isUser);
    }
  };
  doLogin = function(usr, pswrd) {
    console.log(usr, pswrd);
    $.ajax({
      url: '/user/login/' + usr.val() + '/' + pswrd.val(),
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
          $.cookie('loggedin', 'yes');
          $.cookie('user', data[0].employee_id);
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
      }
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

EmployeeDirectory.search = (function() {
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
