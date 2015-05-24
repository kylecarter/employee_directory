this["EmployeeDirectory"] = this["EmployeeDirectory"] || {};

this["EmployeeDirectory"]["hbs/EmployeeDirectory.ContactsList.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<li>\n			<a href=\"javascript:;\">\n				<figure class=\"contact-avatar\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.avatar : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "				</figure>\n				<strong>"
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</strong>\n			</a>\n			<address>\n				<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n				"
    + alias3(((helper = (helper = helpers.street_address || (depth0 != null ? depth0.street_address : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"street_address","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.zip || (depth0 != null ? depth0.zip : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"zip","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "\n			</address>\n		</li>\n";
},"2":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "					<img src=\""
    + alias3(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"avatar","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + " profile photo\">\n";
},"4":function(depth0,helpers,partials,data) {
    return "					<span>&#xf007;</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<section id=\"contactslist\">\n	<h2>My Contacts</h2>\n	<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.contact : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</section>\n";
},"useData":true});

this["EmployeeDirectory"]["hbs/EmployeeDirectory.LoggedOut.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default\">\n	<div class=\"container-fluid\">\n		<div class=\"navbar-header\">\n			<a class=\"navbar-brand\" href=\"/\">Employee Directory</a>\n		</div>\n	</div>\n</nav>\n<header id=\"hero\">\n	<div class=\"container-fluid\">\n		<div class=\"container\">\n			<div class=\"col-sm-12\">\n				<div class=\"page-header\">\n					<h1>Start Connecting with Your Colleagues</h1>\n				</div>\n			</div>\n		</div>\n	</div>\n</header>\n<section id=\"content\" class=\"loggedout\">\n	<div class=\"container-fluid\">\n		<div class=\"container\" id=\"wrapper\">\n			<div class=\"col-sm-12 col-md-6 col-lg-6 centered\">\n				<div class=\"panel panel-default\">\n					<div class=\"panel-body\">\n						<div class=\"container-fluid\">\n							<div class=\"col-sm-12\">\n								<h2>Log In</h2>\n							</div>\n						</div>\n						<form id=\"log-in\">\n							<div class=\"container-fluid\">\n								<span class=\"log-in__cmnpt col-sm-12\">\n									<label for=\"user\" class=\"no-placeholder\">User Name </label>\n									<input type=\"text\" name=\"user\" id=\"user\" placeholder=\"User Name\">\n								</span>\n							</div>\n							<div class=\"container-fluid\">\n								<span class=\"log-in__cmnpt col-sm-12\">\n									<label for=\"password\" class=\"no-placeholder\">Password </label>\n									<input type=\"password\" name=\"password\" id=\"password\" placeholder=\"password\">\n								</span>\n							</div>\n							<div class=\"container-fluid\">\n								<div class=\"col-sm-12 col-md-6 col-lg-6\">\n									<a href=\"/#!forgot=true\" title=\"Reset Your Password\" class=\"disclosure\">Forgot Your Password</a>\n								</div>\n								<div class=\"col-sm-12 col-md-6 col-lg-6\">\n									<input type=\"submit\" name=\"login-submit\" id=\"login-submit\" class=\"btn btn-default\" value=\"Sign In\">\n								</div>\n							</div>\n						</form>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n";
},"useData":true});

this["EmployeeDirectory"]["hbs/EmployeeDirectory.ResetPsswrd.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<nav class=\"navbar navbar-default\">\n	<div class=\"container-fluid\">\n		<div class=\"navbar-header\">\n			<a class=\"navbar-brand\" href=\"/\">Employee Directory</a>\n		</div>\n	</div>\n</nav>\n<header id=\"hero\">\n	<div class=\"container-fluid\">\n		<div class=\"container\">\n			<div class=\"col-sm-12\">\n				<div class=\"page-header\">\n					<h1>Request a Reset Password Link</h1>\n				</div>\n			</div>\n		</div>\n	</div>\n</header>\n<section id=\"content\" class=\"reset-pswrd\">\n	<div class=\"container-fluid\">\n		<div class=\"container\" id=\"wrapper\">\n			<div class=\"col-sm-12 col-md-6 col-lg-6 centered\">\n				<div class=\"panel panel-default\">\n					<div class=\"panel-body\">\n						<div class=\"container-fluid\">\n							<div class=\"col-sm-12\">\n								<h2>Reset Password</h2>\n							</div>\n						</div>\n						<form id=\"log-in\">\n							<div class=\"container-fluid\">\n								<span class=\"log-in__cmnpt col-sm-12\">\n									<label for=\"user\" class=\"no-placeholder\">Email Address </label>\n									<input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Email Address\">\n								</span>\n							</div>\n							<div class=\"container-fluid\">\n								<div class=\"col-sm-12 col-md-6 col-lg-6\">\n									<a href=\"/\" title=\"Reset Your Password\" class=\"disclosure\">Sign In</a>\n								</div>\n								<div class=\"col-sm-12 col-md-6 col-lg-6\">\n									<input type=\"submit\" name=\"login-submit\" id=\"login-submit\" class=\"btn btn-default\" value=\"Submit\">\n								</div>\n							</div>\n						</form>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</section>\n";
},"useData":true});

