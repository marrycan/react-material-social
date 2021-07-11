import axios from 'axios';
const api_url = "https://us-central1-react-app-50ed0.cloudfunctions.net";

const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
    }
};

export async function stripe_CreateCardTokenAndCustomer(req_data) {
    const result = await axios.post(`${api_url}/createCardAndCustomer`, req_data, config);
    return result.data;
}

export async function stripe_GetPlans() {
    const { data } = await axios.post(`${api_url}/getPlans`, config);
    return data.data;
}

export async function stripe_CreateSubscription(req_data) {
    const result = await axios.post(`${api_url}/createOnlySubscription`, req_data, config);
    return result.data;
}

export async function stripe_UpdateSubscription(req_data) {
    const result = await axios.post(`${api_url}/updateSubscription`, req_data, config);
    return result.data;
}

export async function stripe_CancelSubscription(req_data) {
    const result = await axios.post(`${api_url}/cancelSubscription`, req_data, config);
    return result.data;
}

export async function stripe_GetSubscriptionsByCustomer(req_data) {
    const result = await axios.post(`${api_url}/getSubscriptionsByCustomer`, req_data, config);

    return result.data;
}