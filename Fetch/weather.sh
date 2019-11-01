#!/bin/bash
# My first shell script
# timeout=600 #10 minutes in secondes
# for somecondition; do
#     node forecast.js && node showData.js
#     ( sleep $timeout & wait )

# done
while true
do
    clear
    node forecast.js && node showData.js
	echo "Press [CTRL+C] to stop.."
	sleep 600
done