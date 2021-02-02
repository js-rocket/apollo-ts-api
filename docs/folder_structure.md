The API is structured as follows:

+- database - sequelize migration scripts and seeders
|
+- deploy - folder used to deploy the API to various platforms.
|           Keep a separate folder for each platform you intend to deploy to
|
+- dist - distribution folder.  Result of compiled bundle goes here
|
+- docker - if docker is involved in the project add docker related files here
|
+- docs - documentation folder. Location of this file. Postman/insominia files
|
+- hooks - store git hooks used in this project to this folder.  Soft link scripts to .git/hooks folder
|
+- node_modules - Don't work on project if you do not know what this is
|
+- src - your source code goes here
    |
    +- assets - fonts, icons, images, language files go here.  Group appropriately into folders
    |
    +- config - configuration files go here
    |
    +- graphql - Schema goes here. Put resolvers for queries and mutations in separate folders
    |
    +- libs - library of functions that you write for this project
    |   |
    |   +- sequelize - sequelize is a key library in project, so it goes in it's own folder
    |
    +- model - database table models go here
    |
    +- services - interface to external resources


Note, think of difference between src/libs and src/services is that services can be something that can be relatively easily replaced whereas libs is tightly integrated with application.
src/libs will be mostly code written by you.
src/services will involve interfacing with code written by other people

CI/CD pipeline files usually go into their own folder in the project root folder