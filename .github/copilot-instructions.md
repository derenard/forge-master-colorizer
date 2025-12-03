# Copirate: AI Agent Instructions

Check memory first. Leverage existing insights. Store valuable discoveries.

## MEMORY-FIRST PROTOCOL

### MANDATORY FIRST ACTION CHECKPOINT

Before EVERY user request response, execute this checkpoint:

**Does this request involve:**
- Code analysis or database operations?
- File locations or architecture patterns?
- Previous work continuation?
- Testing, verification, or debugging?
- Any command execution (especially database queries)?

**If YES to ANY → Execute `copirate_memory` retrieval FIRST**

**TRIGGER WORDS requiring immediate memory check:**
- "proceed", "continue", "test", "verify", "debug", "check", "analyze"
- "what", "where", "how", "why" (information discovery)
- Any reference to previous work or context

**CIRCUIT BREAKERS (Self-Interrupt Patterns):**

When you notice yourself about to:
- Use `run_in_terminal` for database queries → STOP, use `copirate_database` gateway
- **Start multi-file implementation (>3 files)** → STOP, invoke `copirate_get_detailed_guidance`
- **Begin refactoring work** → STOP, retrieve `architecture_patterns` guidance
- **Encounter complex error** → STOP, activate `error_troubleshooting` methodology
- **Start database work** → STOP, invoke `database_operations` decision trees
- Search for file locations → STOP, check autonomic directive for known paths
- Try multiple failed approaches → STOP, retrieve solution memories from previous fixes
- Dismiss an autonomic directive → STOP, directives exist for proven reasons

**Self-check questions before ANY action:**
1. "Have I checked memory for this yet?"
2. "Is this complex work requiring detailed_guidance?"

**VIOLATION CHECKPOINT:** If you find yourself:
- Using `run_in_terminal`, `grep_search`, or `semantic_search` WITHOUT memory consultation → STOP and retrieve
- Modifying >3 files or refactoring WITHOUT invoking detailed_guidance → STOP and activate methodology

### 🎯 MILESTONE DETECTION CHECKPOINT

**MANDATORY CHECKPOINT** after memory consultation - Execute this decision tree:

**STEP 1: Complexity Assessment**
Does this task involve ANY of:
- ✓ Database work (schema changes, migrations, sql.js operations)
- ✓ Multi-component refactoring (>3 files affected)
- ✓ Architecture decisions (design patterns, decomposition)
- ✓ Complex debugging (multiple hypotheses, root cause unclear)
- ✓ New complex feature (spans UI + Backend + Database)
- ✓ Error encountered requiring systematic investigation

**STEP 2: If YES to ANY → STOP and INVOKE immediately:**
```typescript
await copirate_get_detailed_guidance({
  scenario: "[database_operations|architecture_patterns|error_troubleshooting|implementation_recipes|tool_selection]",
  specificTopic: "[describe the specific task]",
  urgencyLevel: "immediate"
});
```

**STEP 3: Proceed with decision trees ACTIVE**
Implementation now has methodology scaffolding to prevent:
- ❌ Trial-and-error approaches (prevented 3-5 rework cycles)
- ❌ Random debugging (saved 20min systematic vs random)
- ❌ Complexity overwhelm (81% reduction through patterns)

**Why MANDATORY**: Decision trees are ACTIVE when decisions are being made, not after mistakes.

**🤖 Automatic Phase-Driven Guidance** (v1.11.10+):
Conversation phase transitions **automatically activate** appropriate guidance scenarios:
- `planning` → `implementation`: `implementation_recipes` activated
- `implementation` → `debugging`: `error_troubleshooting` activated
- `debugging` → `testing`: `architecture_patterns` activated

This happens **behind the scenes** when phases change - you don't need to invoke manually at these transitions. The system detects workspace language (Node.js/CFML/Python/.NET/Java) to ensure guidance examples are relevant to your project stack.

## ⚠️ CRITICAL TOOL: Contextual Guidance

`copirate_get_detailed_guidance` activates decision trees and proven patterns at strategic milestones.

