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

VolumeButtons.onHasSubscribersChange= function(){
	
	if(this.numHandlers === 1 && handlers() === 1)
		exec(volumeButtons.volumeButtonsListener, volumeButtons.errorListener, "VolumeButtons", "start", []);
	else if( handlers() === 0 )
		exec(null, null, "VolumeButtons", "stop", []);
};

VolumeButtons.prototype.volumeButtonsListener= function(info){
	if(info){
		cordova.fireWindowEvent("volumebuttonslistener", info);
	}
};

VolumeButtons.prototype.errorListener= function(e){
	console.log("Error initializing VolumeButtons: " + e);
};

var volumeButtons= new VolumeButtons();
module.exports= volumeButtons;