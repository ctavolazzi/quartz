# **NovaSystem Autogen Ollama Local LLM Bot — Final Technical Requirements Document (TRD)**

## **1. Project Overview**

The **NovaSystem Autogen Ollama Local LLM Bot** is a terminal-based chat system that leverages local Large Language Models via **Ollama**, orchestrated by **AutoGen**. The system must capture each user turn (input), the internal agent chain (steps), and the final bot output in a structured JSON file.

### **1.1 Objectives**
1. **Local LLM Execution**: Run inference without relying on external APIs.  
2. **Agent Orchestration**: AutoGen manages sub-agents (Planner, Executor, Memory).  
3. **Metadata-Rich Logging**: Store user inputs, LLM responses, chain steps, resource usage, timestamps, etc., in JSON.  
4. **Docker Deployment**: Provide a containerized environment that simplifies setup and ensures consistent execution.

---

## **2. System Scope**

1. **Command-Line Interface** (CLI):  
   - The user interacts via terminal input.  
   - Multi-turn conversation support: user inputs a query, system responds, logs each turn.  

2. **AutoGen Integration**:  
   - Multiple sub-agents coordinate to interpret requests, call the LLM, and handle data retrieval or transformations.  
   - Agents communicate in an agent chain; each step is captured for debugging and auditing.

3. **Local LLM (Ollama)**:  
   - The system calls Ollama’s Python library (`ollama`) to handle prompt completion or advanced tasks (embedding, structured outputs).  
   - No external calls to remote LLMs—everything is done locally.

4. **JSON Logging**:  
   - Each turn is appended to a single JSON file per session.  
   - Detailed metadata includes CPU, memory usage, timestamps, chain-of-thought steps, model details (e.g., `model_version`, `temperature`), and any relevant environment info.

5. **Docker Integration**:  
   - A Dockerfile (and optionally a docker-compose file) ensures reproducible environment for Python, AutoGen, and Ollama.  
   - The container can store logs on a mounted volume so data persists after container shutdown.

---

## **3. Detailed Requirements**

### **3.1 Functional Requirements**

1. **User I/O**  
   - **CLI Prompt**: `> ` for user entry, read until newline.  
   - **Exit Mechanism**: If user types `exit` or `quit`, close the session gracefully.  
   - **Error Feedback**: If the user input is invalid or a fatal error occurs, display a concise error and continue or terminate safely.

2. **Agent Chain**  
   - **Planner Agent**: Interprets user intent, possibly breaks down tasks.  
   - **Executor Agent**: Calls Ollama to generate responses or handle queries.  
   - **Memory Agent** (Optional): Maintains conversation context.  
   - **Chain-of-Thought**: Each sub-agent invocation logs `agent_name`, `input`, `output`, `timestamp`, and `elapsed_time_ms`.

3. **Local LLM Calls**  
   - **Ollama** must be running locally (or accessible) with the desired model pre-pulled.  
   - Implementation can use `ollama.chat` or `ollama.generate` (including streaming if needed).  
   - System retrieves text output, returning it to the user in the final response.

4. **Logging**  
   - **JSON File per Session**: Named `session_<uuid>_<timestamp>.json`.  
   - **Structure** (each record is appended to an array):  
     ```json
     {
       "id": "<uuid>",
       "timestamp": "<ISO8601>",
       "role": "user" | "assistant" | "system",
       "content": "<text>",
       "metadata": {
         "session_id": "<session-wide uuid>",
         "resource_usage": {
           "cpu_percent": <float>,
           "mem_usage_mb": <float>
         },
         "model_details": {
           "model_name": "ollama-lora-7b",
           "model_version": "1.2.3",
           "temperature": 0.7,
           "max_tokens": 512
         },
         "program_info": {
           "version": "0.1.0",
           "git_commit": "abc123def"
         },
         "custom_tags": []
       },
       "chain_steps": [
         {
           "agent_name": "Planner",
           "input": "<prompt or partial>",
           "output": "<decomposed task>",
           "timestamp": "<ISO8601>",
           "elapsed_time_ms": <float>
         },
         {
           "agent_name": "Executor",
           "input": "<refined prompt>",
           "output": "<LLM generation>",
           "timestamp": "<ISO8601>",
           "elapsed_time_ms": <float>
         }
       ]
     }
     ```
   - **Synchronous Writes**: For simplicity and reliability, each turn is appended right after generation.  
   - **Closing Bracket**: On user exit, write `]` to finalize the JSON array.

5. **Session Management**  
   - A session begins upon program startup, generating a `session_id`.  
   - The conversation loop continues until the user exits.  
   - Upon exit, the log file is closed.  

---

### **3.2 Non-Functional Requirements**

1. **Performance**  
   - Provide near-instant responses for short queries (subject to local LLM constraints).  
   - Log writing overhead should not degrade user experience. For heavy usage, consider asynchronous logs or log rotation.

2. **Scalability**  
   - Primarily for single-user CLI sessions.  
   - Future expansions can introduce concurrency (with additional concurrency or process management) or a server-based interface (e.g., REST API).

