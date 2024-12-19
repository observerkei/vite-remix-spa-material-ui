const log_enable = true;

export function console_dbg(...params: string[]): void {
    if (!log_enable)
        return;
    const error = new Error();
    const stackLine = error.stack.split("\n")[2]; // 获取调用者的堆栈信息

    // 提取文件名、函数名和行号
    const regex = /\((.*):(\d+):\d+\)$/;
    const match = stackLine.match(regex);
    const lineNumber = match ? match[2] : "unknown line";

    const functionNameMatch = stackLine.trim().split(" ")[1];
    const functionName = functionNameMatch !== "new" ? functionNameMatch : "anonymous";

    console.log(`[${functionName}:${lineNumber}]`, ...params);
}