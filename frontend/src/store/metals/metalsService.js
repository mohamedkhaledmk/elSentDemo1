import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1';

export const getAllMetals = async () => {
    const response = await axios.get(`${API_URL}/metals`);
    return response.data.data;
}

const metalsService= {
    getAllMetals,
}

export default metalsService;