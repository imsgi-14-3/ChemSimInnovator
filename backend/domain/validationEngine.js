var checkChromatographySetup = function(solventLevel, baseAbsY) {
  if (solventLevel < baseAbsY) {
    return "setup_ok";
  }
  return "solvent_above_baseline";
};

var checkRfValues = function(userAnswers, expectedValues, tolerance) {
  if (!userAnswers || !expectedValues) return false;
  var keys = Object.keys(expectedValues);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var userVal = parseFloat(userAnswers[key]);
    var expectedVal = parseFloat(expectedValues[key]);
    if (isNaN(userVal)) return false;
    if (Math.abs(userVal - expectedVal) > tolerance) return false;
  }
  return true;
};

var checkTitrationEndpoint = function(volume, endpointVolume, tolerance) {
  if (volume === endpointVolume) return "reached";
  if (volume > endpointVolume) return "passed";
  if (Math.abs(volume - endpointVolume) <= tolerance) return "reached";
  return "not_reached";
};

var allGasesConfirmed = function(gasResults, gases) {
  if (!gasResults || !gases) return false;
  for (var i = 0; i < gases.length; i++) {
    if (!gasResults[i] || gasResults[i].confirmed !== true) return false;
  }
  return true;
};

var m7AllDone = function(state) {
  if (!state) return false;
  return state.m7ActionDone === true && state.m7ObservationDone === true;
};

var m7_5ionAllDone = function(ionResults, ions) {
  if (!ionResults || !ions) return false;
  for (var i = 0; i < ions.length; i++) {
    if (!ionResults[i] || ionResults[i].done !== true) return false;
  }
  return true;
};
