```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET /spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
 
    browser->>server: GET /data.json
    activate server
    server-->>browser: the JSON data
    deactivate server
    