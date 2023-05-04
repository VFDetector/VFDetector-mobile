const baseUrl = "http://localhost:8282";

export default {
  user: {
    auth: `${baseUrl}/user/auth`,
    get: `${baseUrl}/user`,
    register: `${baseUrl}/user/register`,
  },
};
