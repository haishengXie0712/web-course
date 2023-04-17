"use strict";
// 二分
/**
 * 704. 二分查找
 * 二分搜索
 * */
function search(nums, target) {
    const length = nums.length;
    if (length === 0)
        return -1;
    let startIndex = 0, endIndex = length - 1;
    while (startIndex <= endIndex) {
        const midIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
        const midValue = nums[midIndex];
        if (target < midValue) {
            // 目标值较小
            endIndex = midIndex - 1;
        }
        else if (target > midValue) {
            // 目标值较大
            startIndex = midIndex + 1;
        }
        else {
            // 相等, 返回
            return midIndex;
        }
    }
    return -1;
}
;
/**
 * 35. 搜索插入位置
 * 二分插入
 * */
function searchInsert(nums, target) {
    const length = nums.length;
    if (length === 0)
        return 0;
    let startIndex = 0, endIndex = length - 1, ans = nums.length;
    while (startIndex <= endIndex) {
        const midIndex = Math.floor((endIndex - startIndex) / 2) + startIndex;
        const midValue = nums[midIndex];
        if (target <= midValue) {
            ans = midIndex;
            endIndex = midIndex - 1;
        }
        else {
            startIndex = midIndex + 1;
        }
    }
    return ans;
}
// 递归递推
/**
 * 剑指 Offer 10- I. 斐波那契数列
 * 递推类型: 需要有指定公式;
 * 斐波那契数列 => f(0) = 0, f(1) = 1 然后后续是前两个值之和; f(2) = 1; f(3) = 2; f(4) = 3; f(5) = 5
 * */
function fib(n) {
    // // 普通递归会超时, 我们需要缓存起来
    // if (n <= 1) {
    //     return n;
    // }
    // return fib(n - 1) + fib(n - 2)
    // 缓存数据
    const arr = [
        0,
        1,
    ];
    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
        arr[i] %= 1000000007;
    }
    return arr[n];
}
/**
 * 70. 爬楼梯
 * 爬楼梯: 每次你可以爬 1 或 2 个台阶, 你有多少种不同的方法可以爬到楼顶呢?
 * 这种问题类似递推, 前面 n 项是固定的. 然后最后可能剩一级楼梯 || 两级楼梯上来的.
 * 那么就可以把问题换成 climbStairs(n) = climbStairs(n-1)(最后一级是用一个台阶走上来的) + climbStairs(n-2)(最后一级是用两个台阶走上来的)
 * */
function climbStairs(n) {
    // 初始化固定的
    const arr = [
        0,
        1,
        2,
        3,
    ];
    for (let i = 4; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
}
/**
 * 放苹果
 * */
function f() {
}
// 动态规划
/**
 * 746. 使用最小花费爬楼梯
 * 套路:
 * 大事化小 -> 到达顶层前可以(跨一步 || 跨两步) 那我需要记录下他们来到这里的最小值.
 * 小事化无 -> 题目允许可以在第一个阶梯 || 第二个阶梯; 所以 前两个阶梯都不需要花费.
 * 记忆求值 -> 每上一步都要记录下到这一步的最优解.
 * */
function minCostClimbingStairs(cost) {
    // // 存数组版本
    // const len = cost.length;
    // const dp = [
    //     0,
    //     0,
    // ];
    // for (let i = 2; i <= len; i++) {
    //     dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    // }
    // return dp[len];
    // 升级版本
    const len = cost.length;
    // 前两步都是 0
    let prev = 0, curr = 0, next = 0;
    for (let i = 2; i <= len; i++) {
        // 下一步 = 当前这一步跨了两级 || 当前这一步跨了一级 的最小值
        next = Math.min(prev + cost[i - 2], curr + cost[i - 1]);
        // 记录下当前值
        prev = curr;
        // 记录下一个值
        curr = next;
    }
    return curr;
}
/**
 * 121. 买卖股票的最佳时机
 * */
function maxProfit(prices) {
    // // 暴力破解
    // let max = 0;
    // const len = prices.length;
    // for (let i = 0; i < len - 1; i++) {
    //     for (let j = i + 1; j < len; j++) {
    //         max = Math.max(max, prices[j] - prices[i]);
    //     }
    // }
    // return max;
    // 找到第 i 天卖出, 第 n 天最低价. 利润就是 profit = prices[i] - prices[n]
    let maxProfit = 0, minPrice = prices[0];
    const len = prices.length;
    for (let i = 1; i < len; i++) {
        if (minPrice > prices[i]) {
            minPrice = prices[i];
        }
        else {
            maxProfit = Math.max(maxProfit, prices[i] - minPrice);
        }
    }
    return maxProfit;
}
/**
 * 剑指 Offer II 095. 最长公共子序列
 *   a b c d e
 * a 1 1 1 1 1
 * c 1 1 2 2 2
 * e 1 1 2 2 3
 * */
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = [new Array(n + 1).fill(0)];
    for (let i = 1; i <= m; i++) {
        dp[i] = [0];
        const c1 = text1[i - 1];
        for (let j = 1; j <= n; j++) {
            const c2 = text2[j - 1];
            if (c1 === c2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            }
            else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
/**
 * 300. 最长递增子序列
 * */
function lengthOfLIS(nums) {
    const len = nums.length;
    if (len <= 1)
        return len;
    let max = 1;
    const dp = new Array(len).fill(1);
    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return max;
}
