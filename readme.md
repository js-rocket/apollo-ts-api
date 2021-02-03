# Description

This is a template for a GraphQL API based on an ExpressJS + Apollo + Sequelize ORM stack

The main logic for the API should stay the same across platforms.
Only the entry point (index.ts) and deployment script should be changed to cater for another platform

The `run` script helps with common operations

# Setup

After downloading repository `yarn install` will install required node modules

# Helper script

Database commands:

`./run dbstart` - Start the database

`./run dbstop` - Stop the database

`./run dbinit` - To create a blank database and user specified in your '.env' file

`./run dbimport <SQL_FILE>` - To run an SQL script against the database

Project setup:

`./run init` - initializes a new project in current directory

`./run reset` - clears the project modules and packages.json file

You can upgrade all modules in the project by performing a reset then init

Development:

`./run dev` - interactive development, changes to source code are hot reloaded

Deployment:

`./run deploy-aws` - deploy to AWS production environment

`./run deploy-heroku` - deploy to Heroku production environment

If you add more commands to the script for deployment to other platforms, the format should be:

`deploy-<PLATFORM>:<ENVIRONMENT>`

where ENVIRONMENT can be left blank for production