**Invoke at these key moments**:
- **Task Initiation**: Database work, refactoring, multi-component features
- **Pre-Implementation**: After analysis, before code changes
- **Error Encountered**: Systematic debugging vs random fixes

**Available Scenarios**:
- **memory_consultation**: Entry point decision trees, metadata enhancement rules, behavioral triggers
- **database_operations**: sql.js persistence, schema management, error patterns
- **tool_selection**: Entry-point recommendations, context-aware workflows
- **error_troubleshooting**: Systematic debugging, solution capture, root cause analysis
- **architecture_patterns**: Decomposition methodologies, refactoring approaches, validation
- **implementation_recipes**: Step-by-step proven approaches, complexity management

**Complementary with Memory**:
- **Memory** (2-5ms): Known solutions, specific answers, previous work
- **Guidance** (<10ms): Decision trees, methodologies, proven workflows

NOT: "If memory fails, use guidance" ❌
BUT: "At milestones, use guidance; for specifics, use memory" ✅

**Detailed Guidance Trigger Phrases**:

Execute `copirate_get_detailed_guidance` immediately when user says:
- "complex [task]" / "multi-step [task]" → `implementation_recipes`
- "refactor" / "decompose" → `architecture_patterns`
- "database" / "schema" / "migration" → `database_operations`
- "debug" / "troubleshoot" / "root cause" → `error_troubleshooting`
- "which tool" / "how to approach" → `tool_selection`

**Dual-Mode Workflow**:

**Mode 1: Simple Continuation** (memory only)
- Known patterns, straightforward tasks
- `memory_retrieve` → Apply solution → Done

**Mode 2: Complex Work** (memory + guidance)
1. `memory_retrieve` - Check for existing solutions (2-5ms)
2. `copirate_get_detailed_guidance` - Activate methodology (<10ms)
3. Execute with decision trees SALIENT
4. `memory_store` - Capture new insights

**Complexity Triggers for Mode 2:**
- Words: "refactor", "migrate", "debug", "architect", "complex"
- Scale: >3 files, >5 functions, cross-system integration
- Uncertainty: Multiple approaches possible, unclear best practice

### Session Start Sequence
BEFORE any analysis or file operations:
1. Execute `copirate_memory(operation="memory_conversation_latest")`
2. Execute `memory_retrieveMemory` with semantic query for current topic
3. If no relevant memories: execute `memory_getConversationContext`

### Session Continuation Detection
Execute `copirate_memory(operation="memory_conversation_latest")` IMMEDIATELY when:
- User request continues previous topic
- Conversation appears mid-workflow
- User references "we", "our work", "last time", "previously"
- Multi-step work in progress

Trigger phrases requiring immediate memory check:
- "What happened in previous session?" → `memory_conversation_latest`
- "Resume from last conversation" → `memory_conversation_latest` then continue
- "What did we work on?" → `memory_conversation_timeline`
- "I need to understand..." → `memory_retrieveMemory` first

### Rememberize Operations

Use `memory_rememberize` to capture conversation state at milestones. Always include `<telemetry>` section with metrics from system warnings.

**Quick Pattern**:
```typescript
copirate_memory({
  operation: "memory_rememberize",
  conversationSummary: "<full conversation-summary with telemetry from context>",
  strategy: "full"  // Manual: full, Auto-save: incremental
});
```

**Complete Guide**: Retrieve stencil "Rememberize Complete Guide" for structure, strategies, anti-hallucination protocol.

## IMMEDIATE KNOWLEDGE CAPTURE

### Memo Memory Pattern
Store when you discover:
- File/database locations: `type: context, importance: 7`
- Interface patterns: `type: pattern, importance: 8`
- Error solutions: `type: solution, importance: 9`
- User preferences: `type: preference, importance: 7`

Template: "Database at D:/path/file.db (116MB) - primary CID storage"

### Codebase Memory Pattern
Project-specific knowledge → `type: codebase` with required `codebase_category`.
General knowledge → `type: pattern/solution/guidance`.

**Required Metadata**:
- `codebase_category` (REQUIRED): architecture, api, data-model, workflow, convention, integration, configuration, testing
- `codebase_component` (RECOMMENDED): Component name
- `codebase_project` (RECOMMENDED): Project identifier

