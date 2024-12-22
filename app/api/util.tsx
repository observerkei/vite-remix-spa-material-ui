const log_enable = true;


export function console_dbg(...params: any[]): void {
    if (!log_enable) return;

    try {
        throw new Error();
    } catch (error) {
        // Get stack info
        const stackLines = error.stack ? error.stack.split("\n") : [];
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
                functionName = match[1] || "anonymous";
                lineNumber = match[3] || "unknown line";
                break;
            }
        }

        // Log output with function name and line number
        console.log(`[${functionName}:${lineNumber}]`, ...params);
    }
}
