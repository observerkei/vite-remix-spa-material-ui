const log_enable = true;

export function console_dbg(...params: any[]): void {
    if (!log_enable) return;

    try {
        throw new Error();
    } catch (error: any) {
        // Get stack info
        const stackLines = error.stack ? error.stack?.split("\n") : [];
        let functionName = "anonymous";
        let lineNumber = "unknown line";

        for (let i = 0; i < stackLines.length; i++) {
            const line = stackLines[i].trim();

            // Filter out the stack information of the current function itself
            if (line.includes("console_dbg")) {
                continue;
            }

            // Handle stack formats for different browsers
            const chromePattern = /at (\S+) \((.*?):(\d+):\d+\)/;
            const safariPattern = /at (.*?)(?: \((.*?):(\d+):\d+\))?/;

            const match = line.match(chromePattern) || line.match(safariPattern);

            if (match) {
              functionName = match[1]
              lineNumber = match[3]
              if (!functionName || !lineNumber) {
                const chromeAsyncPattern = /at\s+.*\/([^/]+)\?t=([^:]+):(\d+):(\d+)/;
                const matchAsync = line.match(chromeAsyncPattern);
                if (matchAsync) {
                  functionName = matchAsync[1]
                  lineNumber = matchAsync[3]
                }
              }
              
              functionName = functionName ? functionName : "anonymous";
              lineNumber = lineNumber ? lineNumber : "unknown line";
              break;
            }
        }

        // Log output with function name and line number
        console.log(`[${functionName}:${lineNumber}]`, ...params);
    }
}

export function isEqual(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;
  
    if (
      typeof obj1 !== "object" ||
      obj1 === null ||
      typeof obj2 !== "object" ||
      obj2 === null
    ) {
      return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false;
  
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) return false;
    }
  
    return true;
  }
  