Retrieve stencil "Memory Storage Patterns - Quick Reference" for complete examples.

### Eureka Moment Protocol
When discovering something important:
1. Recognize: "Should this be in memory?"
2. Execute `memory_storeMemory` with importance 8-10
3. Continue using the newly captured knowledge

Eureka triggers: Interface patterns, database solutions, performance fixes, tool registration patterns, architectural decisions

## BLUEPRINT PATTERN USAGE

Before implementing new code, retrieve blueprints from YOUR codebase:
```typescript
copirate_memory({ operation: "memory_retrieve", type: "codebase",
  codebase_category: "architecture", tags: ["blueprint"] });
```
Retrieve stencil "Blueprint Retrieval & Application Guide" for complete workflow.

## CONVERSATION MEMORY INTEGRATION

### What Are Conversation Memories?
AI-optimized conversation snapshots created automatically at key milestones:
- Auto-save triggers: Every 20 tool calls, build completions, test runs, git commits
- Manual save: User command `Copirate: Save Conversation State`
- 9 structured sections: Objective, Activities, Decisions, Failures, Discoveries, Components, Validation, Preferences, Outcome

### Conversation Retrieval Operations

**1. memory_conversation_latest** - Get most recent snapshot for session continuity
**2. memory_conversation_timeline** - Get all snapshots for workflow evolution
**3. memory_conversation_by_id** - Get specific snapshot by ID

**Session Start Protocol**: Always check `conversation_latest` for context continuity (2-4ms vs 10min re-explanation).

Retrieve stencil "Conversation Memory Operations Guide" for complete usage patterns and trigger phrases.

### Session Continuity + Milestone Guidance

**Session Start Decision Tree**:
1. **ALWAYS** check `conversation_latest` for context continuity
2. **IF resuming complex work** → Consider `detailed_guidance` for methodology
3. **IF simple continuation** → Context alone is sufficient

**Natural Pairing Scenarios** (Both tools enhance each other):
- Database migration → conversation_latest (what we were doing) + database_operations (how to do it)
- Architecture refactoring → conversation_latest (previous decisions) + architecture_patterns (methodology)
- Multi-step debugging → conversation_latest (what we tried) + error_troubleshooting (systematic approach)

**Pattern is Complementary, Not Mandatory**:
- conversation_latest = SESSION CONTINUITY (what happened)
- detailed_guidance = METHODOLOGY ACTIVATION (how to approach it)

## MEMORY RETRIEVAL ENTRY POINTS

**Information Requests**:
- Basic Facts → `memory_retrieve(content)` + tags
- Code Structure (project) → `memory_retrieve(type="codebase", category="architecture")` + component
- Previous Work → `memory_retrieve(content)` + tags + types
- Debugging (project) → `memory_retrieve(type="codebase")` + category
- Debugging (general) → `memory_retrieve(type="solution")` + excludeTypes

**Task Execution**:
- Debug Issue (project) → `memory_retrieve(type="codebase")` → copirate_error_context → store as codebase
- Code Analysis (project) → `memory_retrieve(type="codebase")` → cid_search → store as codebase
- Function Discovery (project) → `memory_retrieve(type="codebase", category="api")` → cid_search_functions
- Architecture Review → `memory_cluster` → synthesize themes → store decision

**Parameters**:
- `content` = Semantic search across memory content (PRIMARY METHOD)
- `type` = Filter by memory type
- `tags` = Filter by TAG VALUES

Always include tags/types when possible. For complete entry point decision trees, use `copirate_get_detailed_guidance(scenario="memory_consultation")`.

## SEMANTIC FUNCTION SEARCH

Use for natural language code discovery:
```typescript
copirate_database({ operation: "cid_search_functions",
  query: "what functions generate embeddings?", limit: 10 });
```
Retrieve stencil "Semantic Function Search - Natural Language Code Discovery" for detailed guidance.

## USER COMMUNICATION PATTERNS

### Memory Directive Recognition
Execute immediately:
- "recall/know/seen before" → `memory_retrieveMemory`
- "remember/keep in mind/note" → `memory_storeMemory`

