#!/bin/bash
if [ ! -d "bower_components/" ]; then
	bower install bourbon bootstrap jquery-validate jquery-cookie
fi
sh lib/create.sh