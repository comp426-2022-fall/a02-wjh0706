#!/usr/bin/env node

import minimist from "minimist";
import nodefetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2))

if(args.h){
  	console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`);
	process.exit(0);
}

var timezone = moment.tz.guess();
if(args.z){
    timezone = args.z;
}
var latitude;
var longitude;
if(args.n!=null){
  latitude = args.n;
}else if (args.s!=null){
  latitude = args.s*-1;
}else{
  latitude = 0;
}

if(args.e!=null){
  longitude = args.e;
}else if (args.w!=null){
  longitude = args.w*-1;
}else{
  longitude = 0;
}
	

const response = await node_fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longtitude + '&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum&timezone=' + timezone)

const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
} 

const days = args.d

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
