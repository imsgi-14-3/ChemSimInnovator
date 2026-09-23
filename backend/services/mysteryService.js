var MysteryService = {
  getConfig: function() { return { samples: MYSTERY_SAMPLES || [] }; },
  getSamples: function() { return MYSTERY_SAMPLES || []; },
  getSample: function(id) {
    var samples = MYSTERY_SAMPLES || [];
    for (var i = 0; i < samples.length; i++) {
      if (samples[i].id === id) return samples[i];
    }
    return null;
  }
};
