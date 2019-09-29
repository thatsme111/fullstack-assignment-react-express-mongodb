# assignment-react-express-mongodb
Complete full stack assignment covering React + ExpressJS + MongoDB



### To setup project in local machine follow the steps mentioned below,

1. Create a directory "assignment/" and clone the repository in that directory.

2. Setup Database,

	a. Prerequisite: mongodb must be installed.
	
	b. To restore the dump,
	```bash
	cd database
	tar -xvzf assignment.tar.gz
	mongorestore --db assignment assignment
	```

3. Setup Backend,

	Note: .env file is added to git only because it is an assignmet project
	```bash
	cd backend
	yarn
	yarn start
	```

4. Setup Frontend,

	```bash
	cd frontend
	yarn
	yarn start
	```



