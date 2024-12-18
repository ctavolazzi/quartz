# MCP Server Setup Guide

This document outlines the process for creating new MCP servers with custom tools.

## 1. Project Structure Setup

```bash
# Create project directory
mkdir mcp-{service-name}
cd mcp-{service-name}

# Create Python package structure
mkdir -p src/{service_name}
touch src/{service_name}/__init__.py
touch src/{service_name}/server.py
```

## 2. Package Configuration

Create `pyproject.toml`:

```toml
[project]
name = "{service-name}"
version = "0.1.0"
dependencies = [
    "mcp-core",
    "httpx",  # If HTTP requests needed
]

[project.scripts]
{service-name} = "{service_name}:main"
```

## 3. Server Implementation Steps

### 3.1 __init__.py Template
```python
from . import server
import asyncio

def main():
    """Main entry point for the package."""
    asyncio.run(server.main())

__all__ = ['main', 'server']
```

### 3.2 server.py Template
```python
from typing import Any
import asyncio
import sys
from mcp.server.models import InitializationOptions
import mcp.types as types
from mcp.server import NotificationOptions, Server
import mcp.server.stdio

def log(message: str):
    """Log to stderr for debugging"""
    print(message, file=sys.stderr)

# Initialize server
log(f"Initializing {SERVICE_NAME} server...")
server = Server(SERVICE_NAME)

@server.list_tools()
async def handle_list_tools() -> list[types.Tool]:
    """Define available tools using JSON Schema validation"""
    log("Listing tools...")
    tools = [
        types.Tool(
            name="tool-name",
            description="Tool description",
            inputSchema={
                "type": "object",
                "properties": {
                    "param_name": {
                        "type": "string",
                        "description": "Parameter description",
                    },
                },
                "required": ["param_name"],
            },
        ),
    ]
    return tools

@server.call_tool()
async def handle_call_tool(
    name: str, 
    arguments: dict | None
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    """Handle tool execution requests"""
    if not arguments:
        raise ValueError("Missing arguments")

    if name == "tool-name":
        # Tool implementation
        return [types.TextContent(
            type="text",
            text="Tool response"
        )]
    else:
        raise ValueError(f"Unknown tool: {name}")

async def main():
    """Main entry point for the MCP server"""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name=SERVICE_NAME,
                server_version="0.1.0",
                capabilities=server.get_capabilities(
                    notification_options=NotificationOptions(),
                    experimental_capabilities={},
                ),
            ),
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## 4. Tool Implementation Guidelines

### 4.1 Tool Definition Structure
- Name: Clear, hyphen-separated
- Description: Concise, action-oriented
- Input Schema: JSON Schema format
  - Define all parameters
  - Mark required parameters
  - Include clear descriptions

### 4.2 Response Types
Available response types:
- `types.TextContent`: For text responses
- `types.ImageContent`: For image data
- `types.EmbeddedResource`: For other resources

### 4.3 Error Handling
- Validate all input parameters
- Use clear error messages
- Log important operations
- Handle edge cases gracefully

## 5. Testing

1. Install the package in development mode:
```bash
pip install -e .
```

2. Run the server:
```bash
python -m {service_name}
```

## 6. Claude Desktop Integration

Update Claude Desktop configuration (`claude_desktop_config.json`):
```json
{
  "tools": {
    "{service-name}": {
      "command": ["python", "-m", "{service_name}"]
    }
  }
}
```

## Best Practices

1. **Logging**
   - Use the `log()` function for debugging
   - Log important operations and errors
   - Include relevant context in logs

2. **Error Handling**
   - Validate all inputs
   - Return clear error messages
   - Handle edge cases gracefully

3. **Tool Design**
   - Keep tools focused and single-purpose
   - Use clear, descriptive names
   - Provide comprehensive parameter descriptions
   - Return structured, useful responses

4. **Code Organization**
   - Keep server.py focused on MCP protocol
   - Move complex logic to separate modules
   - Use type hints consistently
   - Document all public functions

5. **Testing**
   - Test tools with various inputs
   - Verify error handling
   - Check response formats
   - Validate schema compliance