# World-Building Algorithm
*A systematic approach to creating interconnected narrative elements*

## Algorithm Overview
```pseudocode
function buildNarrativeWorld(seedStory):
    // Initialize tracking sets
    entities = new Set()
    createdPages = new Set()
    
    // Extract core elements
    function extractEntities(story):
        places = findProperNouns(story, type="place")
        characters = findProperNouns(story, type="character")
        items = findProperNouns(story, type="item")
        organizations = findProperNouns(story, type="organization")
        
        return {
            places: places,
            characters: characters,
            items: items,
            organizations: organizations
        }
    
    // Create hierarchy of dependencies
    function createHierarchy(entities):
        graph = new DirectedGraph()
        
        for each entity in entities:
            for each otherEntity in entities:
                if entity.mentions(otherEntity):
                    graph.addEdge(entity, otherEntity)
        
        return graph.topologicalSort()
    
    // Generate interconnected pages
    function generatePages(sortedEntities):
        for each entity in sortedEntities:
            if not createdPages.has(entity):
                page = createPage(entity)
                addWikilinks(page, entities)
                addCrossReferences(page, createdPages)
                createdPages.add(entity)
                
                // Add relevant categories and metadata
                addCategories(page)
                addFrontmatter(page)
    
    // Main execution flow
    extracted = extractEntities(seedStory)
    entities.addAll(extracted)
    
    sortedEntities = createHierarchy(entities)
    generatePages(sortedEntities)
    
    return createdPages

function addWikilinks(page, entities):
    for each entity in entities:
        if page.mentions(entity):
            replaceWithWikilink(entity)

function addCrossReferences(page, existingPages):
    relevantPages = findRelatedContent(page, existingPages)
    addReferencesSection(page, relevantPages)
```

## Usage Example
Using the [[Fartbucket-Tavern-Incident]] as a seed story:

1. Extracted entities:
   - Places: [[Drunken Dragon Tavern]], [[Khazad-Morr]], etc.
   - Characters: [[Fartbucket]], [[Grundin Steelbeard]], etc.
   - Items: [[Giggling Geode]], [[Gigglecap Luminaris]]
   - Organizations: [[Guild Masters]]

2. Created hierarchy based on mentions and dependencies

3. Generated interconnected pages with consistent cross-references

## Best Practices
1. Extract all proper nouns first
2. Create parent locations/organizations before dependents
3. Ensure bidirectional linking
4. Maintain consistent categories and tags
5. Include metadata and frontmatter
6. Cross-reference related content
7. Add hooks for future expansion

## Common Categories
- Characters (#character #npc)
- Locations (#location #city #tavern)
- Items (#item #artifact)
- Organizations (#organization #guild)
- Events (#event #incident)
- Systems (#system #process)

## Frontmatter Template
```yaml
---
title: Entity Name
type: [character|location|item|organization]
status: [active|historical|legendary]
related:
  - [[Related Entity 1]]
  - [[Related Entity 2]]
tags:
  - relevant-tag-1
  - relevant-tag-2
---
```

#systems #algorithms #world-building