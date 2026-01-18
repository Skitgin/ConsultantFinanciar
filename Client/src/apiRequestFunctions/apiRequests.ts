import type { Consultant } from "../app/models/Consultant";
import type { Review } from "../app/models/Review"
import type { ReviewInput } from "../app/models/ReviewInput"
const API_URL = "https://consultantifinanciari.azurewebsites.net";
async function apiRequest<T>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: undefined | ReviewInput | FormData,
    headers?: Record<string, string> | undefined,
    id?: string,)
    : Promise<T> {
    if (body instanceof FormData) { headers = { ...headers }; }
    else { headers = { "Content-Type": "application/json", ...headers }; }
    if (id) url = `${url}/${id}`;
    const response = await fetch(url, {
        method,
        headers: { ...headers },
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json() as T;
}


export async function addNewReview(form: ReviewInput): Promise<Review> {
    return await apiRequest<Review>(`${API_URL}/api/Review`, "POST", form);
}
export async function fetchReviewList(): Promise<Review[]> {
    return await apiRequest<Review[]>(`${API_URL}/api/Review`, 'GET');
}

export async function fetchConsultantList(): Promise<Consultant[]> {
    return await apiRequest<Consultant[]>(`${API_URL}/api/Consultants`, 'GET');
}