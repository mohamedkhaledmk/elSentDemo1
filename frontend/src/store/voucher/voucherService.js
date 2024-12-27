import axios from "axios";

const API_URL = 'http://localhost:8000/api/v1';

export const getAllVouchers = async () => {
    const response = await axios.get(`${API_URL}/vouchers`);
        return response.data;
}

export const disableAllVouchers = async () => {
    const response = await axios.put(`${API_URL}/vouchers/disable`);
        return response.data;
}

const voucherService= {
    getAllVouchers,
    disableAllVouchers,
}


export default voucherService;