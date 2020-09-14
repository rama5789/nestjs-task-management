#!/bin/sh

##########
# Set Environment Variables
#
echo "Setting Environment Variables ..."

# Environment (development|production)
if [ "$1" != "" ]
then
    nodeEnvVar="$1"
else
    nodeEnvVar="development"
fi

export NODE_ENV="$nodeEnvVar"

##########
# Bootstrap Application
#
bootstrapApp () {
echo "Bootstrapping Application ..."

if [ "$nodeEnvVar" = "production" ]
then
    echo "Production Mode: ON"

    # Server
    export PORT="3000"

    # Postgres DB (ElephantSQL Cloud)
    export RDS_HOSTNAME="otto.db.elephantsql.com"
    export RDS_PORT="5432"
    export RDS_USERNAME="behqtjhv"
    export RDS_PASSWORD="sb_mdpL6z2bLDgPHyiz3tT_vL3vu3ip9"
    export RDS_DB_NAME="behqtjhv"
    export TYPEORM_SYNC="true"

    # Jwt
    export JWT_SECRET="topSecret52"

    # Swagger
    export SWAGGER_UI="true"

    yarn build
    yarn start:prod
else
    echo "Production Mode: OFF"

    yarn start
fi
}
bootstrapApp