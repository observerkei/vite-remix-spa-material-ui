const log_enable = true;


export function console_dbg(...params: any[]): void {
    if (!log_enable) return;

    try {
        throw new Error();
    } catch (error) {
        // 获取堆栈信息
        const stackLines = error.stack ? error.stack.split("\n") : [];
        let functionName = "anonymous";
        let lineNumber = "unknown line";

        for (let i = 0; i < stackLines.length; i++) {
            const line = stackLines[i].trim();

            // 过滤掉当前函数本身的堆栈信息
            if (line.includes("console_dbg")) {
                continue;
            }

            // 处理不同浏览器的堆栈格式
            const chromePattern = /at (\S+) \((.*?):(\d+):\d+\)/;
            const safariPattern = /at (.*?)(?: \((.*?):(\d+):\d+\))?/;

            const match = line.match(chromePattern) || line.match(safariPattern);

            if (match) {
                functionName = match[1] || "anonymous";
                lineNumber = match[3] || "unknown line";
                break;
            }
        }

        // 输出日志，带有函数名和行号
        console.log(`[${functionName}:${lineNumber}]`, ...params);
    }
}
