import axios from 'axios';

// Configure axios for api connections.
export default axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
