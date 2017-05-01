
# start stop postgres
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop

# make database
createdb wikistack

# git pull etc
git pull ...
npm i
npm start # starts the app