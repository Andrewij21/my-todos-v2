import {getData} from "./axiosInstance";

export default async function fetcher<T>(url:string): Promise<T> {
    try {
        const response = await getData(url);
        return response;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch");
      }
}
