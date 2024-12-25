---
title: NovaSytem FastAPI Layer
related:
  - "[[NovaSystem FastAPI Layer Dev Log]]"
---
Below is the updated **FastAPI-Based Benchmarker TRD** with **no timelines** and **an additional layer of detail** for every section. Each point now includes sub-goals clarifying what must be done and how. Enjoy!

---

# **Technical Requirements Document (TRD)**

## **FastAPI-Based Benchmarker**

---

## **1. Overview**

The purpose of this TRD is to define the requirements, architecture, and specifications for a **FastAPI-based** application that **benchmarks local Large Language Models (LLMs)** via [Ollama](https://google.com/search?q=Ollama). The system will collect detailed performance metrics, store results in a database (MongoDB), and provide a lightweight web interface for users to submit prompts, compare metrics, and review historical benchmarks.

### **Sub-Goals**

1. **Define the core functionalities**:
    - Identify how requests are sent to local LLMs (via Ollama).
    - Define the structure for performance data collection.
2. **Decide on the tech stack**:
    - FastAPI for the web/API layer.
    - MongoDB for data persistence.
    - Jinja2 templates and JavaScript for a minimal UI.
3. **Ensure maintainability**:
    - Clear separation of concerns: services, models, routers, etc.
    - Sufficient documentation and test coverage.

---

## **2. Scope**

- **System Name**: Ollama Benchmarker
- **Users**:
    - Developers or ML Engineers evaluating local model performance.
    - QA engineers verifying consistent model output over time.
    - Non-technical stakeholders needing a simple UI for side-by-side comparisons.
- **In-Scope**:
    - Benchmarking local LLMs through Ollama.
    - Collecting system usage metrics (CPU, memory, GPU).
    - Timing metrics (time to first token, total time, chunk times).
    - Logging and storing user prompt, model response, and benchmarks.
    - Simple UI to input prompts, configure models, and explore results history.
- **Out-of-Scope**:
    - Cloud-based LLM integration.
    - Production-grade security measures such as full user management.

### **Sub-Goals**

1. **Precisely define what “benchmarking” includes**:
    - Confirm which metrics (CPU, memory, GPU usage, etc.) are relevant.
    - Confirm which timing metrics (time to first chunk, total time, chunk throughput) matter.
2. **Clarify minimal UI**:
    - Outline the page(s) needed.
    - Identify user flows for setting prompts, viewing real-time benchmarks, and retrieving history.
3. **Define exclusions**:
    - Maintain focus on local LLMs.
    - No third-party authentication or advanced user system.

---

## **3. Objectives**

1. **Collect Performance Data**
    - Gather standardized metrics for consistent cross-model comparisons.
2. **Compare and Visualize**
    - Persist results to MongoDB (or JSON fallback) for historical trend analysis.
    - Provide an interface that highlights differences (e.g., CPU usage, response speed).
3. **Ease of Use**
    - Enable quick user prompts in a minimal UI with minimal overhead.
    - Generate structured benchmark results (JSON) automatically.
4. **Maintainability**
    - Keep code modular, consistent, and thoroughly tested.
    - Ensure that system can be extended with additional metrics or new LLMs.

### **Sub-Goals**

1. **Performance Data Depth**:
    - Include CPU frequency fluctuations, memory usage deltas, GPU usage if applicable.
    - Manage detailed timing for chunked responses.
2. **Data Visualization**:
    - Provide tabular listings of historical benchmarks.
    - Offer basic statistical summaries (min, max, average).
3. **UI Simplicity**:
    - Accept prompt input and model list.
    - Display results in real time or near real time with minimal confusion.
4. **Long-Term Maintainability**:
    - Use PEP8 style guidelines.
    - Keep test coverage at a high level.
    - Document all major classes and methods.

---

## **4. Architecture**

```
                  ┌─────────────┐
                  │   Web UI    │
                  │(HTML/JS/CSS)│
                  └─────────────┘
                         │
                         ▼
                 ┌────────────────┐
                 │ FastAPI Server │
                 │   (app/main)   │
                 └────────────────┘
                   ┌─────────────┬─────────────┬──────────────────┐
                   ▼             ▼             ▼                  ▼
              ┌───────────┐  ┌──────────┐  ┌────────────┐   ┌────────────┐
              │ Routers   │  │ Models   │  │ Services    │   │ Templates  │
              │(benchmarks│  │(Pydantic)│  │(benchmark,  │   │(index.html)│
              │   etc.)   │  │          │  │ storage,    │   └────────────┘
              └───────────┘  └──────────┘  │  ollama)    │
                                            └────────────┘
                                                │
                                                ▼
                                         ┌────────────┐
                                         │ MongoDB /   │
                                         │  JSON Files │
                                         └────────────┘
```

- **FastAPI** orchestrates HTTP requests.
- **Routers** separate concerns (benchmarks, history).
- **Services** contain business logic (benchmark, storage, Ollama interactions).
- **Models** define request and response formats using [Pydantic](https://google.com/search?q=Pydantic).
- **MongoDB** persists data (fallback: JSON file store).
- **Templates + JS** for minimal user interface.

### **Sub-Goals**

1. **Clear Layered Architecture**:
    - Separate each function of the system into logical modules (API, services, data models).
2. **Future-Proofing**:
    - Keep an open design for adding new LLM backends besides Ollama if needed.
3. **Minimal Complexity**:
    - Ensure the system is straightforward and not over-engineered for the current scope.

---

## **5. Detailed Requirements**

### **5.1. Functional Requirements**

1. **Model Benchmarking**
    - **Req-F-1**: Accept a list of models to benchmark given a user prompt.
    - **Req-F-2**: Measure time to first chunk, total processing time, chunk sizes, etc.
    - **Req-F-3**: Track CPU, memory usage, and optional GPU usage over the benchmark duration.
    - **Req-F-4**: Capture and store the model response text for reference.
2. **Data Storage**
    - **Req-F-5**: Persist all benchmark data in MongoDB (or JSON) including ID, timestamps, model metadata, user prompt.
    - **Req-F-6**: Store basic system hardware info (CPU cores, total memory, OS info) for context.
3. **Data Retrieval**
    - **Req-F-7**: Provide an endpoint to retrieve the entire benchmark history.
    - **Req-F-8**: Provide an endpoint to retrieve a single benchmark by ID.
4. **Web Interface**
    - **Req-F-9**: Let users input a prompt, specify selected models, and run the benchmark from the browser.
    - **Req-F-10**: Show benchmark results in real time or near real time in the UI.
    - **Req-F-11**: Let users browse, sort, or filter historical benchmarks.
5. **Error Handling**
    - **Req-F-12**: Gracefully handle errors (timeouts, missing models), returning appropriate HTTP codes and messages.
    - **Req-F-13**: Log errors in a structured manner for debugging.

#### **Sub-Goals for Each Functional Requirement**

1. **Req-F-1**: Implement a POST endpoint accepting a `BenchmarkRequest` (prompt, list of models).
2. **Req-F-2**: During model inference, record timestamps for the first token and the entire generation.
3. **Req-F-3**: Use [psutil](https://google.com/search?q=psutil) or an equivalent library to record CPU/mem usage over the request duration.
4. **Req-F-4**: Append the final text output from the model to the result object.
5. **Req-F-5**: Convert results to a Pydantic model and store them in MongoDB or a local JSON file.
6. **Req-F-6**: Use a system metrics function to store CPU/memory/gpu stats with each benchmark.
7. **Req-F-7**: Implement a GET endpoint returning a list of recent benchmarks in reverse chronological order.
8. **Req-F-8**: Implement a GET endpoint accepting a benchmark ID to fetch a single record.
9. **Req-F-9**: Provide an HTML page with a prompt input box and a multi-select for models.
10. **Req-F-10**: Render partial results in the UI as soon as possible, or show a loading animation if synchronous.
11. **Req-F-11**: Provide a history tab or section to display stored benchmarks and filter them by timestamp or model.
12. **Req-F-12**: Throw or catch exceptions (e.g. `HTTPException`) for misconfigurations and timeouts.
13. **Req-F-13**: Log the detailed stacktrace and user-facing messages at different log levels.

---

### **5.2. Non-Functional Requirements**

1. **Performance**
    - **Req-NF-1**: The system must handle concurrent benchmark requests (async/await).
    - **Req-NF-2**: The system must not hang for indefinite durations; a maximum benchmark time or cancellation approach is recommended.
2. **Scalability**
    - **Req-NF-3**: The design should allow easy containerization or running across multiple processes.
3. **Security**
    - **Req-NF-4**: Sanitize all prompt input to avoid injection attacks.
    - **Req-NF-5**: Keep environment-specific secrets (MongoDB credentials) out of the code repository.
4. **Maintainability**
    - **Req-NF-6**: Code should follow PEP8 style guidelines.
    - **Req-NF-7**: Each major module should be covered by unit or integration tests.
5. **Usability**
    - **Req-NF-8**: UI must allow a novice user to run a benchmark with minimal instructions.

#### **Sub-Goals for Each Non-Functional Requirement**

1. **Req-NF-1**: Properly implement FastAPI concurrency with `async` routes.
2. **Req-NF-2**: Add a configurable timeout for model inference.
3. **Req-NF-3**: Provide a Dockerfile or deployment instructions.
4. **Req-NF-4**: Validate/sanitize all input and ensure no direct shell injection.
5. **Req-NF-5**: Rely on environment variables or secrets manager for DB credentials.
6. **Req-NF-6**: Enforce style checking with a tool like `black` or `flake8`.
7. **Req-NF-7**: Create a test suite with coverage metrics for each module.
8. **Req-NF-8**: UI layout is simple, label inputs clearly, show success/error messages.

---

## **6. API Endpoints**

|**Endpoint**|**Method**|**Description**|**Request Body**|**Response**|
|---|---|---|---|---|
|`/api/benchmarks/run`|POST|Run benchmarks on selected models|`BenchmarkRequest`|`BenchmarkResponse` (JSON)|
|`/api/benchmarks/history`|GET|Get recent benchmarks in descending timestamp|None|Array of `BenchmarkResponse`|
|`/api/benchmarks/history/{id}`|GET|Retrieve a specific benchmark by ID|None|A single `BenchmarkResponse` or error|

### **Sub-Goals**

1. **Implement POST logic** (`/api/benchmarks/run`):
    - Validate the incoming request.
    - Launch concurrent tasks to benchmark each model.
    - Return a `BenchmarkResponse`.
2. **Implement GET logic** (`/api/benchmarks/history`):
    - Query the storage backend for the most recent benchmarks.
    - Return a list of responses.
3. **Implement GET logic** (`/api/benchmarks/history/{id}`):
    - Validate the `id` type (ObjectId or string).
    - Return the single benchmark document or 404 if not found.

---

## **7. Data Models**

```python
# app/models/benchmark.py

from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime

class BenchmarkRequest(BaseModel):
    prompt: str
    models: List[str] = ["wizardlm2", "nemotron-mini", "llama3.2"]
    parameters: Optional[Dict] = None

class SystemInfo(BaseModel):
    platform: str
    processor: str
    python_version: str
    cpu: Dict
    memory: Dict
    gpu: Optional[List[Dict]]

class BenchmarkResult(BaseModel):
    model: str
    timing: Dict
    throughput: Dict
    system_impact: Dict
    success: bool
    timestamp: datetime
    prompt: str
    response: Optional[str]

class BenchmarkResponse(BaseModel):
    timestamp: datetime
    system_info: SystemInfo
    results: List[BenchmarkResult]
```

### **Sub-Goals**

1. **BenchmarkRequest**:
    - Must contain prompt, models, and optional generation parameters (e.g., temperature, top_k).
2. **SystemInfo**:
    - Collect platform, CPU, memory, GPU details at the start of each benchmark run.
3. **BenchmarkResult**:
    - Store model name, timing details, throughput data, system impact, success status, final text response.
4. **BenchmarkResponse**:
    - Wraps the entire benchmark run with a timestamp and system info, plus the list of results.

---

## **8. Implementation Sketch**

A high-level code layout demonstrating how the components interact:

1. **`app/main.py`**
    - FastAPI entry point, sets up routing and templates.
2. **`app/routers/benchmarks.py`**
    - Contains `/api/benchmarks/run`, `/api/benchmarks/history`, `/api/benchmarks/history/{id}` endpoints.
3. **`app/services/benchmark.py`**
    - Orchestrates concurrency for multiple models.
    - Uses an `ollama_client` for local LLM interaction.
    - Wraps data in `BenchmarkResponse`.
4. **`app/services/storage.py`**
    - Persists data to MongoDB (or fallback JSON).
    - Retrieves records for history or a specific ID.
5. **`app/services/ollama_client.py`**
    - Hypothetical wrapper over Ollama CLI or local server.
    - Returns chunk timing, text output, and throughput stats.
6. **`app/utils/system_metrics.py`**
    - Gathers CPU/mem usage with `psutil` before and after model inference.

### **Sub-Goals**

1. **`app/main.py`**:
    - Register the `benchmarks` router.
    - Mount static files for the minimal UI.
2. **`app/routers/benchmarks.py`**:
    - Validate input with Pydantic.
    - Call `BenchmarkService` methods.
    - Handle exceptions for non-existent IDs.
3. **`app/services/benchmark.py`**:
    - Spawn async tasks for each model to measure concurrency.
    - Compute and record system metrics before and after run.
    - Return structured data in a `BenchmarkResponse`.
4. **`app/services/storage.py`**:
    - Insert new documents in `save_benchmark()`.
    - Support basic queries like `.find({}).sort("timestamp", -1)`.
5. **`ollama_client.py`**:
    - Might use async `subprocess` calls or an HTTP client.
    - Parse chunk times if provided by Ollama.
6. **`system_metrics.py`**:
    - Snapshot CPU/mem usage at the start and end.
    - Potentially log usage at intervals throughout the run.

---

## **9. Error Handling & Logging**

- **Use `HTTPException`** for returning 4xx/5xx status codes.
- **Try/Except** blocks in services for handling internal errors.
- **Structured Logging** with timestamps, error messages, stack traces.

### **Sub-Goals**

1. **HTTP-Level Errors**:
    - Return user-friendly messages.
    - Example: `HTTPException(status_code=400, detail="Invalid model name")`.
2. **Internal Errors**:
    - Log traceback for debug.
    - Distinguish between warnings (e.g., model fallback) and critical errors (e.g., DB failure).

---

## **10. Security Considerations**

- **Prompt Sanitization** to avoid injection attacks in logs or shell calls.
- **Environment Secrets** for DB credentials.
- **HTTPS** recommended for production usage.

### **Sub-Goals**

1. **Input Validation**:
    - Ensure prompt input does not contain malicious shell commands if used in any direct exec.
2. **Credential Management**:
    - Rely on environment variables or a secret manager for DB connection strings.
3. **Transport Layer Security**:
    - Deploy behind TLS in any public environment.

---

## **11. Testing**

1. **Unit Tests**
    - For each function: system metrics retrieval, model invocation, JSON creation.
2. **Integration Tests**
    - Use a mock or real Ollama client to test the end-to-end pipeline.
    - Verify that the database receives correct data.
3. **End-to-End Tests**
    - Start the full FastAPI app locally.
    - Run a real benchmark, confirm the data structure in the response.
4. **Load & Performance Tests**
    - Evaluate concurrency via load testing tools (e.g., Locust).
    - Check memory usage under many simultaneous prompts.

### **Sub-Goals**

1. **Comprehensive Coverage**:
    - Ensure major routes and services are tested.
2. **Mocking**:
    - Mock external dependencies (Ollama, DB).
    - Confirm the system logic without real side effects.
3. **Data Integrity Validation**:
    - Test that the stored JSON format matches the Pydantic model definitions.

---

## **12. Performance**

- **AsyncIO** is used to handle concurrent requests.
- CPU/Memory usage measurement must remain accurate under load.
- The system should degrade gracefully if model calls saturate resources.

### **Sub-Goals**

1. **Async Implementation**:
    - Use `await` and `async` in the main benchmark flow.
    - Possibly rely on concurrency primitives if multiple benchmarks run at once.
2. **Resource Monitoring**:
    - Confirm that CPU/memory usage metrics don’t conflict with other system processes.
    - Limit the size of logs if usage data is collected frequently.
3. **Graceful Degradation**:
    - If the model call is blocking or times out, return an error object.

---

## **13. Deployment**

1. **Local Development**:
    - Use `uvicorn app.main:app --reload` for testing.
2. **Containerization**:
    - Provide a Dockerfile with required dependencies.
3. **Production**:
    - Use a production server (gunicorn + uvicorn worker).
    - Deploy behind a load balancer for scaling.

### **Sub-Goals**

1. **Local Environment**:
    - Simple startup scripts or `docker-compose` for dev environment.
2. **Dockerfiles**:
    - Multi-stage build to reduce final image size.
    - Expose default port 8000.
3. **Production Deployment**:
    - Document environment variables for DB connection.
    - Possibly introduce a caching layer if usage grows.

---

## **14. Maintenance**

- **Regular Library Updates**: Keep FastAPI, Motor, and psutil up to date.
- **Code Review**: All significant changes must be peer-reviewed.
- **Documentation**: Methods, classes, and major flows described in docstrings or external docs.

### **Sub-Goals**

1. **Dependency Management**:
    - Use Poetry or pip-compile to track library versions.
    - Periodically update them.
2. **Review Process**:
    - Ensure that each pull request is reviewed by at least one team member.
3. **Documentation**:
    - Maintain a README covering setup, usage, and known issues.
    - Keep in-line docstrings explaining complex code paths.

---

## **15. (No Timelines)**

_(Removed all timeline references as requested.)_

---

## **16. Risks & Mitigations**

- **Risk**: Ollama call fails or times out.
    - **Mitigation**: Implement an async timeout wrapper, return error info.
- **Risk**: Large prompts cause memory spikes.
    - **Mitigation**: Warn or limit prompt size.
- **Risk**: MongoDB performance slowdown with large results.
    - **Mitigation**: Implement indexes, archiving, or limit stored data.

### **Sub-Goals**

1. **Timeout Handling**:
    - Confirm timeouts with an asynchronous approach.
    - Return partial results if possible.
2. **Prompt Size Management**:
    - Provide a maximum prompt length in the UI or config.
3. **Scalable Storage**:
    - If the DB grows large, plan for archiving or sharding strategies.

---

## **17. Approvals**

- **Project Sponsor**: Decides on overall direction and signs off on major features.
- **Team Lead**: Ensures architecture consistency and code quality.
- **DevOps**: Confirms deployment feasibility.

### **Sub-Goals**

1. **Project Sponsor**:
    - Validate high-level functionality is in line with business priorities.
2. **Team Lead**:
    - Verify that the system meets coding standards and design patterns.
3. **DevOps**:
    - Check containerization, ensure minimal friction in deploying or scaling.

---

## **18. References**

- [FastAPI Documentation](https://google.com/search?q=FastAPI+docs)
- [MongoDB + Motor Documentation](https://google.com/search?q=motor+mongodb+docs)
- [psutil Documentation](https://google.com/search?q=psutil+docs)
- [Ollama](https://google.com/search?q=Ollama+CLI)

### **Sub-Goals**

1. **Link Relevance**:
    - Confirm each reference is correct and up-to-date.
2. **Continuous Learning**:
    - Team should stay updated on new releases or best practices in FastAPI, Motor, etc.

---

## **19. Appendix**

**A.1**: Example JSON output for a single benchmark

```json
{
  "timestamp": "2024-12-25T12:21:26.209945",
  "system_info": {
    "platform": "macOS-12.7.4-x86_64-i386-64bit",
    "processor": "i386",
    "python_version": "3.10.0",
    "cpu": {
      "physical_cores": 4,
      "total_cores": 8,
      "max_frequency": 2200,
      "min_frequency": 2200,
      "current_frequency": 2200
    },
    "memory": {
      "total": 16.0,
      "available": 11.79848861694336,
      "used": 3.6441993713378906,
      "percent_used": 26.3
    },
    "gpu": []
  },
  "results": [
    {
      "model": "wizardlm2",
      "timing": {
        "time_to_first_chunk": 15.938036918640137,
        "total_time": 29.094534158706665
      },
      "throughput": {
        "total_chunks": 54,
        "total_bytes": 213,
        "average_chunk_size": 3.9444444444444446,
        "bytes_per_second": 7.320962722348962
      },
      "system_impact": {
        "cpu_delta": [-6.2, 0.0, -11.1, 1.0],
        "memory_delta": 30.3
      },
      "success": true,
      "timestamp": "2024-12-25T12:20:58.088789",
      "prompt": "Hello Wizard!",
      "response": "Wizard says hi"
    }
  ]
}
```

### **Sub-Goals**

1. **Data Accuracy**:
    - Validate that fields like `time_to_first_chunk` and `total_time` are measured accurately.
2. **Clarity**:
    - Ensure each top-level field is self-explanatory or well-documented.

---

**End of TRD**

That’s the final **FastAPI-Based Benchmarker TRD** with no timeline constraints, plus detailed sub-goals for every section. Let me know if you need further clarification or extra detail in any specific area!

---

Hey Christopher, here’s a **concise** yet **comprehensive** look at the **core FastAPI component** that will drive user interaction with NovaSystem in the **next phase of development**:

---

## **Core Focus**

1. **User Interaction Via FastAPI**
    
    - The **central goal** is to have a **single streamlined interface** where users can submit prompts and retrieve responses, metrics, and agent steps.
    - This interface will unify the **NovaSystem** components (Core, Agents, Memory, etc.) behind **one simple API**.
2. **Essential Responsibilities**
    
    - **Receive Prompts**: Accept a user’s request (prompt, optional parameters) via a POST endpoint (e.g., `/api/nova/ask`).
    - **Orchestrate Responses**: Pass the prompt to the relevant NovaSystem processes (agents, memory, local LLM).
    - **Return Results**: Send back structured JSON containing the system’s chain-of-thought steps (if required), final text, and any relevant metrics.
3. **Immediate Development Goals**
    
    - **Integration**: Hook up the existing NovaSystem methods (like `process_message()`, `AgentOrchestrator.process_turn()`) to a single FastAPI route.
    - **Session Management**: Ensure each request can include or reference session context (if you are using sessions).
    - **Minimal Data Model**: Define the Pydantic models that represent incoming user prompts and outgoing responses (text, metrics, conversation state).
    - **High-Level Logging**: Track each request’s input prompt, system usage, and any errors within the FastAPI route.

---

## **Core FastAPI Component (Example)**

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

# Basic Data Models
class NovaRequest(BaseModel):
    prompt: str
    session_id: Optional[str] = None
    parameters: Optional[dict] = None

class NovaResponse(BaseModel):
    text: str
    chain_of_thought: Optional[List[str]] = None
    metrics: Optional[dict] = None
    session_id: Optional[str] = None

# FastAPI App
app = FastAPI()

# In the real system, you’d import NovaSystemCore, AgentOrchestrator, etc.
# from nova_system.core import NovaSystemCore
# from nova_system.agents import AgentOrchestrator

@app.post("/api/nova/ask", response_model=NovaResponse)
async def ask_nova(request: NovaRequest) -> NovaResponse:
    try:
        # 1. Retrieve or create session context (placeholder)
        session_id = request.session_id or "new-session-id"

        # 2. Pass prompt to the NovaSystem pipeline
        # Here we’d do something like:
        # response_data = agent_orchestrator.process_turn(
        #     prompt=request.prompt,
        #     session_id=session_id
        # )

        # Mocking up a quick example:
        response_data = {
            "text": f"Nova says: Hello from prompt '{request.prompt}'!",
            "chain_of_thought": ["PlannerAgent -> Plan", "ExecutorAgent -> Execute"],
            "metrics": {"cpu_percent": 25.2},
        }

        # 3. Return structured response
        return NovaResponse(
            text=response_data["text"],
            chain_of_thought=response_data["chain_of_thought"],
            metrics=response_data["metrics"],
            session_id=session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### **Key Points**

- **Single `/api/nova/ask` Endpoint**: All user prompts go through here.
- **`NovaRequest` Model**: Defines what the user can send (prompt, session ID).
- **`NovaResponse` Model**: Captures the final text, optional chain-of-thought, metrics, etc.
- **Session Handling**: If your conversation includes context, pass a session ID that the system recognizes.
- **Central Logging**: Each request can log relevant details (prompt, CPU usage, time to response).

---

## **What This Phase Achieves**

- **Unified Communication Channel**: No matter which internal NovaSystem modules are invoked (Core, Agents, Memory), the user only **sees** the `/api/nova/ask` endpoint.
- **Simple Expandability**: You can add new features—like advanced metrics, memory lookups, error handling—behind this endpoint without changing the user-facing interface.
- **Chain-of-Thought & Metadata**: If you decide to include chain-of-thought data or additional metadata in responses, it’s trivial to extend the `NovaResponse` model.

---

## **Next Steps**

1. **Real Implementation**: Replace the mock response logic with real calls to `AgentOrchestrator` and `NovaSystemCore`.
2. **Session/Context Management**: Store conversation history either in-memory, via your `SessionManager`, or in a database.
3. **Authentication or Security**: If future phases require user-based authentication, add a FastAPI dependency or JWT-based approach.
4. **Testing & Logging**: Add test suites to ensure each request logs the correct data and returns the correct response format.

---

That’s it—an **essential** summary of the next development phase. We’re focusing on building a **core FastAPI endpoint** that glues together user prompts and NovaSystem’s internal logic. Once that is in place, it forms the solid foundation for more advanced features like chain-of-thought visualization, advanced memory, or multi-agent orchestrations.