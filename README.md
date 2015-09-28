# Angular skeleton project for deploy to digitalocean
This repository has the intention of help you automatizes your deploy with aditional instructions to deploy into digitalocean.

## Getting Started
1. Clone the repository on your local environment
2. Login to your digital ocean account.
3. Verify that you have an ssh key in your digital ocean account. If you don't have one, add a new one
4. Create Digital Ocean Droplet

## Give it name
1. Select your droplet size (preferable one of $ 10 or more, you need at least 1gb ram to pass npm install without problems)
2. Select Region
3. Select application in this case Ubuntu node v4.1.0 on 14.04
4. Select your ssh key

### Setup your droplet
1. connect to you droplet via ssh
   ````
    $ssh root@<droplet IP address> (use your droplet IP address)
   ````
2. Setup the git repo
    ````
    $ apt-get install git
    $ npm install bower -g
    $ cd /home/
    $ mkdir repo angular_project
    $ cd repo
    $ git init --bare
    $ cd hooks
    ````
3. Create or edit your post-receive with the script below
    ````
    #!/bin/sh
    git --work-tree=/home/angular_project/ --git-dir=/home/repo checkout -f

    cd /home/angular_project

    npm install
    bower install --allow-root

    PORT=80 pm2 reload server.js
    ````
4. Make the hook executable
    ````
    $ chmod +x post-receive
    ````

5. Add production remote to local environment
    ````
    $ git remote add production ssh://root@<Droplet Ip adrees>/home/repo
    ````
6. Push code to new production remote
    ````
    $ git push production master
    `````
    - if that fails, use this
        ````
        $ git push production master --force
        ````
7. Once you push you project to production set project server as pm2 task.

    This will register a pm2 task that work as deamon, and we could then reload with every deploy
    ````
    $ cd /home/angular_project
    $ npm install -g pm2
    $ PORT=80 pm2 start server.js
    ````

# For local environment

    Run this commands to run the project locally

    ```
    $ npm install && bower install
    $ npm install -g pm2
    $ PORT=3000 pm2 start server.js
    ```

    Then go to you browser and navigate to localhost:3000