3. **Security & Privacy**  
   - Logs store chain-of-thought, which can reveal internal reasoning and user content. Ensure sensitive data is handled appropriately.  
   - Keep logs in a protected or private area on disk, especially if the conversation data is confidential.

4. **Portability**  
   - Docker-based environment: minimal friction for setting up Python, `ollama`, `autogen`, etc.  
   - The Docker image can run on any system supporting Docker (Linux, macOS, Windows with WSL2).

---

## **4. Technical Architecture**


┌───────────────────────────────────┐ │ User Terminal │ └───────────────────────────────────┘ │ (1) user input ▼ ┌─────────────────────────────────┐ │ CLI Driver │ │ (session & logging mgmt) │ └─────────────────────────────────┘ │ ▼ ┌─────────────────────────────────┐ │ AutoGen: Core Bot Orchestrator │ - Planner, Executor, Memory │ - Calls Ollama └─────────────────────────────────┘ │ ▼ ┌─────────────────────────────────┐ │ Ollama Local LLM (Python) │ │ - e.g. “ollama-lora-7b” │ └─────────────────────────────────┘ | ▼ ┌─────────────────────────────────┐ │ JSON Log (session_.json) │ │ - Turn-based records │ │ - Agent chain steps │ └─────────────────────────────────┘

1. **CLI Driver**  
   - Maintains a loop for capturing user messages.  
   - Triggers the agent orchestration with each user input.  
   - Writes user turn and final assistant turn to JSON.  
   - On exit, finalizes the JSON array.

2. **Agent Orchestrator** (AutoGen)  
   - Sub-agents parse and plan user requests.  
   - Executor sub-agent calls `ollama.chat` or `ollama.generate`.  
   - Returns a chain-of-thought (list of steps) plus final output text.

3. **JSON Log**  
   - The system appends each user/assistant message as a JSON object.  
   - Fields include timestamps, chain steps, resource usage, etc.  
   - Ensures full traceability of conversation flow.

4. **Docker Environment**  
   - Dockerfile installs Python 3.9+, `ollama`, `autogen`, and related libraries (`psutil` if needed).  
   - `docker run` or `docker compose up` spins up the environment for immediate usage.

---

## **5. Implementation Roadmap**

1. **Setup**  
   - Pull or build Docker image containing `ollama` and `autogen`.  
   - (Optional) Pre-pull specific LLM models (`ollama pull llama3.2`).

2. **Code Structure**  
   - **`main.py`**:  
     1. Creates a log file (`session_<uuid>_<timestamp>.json`) and writes `[` to start.  
     2. Enters a CLI loop.  
     3. On each user input, calls a function (e.g., `handle_turn`) that orchestrates sub-agents + logging.  
     4. On exit, writes `]` and closes the file.
   - **`core_bot.py`**:  
     - Contains `run_agent_chain(user_text, session_state)` for Planner + Executor flow.  
     - Wraps `ollama.chat` calls for local LLM usage.  
   - **`logging_utils.py`**:  
     - Manages writing JSON records (with turn-level metadata, chain steps).

3. **Testing**  
   - **Unit Tests**:  
     - Validate JSON logging (structure, file correctness).  
     - Mock agent calls to confirm chain-of-thought capture.  
   - **Integration Tests**:  
     - Full conversation with sample prompts.  
     - Check Docker container starts, model is accessible, logs are properly generated.  

4. **Deployment & Maintenance**  
   - **Docker**:  
     - Provide a `Dockerfile` and optional `docker-compose.yml`.  
     - Document volumes or paths for logs.  
   - **Version Control**:  
     - Tag code versions and link them to Docker image versions.  

---

## **6. Potential Extensions**

1. **Multi-User or Server Mode**  
   - Convert the CLI to a web server (Flask/FastAPI).  
2. **Async Execution**  
   - Use Python async capabilities or queue-based concurrency for high-throughput usage.  
3. **Advanced Tools**  
   - Integrate other local scripts or APIs the Executor can call.  
4. **Memory Persistence**  
   - Store conversation context across sessions in a local database or file-based memory.  
5. **Model Management**  
   - Programmatically handle model pulling, versioning, or switching to different LLMs.

---

## **7. Acceptance Criteria**

1. **Functionality**  
   - The user can run `docker run ...` or `docker compose up`.  
   - Type a prompt, see a coherent response, and view the entire conversation in JSON.

2. **Logging Completeness**  
   - Each turn has a unique ID, timestamp, role, content, and chain steps.  
   - Metadata includes resource usage (CPU, MEM), `model_name`, `model_version`, and `session_id`.

3. **Robustness**  
   - No crashes on typical usage.  
   - Graceful exit, properly closing JSON array.  
   - Error messages if Docker or Ollama is misconfigured.

4. **Documentation**  
   - README with instructions (setup, usage, environment variables).  
   - Clear references for accessing logs and verifying local LLM usage.

---

### **Conclusion**

These final sections outline precisely **how** the NovaSystem Autogen Ollama Local LLM Bot should be architected, deployed, and tested. By adhering to this **Technical Requirements Document**, the system will deliver a well-structured, traceable, and maintainable solution—harnessing local LLM capabilities while capturing every step of user-bot interaction.