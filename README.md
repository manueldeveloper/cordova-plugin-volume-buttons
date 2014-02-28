<!---
	Licensed to the Apache Software Foundation (ASF) under one
	or more contributor license agreements.  See the NOTICE file
	distributed with this work for additional information
	regarding copyright ownership.  The ASF licenses this file
	to you under the Apache License, Version 2.0 (the
	"License"); you may not use this file except in compliance
	with the License.  You may obtain a copy of the License at

	  http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an
	"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, either express or implied.  See the License for the
	specific language governing permissions and limitations
	under the License.
-->

volume-buttons-listener
=======================

Cordova plugin which notifies when the user presses the volume up and down buttons of the device. For that, it adds the following `window`event:

* volumebuttonslistener

## Installation

	cordova plugin add https://github.com/manueldeveloper/cordova-plugin-volume-buttons.git
	
## volumebuttonslistener

This event fires when the user presses the volume up or down button of the device. An object that contains only one property is passed to the volume buttons listener:

- __signal__: The volume button that the user has pressed [`volume-up` or `volume-down`] _(String)_

Applications have to use `window.addEventListener`to attach this event listener once the `deviceready`event fires.

### Supported Platforms

- Android
- iOS (in developing process)

### Example

	window.addEventListener("volumebuttonslistener", onVolumeButtonsListener, false);
	
	function onVolumeButtonsListener(info){
		console.log("Button pressed: " + info.signal);
	}