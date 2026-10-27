// TizenBrew background service (runs on the TV's Node 4 runtime, so ES5 only).
// Watches HDMI 2 and reopens the TV Home module when the console turns off.

var MODULE = { moduleName: 'Robelius/tizenbrew-hdmi', moduleType: 'gh' };
var HDMI_PORT = 2;
var POLL_MS = 3000;

var lastConnected = null;

function hdmiConnected(sources) {
  var list = sources.connected || [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].type === 'HDMI' && list[i].number === HDMI_PORT) return true;
  }
  return false;
}

function openHome() {
  var appId = tizen.application.getAppInfo().packageId + '.TizenBrewStandalone';
  var control = new tizen.ApplicationControl(
    'http://tizen.org/appcontrol/operation/view', null, null, null,
    [new tizen.ApplicationControlData('module', [JSON.stringify(MODULE)])]
  );
  tizen.application.launchAppControl(control, appId, null, function (e) {
    console.log('tizenbrew-hdmi: could not reopen home: ' + e.message);
  });
}

function poll() {
  tizen.systeminfo.getPropertyValue('VIDEOSOURCE', function (sources) {
    var connected = hdmiConnected(sources);
    if (lastConnected === true && connected === false) openHome();
    lastConnected = connected;
  }, function (e) {
    console.log('tizenbrew-hdmi: VIDEOSOURCE unavailable: ' + e.message);
  });
}

setInterval(poll, POLL_MS);
poll();
