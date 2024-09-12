
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080'; 
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Fetch data for the Goals page
//  export const fetchData = async () => {
//    try {
//      const response = await apiClient.get('/data');
    
//     return response.data;
//    } catch (error) {
//      console.error('Error fetching data:', error);
//      throw error;
//   }
//  };

// // Save goals

// // export const saveGoals = async (goals) => {
// //   try {
// //     const response = await apiClient.post('/api/addGoalData', goals);
// //     console.log('Goal data saved successfully:', response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Error saving goals:', error);
// //     throw error;
// //   }
// // };

// export const saveGoals = async (goals) => {
//   try {
//     const response = await apiClient.post('/api/addGoalData', goals);  // POST request to save data in MongoDB
//     console.log('Goal data saved successfully:', response.data);
//     return response.data;  // Return the response from the MongoDB API
//   } catch (error) {
//     console.error('Error saving goals:', error);
//     throw error;  // Propagate error to be caught in the `handleSave` function
//   }
// };

// services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const fetchData = async () => {
  try {
    const response = await apiClient.get('/data');
   
   return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
 }
};
// Save goals
export const saveGoals = async (goals) => {
  try {
    const response = await apiClient.post('/api/addGoalData', goals); // POST request to save data in MongoDB
    console.log('Goal data saved successfully:', response.data);
    return response.data;  // Return the response from the MongoDB API
  } catch (error) {
    console.error('Error saving goals:', error);
    throw error;  // Propagate error to be caught in the `onSubmit` function
  }
};

