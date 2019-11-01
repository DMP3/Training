#!/bin/bash
# timeout=600 #10 minutes in secondes
while true
do
    clear
    node forecast.js && node showData.js
	echo "Press [CTRL+C] to stop.."
	sleep 600
done