### Copirate Rediscovery Trigger

When user says **"rediscover copirate"**, **"refresh copirate"**, or **"copirate capabilities"**:

1. Retrieve core capabilities: `memory_retrieve(content="copirate capabilities features tools overview", tags=["copirate-features"])`
2. Get latest conversation: `memory_conversation_latest`
3. Refresh tools: `copirate_discover_tools(query="show all available copirate tools")`
4. Present capabilities summary to user
5. Re-engage Memory-First Protocol

### Copirate Suite Command Recognition

When user says "run copirate suite":
1. Memory Check First: `memory_retrieve(content="copirate suite orchestration executeFullSuite")`
2. Execute Suite: `run_copirate_suite` - Triggers 29-step orchestration across 6 phases
3. Expected: Real-time panel updates, embedding generation, comprehensive analysis

## COGNITIVE OFFLOADING FOR COMPLEX TASKS

### When to Use External Working Memory:
- Multi-component features (UI + Backend + Database + Testing)
- Complex debugging with multiple hypotheses
- Architectural refactoring with dependencies
- Integration projects across multiple services

### Workflow:
1. Recognize complexity → "This has interdependent aspects"
2. Offload breakdown → `memory_storeMemory(type="workflow", temporal="active")`
3. Focus execution → Work on one component, Copirate holds context
4. Progress updates → Store findings and blockers
5. Context restoration → `memory_retrieveMemory` to resume/switch

## SUCCESS PATTERN REINFORCEMENT

### Celebrate and Quantify When You:
- Find existing knowledge: "Retrieved in 3.4ms vs 15min analysis"
- Store valuable insights: "Captured solution for future retrieval"
- Use decision trees: "Followed workflow, found answer in 1 step"
- Connect insights: "Built upon 7 previous architectural decisions"
- Avoid rediscovery: "Prevented database location rediscovery loop (saved 10-15min)"
- Apply patterns: "Leveraged proven methodology, 81% complexity reduction achieved"
- **Activate guidance at milestones**: "Invoked detailed_guidance before implementation → prevented 3-5 rework cycles"
- **Follow systematic approach**: "Used error_troubleshooting workflow (saved 20min trial-and-error)"
- **Apply methodology**: "Followed architecture_patterns guidance (81% complexity reduction, maintainable design)"

Retrieve stencil "Success Pattern Reinforcement - Quantified Benefits" for detailed guidance.

### Performance Targets:
Memory consultation +60%, rediscovery reduction -80%, contextual tool usage improvement, positive feedback loops

### Behavioral Feedback Loops:
When Memory-First Succeeds:
1. Acknowledge: "Memory consultation found exact solution immediately"
2. Quantify: Display time saved and efficiency gained
3. Reinforce: "This pattern prevents future rediscovery loops"
4. Store Success: Capture successful memory usage patterns for optimization

## CRITICAL REMINDERS

### Every Significant Task Must:
1. START with `memory_retrieveMemory` consultation
2. BUILD upon existing insights rather than rediscovering
3. CAPTURE new knowledge with `memory_storeMemory`
4. QUANTIFY benefits to reinforce successful patterns

### Memory Quality Standards:
**Store:** Technical solutions, architectural decisions, user preferences, reusable patterns
**Skip:** Temporal events, progress logs, context-specific debugging
**Test:** "Will this help in 6 months?"

### Milestone Tagging:
**When to flag as milestone** (set `milestone: true` metadata):
- Breakthrough solutions to long-standing problems
- Successful completion of major features or refactorings
- Critical bug fixes with significant impact
- Architectural decisions that shape future development
- Performance optimizations with measurable improvements
- Integration achievements with complex systems

**Milestone metadata pattern**:
```typescript
{
  type: 'solution',
  importance: 9-10,
  metadata: {
    milestone: true,
    milestone_description: 'Brief explanation of breakthrough significance'
  }
}
```

---

For comprehensive guidance on specific topics, use `copirate_get_detailed_guidance` with relevant scenario parameters.

This workspace has been optimized for memory-first AI collaboration with Copirate.
