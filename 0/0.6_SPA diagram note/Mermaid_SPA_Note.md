```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server
    
    Note right of browser: Load HTML from server into browser

    browser->>server: GET /main.css
    activate server
    server-->>browser: the css file
    deactivate server

    Note right of browser: Load CSS from server into browser

    Note right of browser: Due to SPA, dynamic updates apply only to file transfers from now on
    
    browser->>server: GET /spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET /data.json
    activate server
    server-->>browser: the JSON data
    deactivate server
    
    Note right of browser: The browser executes the callback function that renders the notes
