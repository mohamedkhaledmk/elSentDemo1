import axios from "axios";

const API_URL = "https://el-sent-demo1-backend.vercel.app//api/v1";

export const getAllMetals = async () => {
  const response = await axios.get(`${API_URL}/metals`);
  return response.data.data;
};

const metalsService = {
  getAllMetals,
};

export default metalsService;
