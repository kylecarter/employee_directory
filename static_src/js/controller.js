var EmployeeDirectory;

EmployeeDirectory = (function() {
  var initApp;
  initApp = function() {
    var state, userID;
    state = {
      status: EmployeeDirectory.utils.getLoginStatus(),
      anchor: EmployeeDirectory.utils.getAppState()
    };
    this.container = $('#application-data');
    console.log(state, $.cookie());
    if (state.anchor.page === 'reset' && !state.status) {
      console.log('reset password');
      EmployeeDirectory.reset.configModule(this.container);
    } else if (state.status && state.anchor.page === 'profile' && (($.cookie('user') != null) || state.anchor.user)) {
      console.log('user profile: ' + $.cookie('user'));
      userID = $.cookie('user') == null ? $.cookie('user') : state.anchor.user;
      EmployeeDirectory.profile.configModule(this.container, userID);
    } else if (state.anchor.page === '404') {
      console.log('not found');
      EmployeeDirectory.notfound.configModule(this.container);
    } else {
      console.log('login');
      EmployeeDirectory.shell.initModule(this.container);
    }
  };
  return {
    initApp: initApp
  };
})();

EmployeeDirectory.utils = (function() {
  var getAppState, getLoginStatus, hideLoading, showLoading;
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
  return {
    getLoginStatus: getLoginStatus,
    getAppState: getAppState,
    showLoading: showLoading,
    hideLoading: hideLoading
  };
})();

EmployeeDirectory.create = (function() {
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
    var i, isUser;
    i = 0;
    isUser = false;
    while (i < user.length) {
      if (userID === user[i].employee_id) {
        isUser = user[i];
        break;
      }
      i++;
    }
    return isUser;
  };
  return {
    verifyUser: verifyUser,
    validateUser: validateUser
  };
})();

EmployeeDirectory.update = (function() {
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

EmployeeDirectory.login = (function() {
  var config, configModule, doFakeLogin, forgotClickHandler, initModule, loginSubmitHandler, state;
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
        doFakeLogin($('#user'), $('#password'));
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
    var verified;
    verified = EmployeeDirectory.read.verifyUser(usr.val(), pswrd.val());
    if (!verified) {
      form.after('<div class="container-fluid"><div class="col-sm-12"><p style="margin-top: 18px; font-size: 0.775em;">The information provided does not match a known employee. Please check the information you entered and try again. If you contine to have problems contact IT.</p></div></div>');
    } else {
      console.log('fired call profile');
      $.uriAnchor.setAnchor({
        page: 'profile',
        _page: {
          id: verified.employee_id
        }
      });
      $.cookie('loggedin', 'yes');
      $.cookie('user', verified.employee_id);
      EmployeeDirectory.profile.initModule(verified);
    }
  };
  return {
    configModule: configModule
  };
})();

EmployeeDirectory.notfound = (function() {
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

EmployeeDirectory.profile = (function() {
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
  configModule = function(userID) {
    var isUser;
    isUser = EmployeeDirectory.read.validateUser(userID);
    if (!isUser) {
      $.uriAnchor.setAnchor({
        page: '404'
      });
      $.removeCookie('loggedin');
      $.removeCookie('user');
      EmployeeDirectory.notfound.initModule();
    } else {
      initModule(isUser);
    }
  };
  buildProfile = function() {
    console.log(config.params);
    EmployeeDirectory.container.html(function(old, i) {
      return config.templates.shell(config.params);
    });
  };
  initModule = function(data) {
    config.params = data;
    buildProfile();
  };
  return {
    configModule: configModule,
    initModule: initModule
  };
})();

EmployeeDirectory.reset = (function() {
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
  var initModule, setAppState, state;
  state = {
    status: EmployeeDirectory.utils.getLoginStatus(),
    anchor: EmployeeDirectory.utils.getAppState()
  };
  setAppState = function(container) {
    if (!state.status) {
      EmployeeDirectory.login.configModule(container);
    } else {
      EmployeeDirectory.profile.configModule(container);
    }
  };
  initModule = function(container) {
    setAppState(container);
  };
  return {
    initModule: initModule
  };
})();
