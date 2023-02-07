import axiosClient from "./axiosClient";

const phoneApi = {
  async createNewAccessCode(phoneNumber) {
    const url = "/phone/create";
    try {
      const response = await axiosClient.post(url, { phoneNumber });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async validateAccessCode(account) {
    const url = "/code/validate";
    try {
      const response = await axiosClient.post(url, account);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

export default phoneApi;