this["EmployeeDirectory"]["hbs/EmployeeDirectory.SearchResults.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.admin : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<li class=\"row\">\n			<a class=\"col-sm-12 col-md-6 col-lg-6\" href=\"javascript:;\">\n				<figure class=\"contact-avatar\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.avatar : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				</figure>\n				<strong>"
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</strong>\n			</a>\n			<div class=\"col-sm-12 col-md-6 col-lg-6\">\n				<div class=\"btn-group\">\n					<button type=\"button\" class=\"btn btn-default\" title=\"Edit\">&#xf044;</button>\n					<button type=\"button\" class=\"btn btn-default\" title=\"Add\">&#xf067;</button>\n					<button type=\"button\" class=\"btn btn-default\" title=\"Make Admin\">&#xf0e3;</button>\n					<button type=\"button\" class=\"btn btn-default\" title=\"Delete\">&#xf014;</button>\n				</div>\n			</div>\n			<address>\n				<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n				"
    + alias3(((helper = (helper = helpers.street_address || (depth0 != null ? depth0.street_address : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"street_address","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.zip || (depth0 != null ? depth0.zip : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"zip","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "\n			</address>\n		</li>\n";
},"3":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "					<img src=\""
    + alias3(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"avatar","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + " profile photo\">\n";
},"5":function(depth0,helpers,partials,data) {
    return "					<span>&#xf007;</span>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "		<li>\n			<a href=\"javascript:;\">\n				<figure class=\"contact-avatar\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.avatar : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				</figure>\n				<strong>"
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</strong>\n			</a>\n			<address>\n				<button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n				"
    + alias3(((helper = (helper = helpers.street_address || (depth0 != null ? depth0.street_address : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"street_address","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"city","hash":{},"data":data}) : helper)))
    + ", "
    + alias3(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"state","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.zip || (depth0 != null ? depth0.zip : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"zip","hash":{},"data":data}) : helper)))
    + " <br>\n				"
    + alias3(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"email","hash":{},"data":data}) : helper)))
    + "\n			</address>\n		</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<section id=\"results\">\n	<h2>Search Results</h2>\n	<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</section>\n";
},"useData":true});

this["EmployeeDirectory"]["hbs/EmployeeDirectory.UserProfile.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "						<figure id=\"avatar\"><img src=\""
    + this.escapeExpression(((helper = (helper = helpers.avatar || (depth0 != null ? depth0.avatar : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"avatar","hash":{},"data":data}) : helper)))
    + "\" alt=\"user profile photo\"></figure>\n";
},"3":function(depth0,helpers,partials,data) {
    return "						<figure id=\"avatar\"><span>&#xf007;</span></figure>\n";
},"5":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<h1><small>Welcome!</small> <br>"
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</h1>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "						<h1><small>Welcome Back!</small> <br>"
    + alias3(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</h1>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<nav class=\"navbar navbar-default\">\n	<div class=\"container-fluid\">\n		<div class=\"navbar-header\">\n			<a class=\"navbar-brand\" href=\"/#!employee\">Employee Directory</a>\n		</div>\n		<div class=\"nav navbar-nav navbar-right\">\n			<ul class=\"settings-wrapper\">\n				<li class=\"dropdown\">\n					<button class=\"dropdown-toggle btn btn-default settings-btn\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">&#xf013;</button>\n					<ul class=\"dropdown-menu\" role=\"menu\">\n						<li><a href=\"/#!employee\">Change Password</a></li>\n						<li><a href=\"/#!employee\">Edit Contacts</a></li>\n						<li><a href=\"/#!employee\">Manage Profile</a></li>\n					</ul>\n				</li>\n			</ul>\n		</div>\n		<form class=\"navbar-form navbar-right\" role=\"search\">\n			<div class=\"form-group\">\n				<input type=\"text\" name=\"search\" id=\"search\" placeholder=\"Search\" class=\"form-control\">\n			</div>\n			<input type=\"submit\" name=\"search-submit\" id=\"search-submit\" value=\"&#xf002;\" class=\"btn btn-default\">\n		</form>\n	</div>\n</nav>\n<header id=\"hero\">\n	<div class=\"container\">\n		<div class=\"row\">\n			<div class=\"col-sm-12\">\n				<div class=\"page-header\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.avatar : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.first_login : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</header>\n<section id=\"content\" class=\"\">\n	<div class=\"container\">\n		<div class=\"row\" id=\"wrapper\">\n			<div class=\"col-sm-12\">\n				\n			</div>\n		</div>\n	</div>\n</section>\n";
},"useData":true});