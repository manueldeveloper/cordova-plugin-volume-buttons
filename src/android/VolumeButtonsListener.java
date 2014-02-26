package com.manueldeveloper;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnKeyListener;


public class VolumeButtonsListener extends CordovaPlugin implements OnKeyListener {

	private static final String VolumeButtonsListener_LOG= "VolumeButtonsListener";	
	private CallbackContext volumeCallbackContext;



	public VolumeButtonsListener(){
		volumeCallbackContext= null;
	}


	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		Log.d(VolumeButtonsListener_LOG, "Execute method called");

		// Check the action
		if( action.equals("start") ){

			Log.d(VolumeButtonsListener_LOG, "Start action");

			// Check if the plugin is listening the volume button events
			if( this.volumeCallbackContext != null ){

				callbackContext.error("Volume buttons listener already running");
				return true;	
			}

			// Get the reference to the callbacks and start the listening process
			this.volumeCallbackContext= callbackContext;
			this.webView.setOnKeyListener(this);

			// Don't return any result now
			PluginResult pluginResult= new PluginResult(PluginResult.Status.NO_RESULT);
			pluginResult.setKeepCallback(true);
			this.volumeCallbackContext.sendPluginResult(pluginResult);
			return true;
		}
		else if( action.equals("stop") ){

			Log.d(VolumeButtonsListener_LOG, "Stop action");

			// Erase the callbacks reference and stop the listening process
			this.volumeCallbackContext= null;
			this.webView.setOnKeyListener(null);
			callbackContext.success();
			return true;			
		}

		return false;
	}


	public void onDestroy(){

		// Stop the listening process
		this.webView.setOnKeyListener(null);
	}

	public void onReset(){

	}

	public boolean onKey(View view, int keyCode, KeyEvent keyEvent) {

		// Check if the event is equal to KEY_DOWN
		if( keyEvent.getAction() == KeyEvent.ACTION_DOWN )
		{
			// Check what button has been pressed
			if( keyCode == KeyEvent.KEYCODE_VOLUME_UP ){

				// Create a new JSONObject with the information and send it
				JSONObject info= new JSONObject();
				try{
					info.put("signal", new String("volume-up"));
					sendSignal(info, true);
				}
				catch(JSONException ex){
					Log.e(VolumeButtonsListener_LOG, ex.getMessage());
				}
			}
			else if( keyCode == KeyEvent.KEYCODE_VOLUME_UP  ){

				// Create a new JSONObject with the information and send it
				JSONObject info= new JSONObject();
				try{
					info.put("signal", new String("volume-down"));
					sendSignal(info, true);
				}
				catch(JSONException ex){
					Log.e(VolumeButtonsListener_LOG, ex.getMessage());
				}
			}
		}

		return false;
	}

	private void sendSignal(JSONObject info, boolean keepCallback)
	{
		if( this.volumeCallbackContext != null ){
			PluginResult result= new PluginResult(PluginResult.Status.OK, info);
			result.setKeepCallback(keepCallback);
			this.volumeCallbackContext.sendPluginResult(result);
		}
	}
}