var ScriptB = pc.createScript('scriptB');

ScriptB.prototype.initialize = function() {
    var guid = this.entity.getGuid();
    window.initializeCalls.push(guid + ' initialize scriptB');
    this.entity.script.on('enable', function () {
        window.initializeCalls.push(guid + ' enable scriptB');
    });
    this.entity.script.on('disable', function () {
        window.initializeCalls.push(guid + ' disable scriptB');
    });
    this.entity.script.on('state', function (enabled) {
        window.initializeCalls.push(guid + ' state ' + enabled + ' scriptB');
    });
};

ScriptB.prototype.postInitialize = function() {
    window.initializeCalls.push(this.entity.getGuid() + ' postInitialize scriptB');
};
