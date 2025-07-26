export const setLocalData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};
export const getLocalData = (key: string): any => {
    if (typeof window === "undefined") return null; 
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return null;
    }
  };
  

export const deleteLocalStorage = (key: string) => {
    localStorage.removeItem(key)
}