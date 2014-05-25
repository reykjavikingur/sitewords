var path = require('path');


global['__APP_ROOT_PATH'] =  path.dirname(__dirname);;
global['__APP_MODELS_PATH'] = path.join(__APP_ROOT_PATH,'models');
global['__APP_VIEWS_PATH'] = path.join(__APP_ROOT_PATH,'views');
global['__APP_LIBS_PATH'] = path.join(__APP_ROOT_PATH,'libs');

global['__APP_PUBLIC_PATH'] = path.join(__APP_ROOT_PATH,'public');
