#!/bin/bash
pm2 stop /var/srv/pigportal/process.json
rm -rf ../pigportal_build
npm install --production
meteor npm rebuild
meteor build ../pigportal_build --architecture os.linux.x86_64
cd ../pigportal_build
tar -zxvf pigportal.tar.gz
cd bundle/programs/server && npm install
npm uninstall fibers --save
npm install fibers --save
cd ../..
pm2 start /var/srv/pigportal/process.json
