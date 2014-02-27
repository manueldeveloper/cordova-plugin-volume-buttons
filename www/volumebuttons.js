/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* 	This class lets to handle the events which have emitted by the volume buttons of the device
*/
var cordova= 	require('cordova'),
	exec= 		require('cordova/exec');
	
function handlers() {
	return volumeButtons.channels.buttonsListener.numHandlers;
}

var VolumeButtons= function(){
	
	this.channels={ buttonsListener:cordova.addWindowEventHandler('volumebuttonslistener') };
	for(var key in this.channels)
		this.channels[key].onHasSubscribersChange= VolumeButtons.onHasSubscribersChange;
};

/**
* 	Keep track of how many handlers we have so we can start and stop the native listener appropriately
*/
VolumeButtons.onHasSubscribersChange= function(){
	
	if(this.numHandlers === 1 && handlers() === 1)
		exec(volumeButtons.volumeButtonsListener, volumeButtons.errorListener, "VolumeButtons", "start", []);
	else if( handlers() === 0 )
		exec(null, null, "VolumeButtons", "stop", []);
};

/**
* 	Callback used when the user presses the volume button of the device
*
*	@param {Object} info	keys: signal ['volume-up' or 'volume-down'] 
*/
VolumeButtons.prototype.volumeButtonsListener= function(info){
	if(info){
		cordova.fireWindowEvent("volumebuttonslistener", info);
	}
};

/**
* 	Error callback for listener start
*/
VolumeButtons.prototype.errorListener= function(e){
	console.log("Error initializing VolumeButtons: " + e);
};

var volumeButtons= new VolumeButtons();
module.exports= volumeButtons;