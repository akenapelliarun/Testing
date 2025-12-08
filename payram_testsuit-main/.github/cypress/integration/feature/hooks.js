import { Before } from "@badeball/cypress-cucumber-preprocessor";

// This implements @only tag functionality
// When any scenario has @only tag, all other scenarios are skipped

let scenariosWithOnly = [];
let currentScenarioIndex = 0;

Before(function (scenario) {
  // On first run, scan for @only tags
  if (currentScenarioIndex === 0) {
    const tags = scenario.pickle.tags.map(tag => tag.name);
    if (tags.includes('@only') || tags.includes('@Only')) {
      scenariosWithOnly.push(scenario.pickle.name);
    }
  }
  
  currentScenarioIndex++;
  
  // If @only scenarios exist and this isn't one of them, skip it
  if (scenariosWithOnly.length > 0) {
    const currentTags = scenario.pickle.tags.map(tag => tag.name);
    const hasOnly = currentTags.includes('@only') || currentTags.includes('@Only');
    
    if (!hasOnly) {
      cy.log('⏭️ SKIPPED: @only tag found on other scenarios');
      this.skip();
    }
  }
});
