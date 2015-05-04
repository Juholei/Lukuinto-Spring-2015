# Lukuinto-Spring-2015
A game created in Lukuinto Student Project in Spring 2015. HTML5 game that aims to get children to read more. The game was created using [Phaser framework](http://phaser.io).

The game consists of a map screen, where the player moves forward through points. In each point there are tasks. A task consists of text and answer options. To proceed, player must answer correctly.

Our own "game campaign" is included and it is called Lukuseikkailu. Other game campaigns can be created with [our editor](https://github.com/Juholei/Lukuinto-Spring-2015-editor). The editor is added as a submodule in this repository. When deployed, the editor saves the game campaigns to a database through the server component of this project. These game campaigns are then available to select in the main menu of the game.


## Building the project

Nodejs, npm, Bower and Grunt are needed. Command 'npm install' should install further dependencies for building the project based on what is added as requirements in 'package.json'. After that install bower and grunt globally with commands 'npm install -g bower' and 'npm install -g grunt-cli'. If sudo is needed then add 'sudo' to beginning of the command ;-)

After npm has installed all the requirements for building the project, use Bower to install the actual dependencies of the project with command "bower install". This installs the dependencies declared in 'bower.json'.

After installing all the dependencies, command 'grunt serve' builds the frontend (game and editor) javascript, starts the server (server.js) and opens the game in browser. Command 'grunt build' builds the project into directory 'dist'.  Command 'grunt prod' builds the project and minifies frontend javascript for production. This can then be deployed to webserver and opened in browser. The same Grunt task is also executed with 'grunt heroku', which is used when deploying to Heroku with [a custom buildpack](https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt).
