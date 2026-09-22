var LogService = {
  getEntries: function() { try { return JSON.parse(localStorage.getItem('chemsim_log') || '[]'); } catch(e) { return []; } },
  addEntry: function(entry) { var entries = LogService.getEntries(); entries.push(entry); localStorage.setItem('chemsim_log', JSON.stringify(entries)); },
  deleteEntry: function(index) { var entries = LogService.getEntries(); entries.splice(index, 1); localStorage.setItem('chemsim_log', JSON.stringify(entries)); },
  clearAll: function() { localStorage.removeItem('chemsim_log'); }
};
