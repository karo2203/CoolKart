// Base URL for API
const API_URL = "https://coolkart.onrender.com";

// Toast Notification System
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  
  container.appendChild(toast);
  
  // Cleanup after animation
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Fetch wrapper with Auth
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('stallify_token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
   const response = await fetch(`${API_URL}${endpoint}`,{
      ...options,
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    showToast(error.message);
    throw error;
  }
}

// Logout function
function logout() {
  localStorage.removeItem('stallify_token');
  localStorage.removeItem('stallify_user');
  window.location.href = 'login.html';
}
