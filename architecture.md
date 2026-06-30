# Architecture

This document defines the frozen architecture of the agent framework.

---

# High-Level Architecture

```text
                Application
                     │
              createAgent()
                     │
             ┌───────▼────────┐
             │ AgentRuntime   │
             └───────┬────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   Planner                  Provider
        │                         │
        ▼                         ▼
 Plan (tool calls)        LLM API / Streaming
        │
        ▼
 ToolRegistry
        │
        ▼
 Registered Tools
```

---

# Dependency Hierarchy

```text
Application
      │
      ▼
AgentRuntime
      │
      ├──────────────┐
      ▼              ▼
Planner       ToolRegistry
      │              │
      ▼              ▼
Provider        Tool(s)

      ▲
      │
 AgentContext (shared by all)
```

---

# AgentRuntime

## Works Under It

- Planner
- ToolRegistry
- AgentContext

## Works Above It

- User application
- `createAgent()` (optional)

## State

**Stateful**

Owns the execution lifecycle while shared execution state lives inside
`AgentContext`.

## Public API

```ts
constructor(ctx: AgentContext)

run(input: string): Promise<AgentResponse>

stream(input: string): AsyncIterable<AgentEvent>
```

## Specifications

- Main orchestrator.
- Owns the execution loop.
- Calls the planner.
- Executes tool calls through the registry.
- Updates conversation history.
- Stops when a final response is produced.
- Never executes tools directly.
- Does not contain provider-specific logic.

## Features

- Multi-step reasoning
- Tool execution loop
- Streaming
- Error propagation
- Context management
- Extensible lifecycle

---

# Planner

## Works Under It

- Provider

## Works Above It

- AgentRuntime

## State

**Stateless**

## Public API

```ts
plan(ctx: AgentContext): Promise<Plan>
```

## Specifications

- Determines the next action.
- Uses the provider to query the model.
- Returns either a Tool Call or Final Response.
- Never executes tools.
- Never mutates context.
- Never controls execution flow.

## Features

- Function calling
- Structured output parsing
- Provider abstraction
- Model-agnostic planning

---

# Provider

## Works Under It

- LLM SDKs
- OpenAI
- Anthropic
- Gemini
- OpenRouter

## Works Above It

- Planner

## State

**Mostly Stateless**

Stores configuration only. Conversation state is supplied externally.

## Public API

```ts
chat(request): Promise<ModelResponse>

stream(request): AsyncIterable<ModelChunk>
```

## Specifications

- Wraps a model provider.
- Normalizes provider responses.
- Normalizes tool calls.
- Handles authentication.
- Handles retries.
- Contains no execution logic.
- Contains no planning logic.

## Features

- Streaming
- Tool calling
- Retry policies
- Provider normalization
- Provider-specific configuration

---

# ToolRegistry

## Works Under It

- Tool

## Works Above It

- AgentRuntime

## State

**Stateful**

Maintains registered tools.

## Public API

```ts
register(tool);

unregister(name);

get(name);

list();

execute(call, ctx);
```

## Specifications

- Stores registered tools.
- Resolves tool names.
- Executes tools.
- Returns tool results.
- Handles unknown tool errors.
- Does not perform planning.

## Features

- Dynamic registration
- Tool lookup
- Tool execution
- Validation
- Registry inspection

---

# Tool

## Works Under It

Nothing.

## Works Above It

- ToolRegistry

## State

**Stateless (recommended)**

## Public API

```ts
execute(input, ctx);

metadata;
```

## Specifications

- Encapsulates one capability.
- Receives validated input.
- Produces structured output.
- Independent from runtime.
- Independent from provider.

## Features

- Reusable
- Testable
- Portable
- Strongly typed

---

# AgentContext

## Works Under It

Nothing.

## Works Above It

- AgentRuntime
- Planner
- ToolRegistry
- Tools

## State

**Stateful**

Shared execution state.

## Public API

```ts
messages;

provider;

registry;

state;

memory;

logger;

cache;
```

## Specifications

- Shared dependency container.
- Stores execution state.
- Passed throughout the runtime.
- Contains no business logic.

## Features

- Conversation history
- Shared dependencies
- Execution state
- Extensible storage

---

# Plan

## Works Under It

Nothing.

## Works Above It

- Planner
- AgentRuntime

## State

**Immutable**

## Public API

```ts
ToolCallPlan;

FinalResponsePlan;
```

## Specifications

- Represents the planner's decision.
- Contains no execution logic.
- Consumed only by the runtime.

## Features

- Strong typing
- Predictable execution
- Provider-independent representation

---

# Design Principles

- AgentRuntime is the single orchestrator.
- Planner decides the next action but never executes.
- Provider is purely an LLM adapter.
- ToolRegistry owns registration and execution.
- Tools are independent and reusable.
- AgentContext contains shared state and dependencies.
- Runtime receives only an `AgentContext`.
- Dependencies flow in one direction.
- Each component has a single responsibility.
