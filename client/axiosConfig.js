import axios from 'axios';
import { useRouter } from 'next/router';

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // If the response status is 200, the request was successful
    if (response.status == 401 || response.status == 403) {
      // Redirect to the login page when the session is not live
      const router = useRouter();
      router.push('/login');
    }
    return response;

  },
  (error) => {
    // If the response status is not 200, there was an error
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Redirect to the login page when the session is not live
      const router = useRouter();
      router.push('/login');
    }

    // Return the error for further handling if needed
    return Promise.reject(error);
  }
);

// Other Axios configurations or defaults can be set here

export default axios;
