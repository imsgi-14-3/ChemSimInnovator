var calculateRf = function(componentDistance, solventFrontDistance) {
  if (!solventFrontDistance || solventFrontDistance === 0) return 0;
  return componentDistance / solventFrontDistance;
};

var calculateNaOHMolarity = function(hclConc, hclVolume, naohVolume) {
  if (!naohVolume || naohVolume === 0) return 0;
  return (hclConc * hclVolume) / naohVolume;
};

var calculateMeanTitre = function(trials) {
  if (!trials || trials.length === 0) return 0;
  var total = 0;
  for (var i = 0; i < trials.length; i++) {
    total += trials[i];
  }
  return total / trials.length;
};
