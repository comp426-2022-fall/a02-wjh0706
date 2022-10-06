#!/usr/bin/env node

import minimist from "minimist";
import nodefetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2))

if(args.h){
  	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n
    -h            Show this help message and exit.\n
    -n, -s        Latitude: N positive; S negative.\n
    -e, -w        Longitude: E positive; W negative.\n
    -z            Time zone: uses tz.guess() from moment-timezone by default.\n
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n
    -j            Echo pretty JSON from open-meteo API and exit.\n');
	process.exit(0);
}

const timezone = moment.tz.guest();
const latitude =;
const longitude = ;

const response = await nodefetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=' + timezone);
const data = await response.json();
const days = args.d

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
