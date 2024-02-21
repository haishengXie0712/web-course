/**
 * 事件环
 * 异步任务的划分:
 * 1. 微任务
 *  1.1. promise.then
 *  1.2. mutationObserver
 *  1.3. process.nextTick
 *  1.4. queueMicrotask
 * 2. 宏任务
 *  2.1. script
 *  2.2. ui rendering
 *      2.2.1. requestAnimationFrame(不归事件调度进程管理, 所以特殊标记)
 *      2.2.2. requestIdleCallback(不归事件调度进程管理, 所以特殊标记)
 *  2.3. setTimeout
 *  2.4. setInterval
 *  2.5. setImmediate
 *  2.6. http request
 *  2.7. eventListener
 *  2.8. messageChannel
 * */
