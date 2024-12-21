const log_enable = true;

export function console_dbg(...params: string[]): void {
    if (!log_enable) return;

    try {
        throw new Error();
    } catch (error) {
        // 获取堆栈信息
        const stackLines = error.stack ? error.stack.split("\n") : [];

        let functionName = "anonymous";
        let lineNumber = "unknown line";

        // 从堆栈信息中提取行号和函数名
        for (let i = 0; i < stackLines.length; i++) {
            const line = stackLines[i].trim();

            // 处理不同的浏览器格式
            // Safari 和 Chrome 格式不同，尝试匹配两种格式
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
