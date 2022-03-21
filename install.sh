#!/bin/bash

UNIT_NAME="rest"

SERVICE_SYSTEMD="service-systemd"
if ! command -v $SERVICE_SYSTEMD &> /dev/null; then
    echo "could not find command "$SERVICE_SYSTEMD
fi


ETC_DIRECTORY=/etc/rest
rm -rf $ETC_DIRECTORY
mkdir $ETC_DIRECTORY
CONFIG_FILE="$ETC_DIRECTORY/rest.config"

INSTALLATION_DIRECTORY=/opt/rest
rm -rf $INSTALLATION_DIRECTORY
mkdir $INSTALLATION_DIRECTORY
cp -r . $INSTALLATION_DIRECTORY

cd "$INSTALLATION_DIRECTORY" && npm install ; cd -

service-systemd --add --service $UNIT_NAME --cwd "$INSTALLATION_DIRECTORY" --app "$INSTALLATION_DIRECTORY/index.js"

echo "UnitName=$UNIT_NAME" > $CONFIG_FILE
chmod -w $CONFIG_FILE;

systemctl daemon-reload
systemctl stop $UNIT_NAME
systemctl start $UNIT_NAME
systemctl status $UNIT_NAME -n3

echo "installed in: "$INSTALLATION_DIRECTORY
echo "metadata in: "$ETC_DIRECTORY