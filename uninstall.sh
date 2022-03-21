#!/bin/bash

ETC_DIRECTORY=/etc/rest
CONFIG_FILE="$ETC_DIRECTORY/rest.config"

UNIT_NAME=$(cat $CONFIG_FILE | grep "UnitName" | awk -F= '{print $2}')

systemctl stop "$UNIT_NAME"
systemctl disable "$UNIT_NAME"
rm /etc/systemd/system/"$UNIT_NAME".service
rm -rf $CONFIG_FILE