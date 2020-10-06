/*
 * Part of code taken from
 * https://gist.github.com/Digiman/9fc2640b84bbe5162cf1
 *
 */

export interface IStorageItem {
    key: string;
    value: any;
}

export class StorageItem {
    key: string;
    value: any;

    constructor(data: IStorageItem) {
        this.key = data.key;
        this.value = data.value;
    }
}

class SessionStorageWorker {
    sessionStorageSupported: boolean;

    constructor() {
        this.sessionStorageSupported =
            typeof window['sessionStorage'] != 'undefined' && window['sessionStorage'] != null;
    }

    // add value to storage
    add(key: string, item: object) {
        if (this.sessionStorageSupported) {
            sessionStorage.setItem(key, JSON.stringify(item));
        }
    }

    // get all values from storage (all items)
    getAllItems(): Array<StorageItem> {
        const list = new Array<StorageItem>();

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                const value = sessionStorage.getItem(key);
                list.push(
                    new StorageItem({
                        key: key,
                        value: value,
                    }),
                );
            }
        }

        return list;
    }

    // get only all values from sessionStorage
    getAllValues(): Array<any> {
        const list = new Array<any>();

        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                const value = sessionStorage.getItem(key);
                list.push(value);
            }
        }

        return list;
    }

    // get one item by key from storage
    get(key: string): any {
        let item = null;
        try {
            if (this.sessionStorageSupported) {
                item = sessionStorage.getItem(key);
            }
            item = item && JSON.parse(item);
        } catch (e) {
            console.error('Error in reading from storage', e);
        }
        return item;
    }

    set(key: string, value: any): boolean {
        let saved = false;
        try {
            if (this.sessionStorageSupported) {
                sessionStorage.setItem(key, JSON.stringify(value));
                saved = true;
            }
        } catch (e) {
            console.error('Error in saving to storage', e);
        }
        return saved;
    }
    // remove value from storage
    remove(key: string) {
        if (this.sessionStorageSupported) {
            sessionStorage.removeItem(key);
        }
    }

    // clear storage (remove all items from it)
    clear() {
        if (this.sessionStorageSupported) {
            sessionStorage.clear();
        }
    }
}
export const getNewId = (type: string): string => {
    return `${type}-${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}`;
};

export const sessionStorageWorker = new SessionStorageWorker();
