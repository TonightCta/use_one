/*
 * @Name: localStorage（本地储存）
 * @Date: 2022-04-14 12:00:53
 * @LastEditors: VSCode
 * @LastEditTime: 2022-06-26 17:39:29
 * import { setLocalStorage } from '@/utils/local-storage'
 */

/**
 * 获取 localStorage
 * @param  {...any} args 
 */
export const getLocalStorage = (...args) => {
    const storage = {};
    args.forEach(arg => {
        storage[arg] = window.localStorage.getItem(arg) || null;
    });
    return storage;
};

/**
 * 存储 localStorage
 * @param  {...any} args 
 */
export const setLocalStorage = data => {
    Object.keys(data).forEach(prop => {
        const el = data[prop];
        window.localStorage.setItem(prop, el);
    });
};

/**
 * 清除 localStorage
 * @param  {...any} args 
 */
export const removeLocalStorage = (...args) => {
    args.forEach(arg => {
        window.localStorage.removeItem(arg);
    });
};
