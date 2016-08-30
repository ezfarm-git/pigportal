#!/bin/bash
pm2 stop /var/srv/process.json
rm -rf ../pigportal_build
npm install --production
meteor npm rebuild
meteor build ../pigportal_build --architecture os.linux.x86_64
cd ../pigportal_build
tar -zxvf pigportal.tar.gz
cd bundle/programs/server && npm install
npm uninstall fibers --save
npm install fibers --save
export PORT=3000 MONGO_URL=mongodb://pigportal:pig2016@localhost:27017/pigportal ROOT_URL=http://localhost METEOR_SETTINGS=$(cat /var/srv/pigportal/settings.json)
cd ../..
pm2 start /var/srv/process.json
