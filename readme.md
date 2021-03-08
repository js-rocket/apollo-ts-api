# Description

This is a template for a GraphQL API based on an ExpressJS + Apollo + Sequelize ORM stack

The main logic for the API should stay the same across platforms.
Only the entry point (index.ts) and deployment script should be changed to cater for another platform

The `run` and `db` scripts help with common operations

# Setup

After downloading repository `yarn install` will install required node modules

# Helper script

Database commands:

`./db start` - Start the database

`./db stop` - Stop the database

`./db init` - To create a blank database and user specified in your '.env' file

`./db import <SQL_FILE>` - To run an SQL script against the database

`./db export` - To export the database to a file named dump.sql

Project setup:

`./run init` - initializes a new project in current directory

`./run reset` - clears the project modules and packages.json file

You can upgrade all modules in the project by performing a reset then init

Development:

`./run start` - start local interactive development, changes to source code are hot reloaded

`./run stop` - stop local development

Deployment:

`./run deploy` - deploy to production environment

`./run deploy-uat` - deploy to staging environment

If you add more commands to the script for deployment to other platforms, the format should be:

`deploy-<ENVIRONMENT>`

where ENVIRONMENT can be left blank for production
