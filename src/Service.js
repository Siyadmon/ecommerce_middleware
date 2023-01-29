import instance from './api/instance';

export const postDataToJson = (url, data) => instance.post(url, data);
export const getDataFromJson = (url) => instance.get(url);
export const editDataInJson = (url, data) => instance.put(url, data);
export const deleteDataFromJson = (url) => instance.delete(url);
