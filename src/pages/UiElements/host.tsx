//host.tsx
let authToken: string |null = ''; // Initial token value

export const token = (newToken: string | null ) => {
    authToken = newToken;
  };
  
  export const getAuthToken = () => {
    return authToken;
  }; 
export const firebaseHostURL =  "https://operator-develop.api.fitflo.pro/v1/";
// export const firebaseHostURL =  "http://localhost:3000/v1/";
export const gymId = "gXaH6YwQTwOUrBnl4eT0jcfQRtw1"