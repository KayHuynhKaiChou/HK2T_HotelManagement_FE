//Usage : Được sử dụng trong case bạn đợi cho đến khi đạt đến trạng thái cụ
// thể , chẳng hạn như phần tử Vue ref hoặc DOM

export const waitUntil = <T = any>(checkFunc: () => T | undefined, timeout = 3000, interval = 10) => {
    return new Promise<T>(async (resolve, reject) => {
        let checkResult = checkFunc();
        if(checkResult){
            resolve(checkResult);
        }
        let iteration = 0;
        while (iteration < timeout / interval) {
            checkResult = checkFunc();
            if(checkResult) {
                resolve(checkResult);
                break;
            } else {
                await new Promise((resolve) => setTimeout(resolve, 10))
                iteration++;
            }
        }
        reject('waitUtil is timed out')
    });
}

// Usage : thực hiện tính năng async chỉ 1 lần song song
// case chính sử dụng là ngăn chặn việc thực thi trùng lặp các yêu cầu API

export function executeIfNotRunning<TArgs extends unknown[]>(fn: (...args: TArgs) => Promise<unknown>) {
    let isRunning = false;
    return async function (...args: TArgs) {
        if(isRunning) return;
        isRunning = true;
        try {
            await fn(...args);
        } finally {
            isRunning = false
        }
    }
}