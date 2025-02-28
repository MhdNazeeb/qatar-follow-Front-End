export const setLocalData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};
export const getLocalData = (key: string) => {
    const data = localStorage?.getItem(key);
    return data ? JSON?.parse(data) : null;

}

export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}