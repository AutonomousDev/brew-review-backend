To start the express server type node app.js in the terminal

Remember to setup forever if we use the flip server.

This project uses environment variable to keep database credentials secure.
In the root of the project directory you must create a file named, ".env" (no quotes.)
In this file configure you DB login info with the following lines

DB_HOST='classmysql.engr.oregonstate.edu'

DB_USER='cs340_[your_onid]'

DB_PASSWORD='[your_db_password]'

DB_DATABASE='cs340_[your_onid]'
