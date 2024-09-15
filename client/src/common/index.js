const backendDomain = 'http://localhost:8080';

const SummeryApi = {
  signup: {
    method: "POST",
    url: `${backendDomain}/api/auth/signup`,
  },
  signin: {
    method: "POST",
    url: `${backendDomain}/api/auth/signin`,
  },
  google: {
    method: "POST",
    url: `${backendDomain}/api/auth/google`,
  }, 
  update: {
    method: "POST",
    url: `${backendDomain}/api/user/update`,
  },
  delete: {
    method: "DELETE",
    url: `${backendDomain}/api/user/delete`,
  },
  signout: {
    method: "GET",
    url: `${backendDomain}/api/auth/signout`,
  }, 
};

export default SummeryApi;
