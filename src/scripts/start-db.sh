set -e

SERVER="stack_overmeme_development";
USER="stackovermeme";
PW="stackovermeme";
DB="stack_overmeme_development";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 3;

# create user
echo "CREATE USER stackovermeme WITH CREATEDB REPLICATION PASSWORD 'stackovermeme';" | docker exec -i $SERVER psql -U postgres

# create the db 
echo "CREATE DATABASE $DB OWNER $USER ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres


echo "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" | docker exec -i $SERVER psql -U $USER -d $DB
