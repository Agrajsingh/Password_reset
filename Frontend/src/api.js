import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
// Remove trailing slash if present to avoid issues with leading slashes in requests
const cleanBaseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

console.log('API baseURL initialized as:', cleanBaseURL);

const api = axios.create({
    baseURL: cleanBaseURL,
});

export default api;
