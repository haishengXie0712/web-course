const nums = [
    65,
    42,
    2,
    26,
    90,
    38,
    34,
    47,
    64,
    55,
    27,
    72,
    7,
    56,
    21,
    5,
    45,
    51,
    6,
    57,
];

function swap(nums: number[], i: number, j: number) {
    [
        nums[i],
        nums[j],
    ] = [
        nums[j],
        nums[i],
    ]
}

/**
 * 冒泡排序
 * 遍历数组, 后面比前面小的时候两两交换
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * */
function bubbleSort(nums: number[]) {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                swap(nums, j, j + 1)
            }
        }
    }
    return nums;
}

/**
 * 选择排序
 * 遍历数组, 每次获得最小放在第一个
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * */
function selectSort(nums: number[]) {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    for (let i = 0; i < length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < length; j++) {
            if (nums[minIndex] > nums[j]) {
                minIndex = j;
            }
        }
        swap(nums, i, minIndex)
    }
    return nums;
}

/**
 * 插入排序
 * 默认数组第一位已经在对的位置上, 然后遍历后续的, 找地方插入.
 * 时间复杂度: O(n^2)
 * 空间复杂度: O(1)
 * */
function insertSort(nums: number[]) {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    for (let i = 1; i < length; i++) {
        for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
            swap(nums, j, j - 1)
        }
    }
    return nums;
}

/**
 * 希尔排序
 * 递减增量排序, 是插入排序的更高效的版本
 * */
function shellSort(nums: number[]) {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    let h = 1;
    while (h < length / 3) {
        h = h * 3 + 1;
    }
    while (h >= 1) {
        for (let i = h; i < length; i++) {
            for (let j = i; j >= h && nums[j] < nums[j - h]; j -= h) {
                swap(nums, j, j - h)
            }
        }
        h = Math.floor(h / 3);
    }
    return nums;
}

/**
 * 快速排序
 * 分区交换排序: 将一个大数组, 不停分成两个小数组.到最后就有序了
 * 1. 挑选基准值: 从数列中挑出一个元素, 称为"基准" (pivot)
 * 2. 分割: 重新排序数列, 比基准小的放一边, 基准值大的放一边. 分割结束后, 基准值排序已经完成
 * 3. 递归排序子序列, 递归的将小于基准值元素的子序列和大于基准值的子序列排序.
 * 递归出口 空数组 || 长度为1 那就形成有序了
 * */
function quickSort1(nums: number[]): number[] {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    function _quickSort(nums: number[], left: number, right: number) {
        if (left < right) {
            const pivot = partition(nums, left, right);
            _quickSort(nums, left, pivot - 1)
            _quickSort(nums, pivot + 1, right)
        }
    }

    function partition(nums: number[], left: number, right: number): number {
        let i = left,
            j = right + 1,
            pivot = nums[left];
        while (1) {
            while (nums[++i] < pivot) {
                if (i === right) {
                    break;
                }
            }

            while (pivot < nums[--j]) {
                if (j === left) {
                    break;
                }
            }

            if (i >= j) {
                break;
            }
            swap(nums, i, j);
        }
        swap(nums, left, j);
        return j;
    }

    _quickSort(nums, 0, length - 1);
    return nums;
}

function quickSort3(nums: number[]): number[] {
    const length = nums.length;
    if (length === 0 || length === 1) return nums;

    function _quickSort(nums: number[], left: number, right: number) {
        if (left >= right) return;
        let i = left,
            j = right,
            pivot = nums[left];
        while (i < j) {
            while (i < j && nums[i] <= pivot) {
                i++;
            }
            while (i < j && nums[j] >= pivot) {
                j--;
            }
            swap(nums, i, j);
        }
        swap(nums, left, i);
        _quickSort(nums, left, i - 1);
        _quickSort(nums, i + 1, right);
    }

    _quickSort(nums, 0, length - 1);
    return nums;
}

console.log(quickSort3(nums));
