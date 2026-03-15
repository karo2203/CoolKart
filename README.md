# 🍦 CoolKart – Smart Food Stall Ordering System

![CoolKart Banner](https://via.placeholder.com/1200x400?text=CoolKart+-+Smart+Food+Stall+Ordering+System)

## 📖 Project Overview

**CoolKart** (also known as Stallify) is a modern, full-stack web application designed for small food stalls (like ice cream and juice shops). It empowers customers to seamlessly browse a digital menu, add items to their cart, and securely place online orders through a futuristic glassmorphic UI. 

Simultaneously, the platform provides an intuitive Admin Dashboard for stall owners to manage real-time order statuses, track daily revenue, and monitor pending payments effortlessly.

---

## 🛠️ Tech Stack

This project leverages a robust and scalable architecture:

*   **Frontend:** HTML5, CSS3 (Vanilla Glassmorphism), JavaScript
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB Atlas (Cloud Database)
*   **Authentication:** JWT (JSON Web Tokens) & bcryptjs
*   **Deployment Platforms:** Vercel (Frontend) and Render (Backend API)

---

## 📁 Project Structure

```text
CoolKart
 └ stallify-app
     ├ backend
     │   ├ models
     │   │   ├ Order.js
     │   │   └ User.js
     │   ├ routes
     │   │   ├ authRoutes.js
     │   │   ├ menuRoutes.js
     │   │   └ orderRoutes.js
     │   └ server.js
     ├ frontend
     │   ├ index.html
     │   ├ login.html
     │   ├ register.html
     │   ├ admin.html
     │   ├ home.js
     │   ├ script.js
     │   └ styles.css
     ├ package.json
```

---

## ✨ Features

*   **User Registration & Login:** Secure authentication system using hashed passwords (`bcryptjs`) and session management via `JWT`.
*   **Interactive Menu Display:** Categorized digital menu elegantly showcasing Ice Creams and Juices.
*   **Dynamic Cart System:** Users can add, remove, and adjust quantities in a smooth sliding cart interface.
*   **Order Placement securely:** Checkout system supporting 'Cash on Delivery' and 'Online Payment'.
*   **Admin Dashboard:** Dedicated interface for stall owners to view all active orders and update preparation statuses (Pending -> Preparing -> Ready -> Completed).
*   **MongoDB Integration:** Deep integration with MongoDB Atlas for persistent storage of Users and Orders natively via Mongoose.

---

## 🚀 Installation Guide

Follow these step-by-step instructions to run the CoolKart project locally on your machine:

1.   **Clone the repository:**
     ```bash
     git clone https://github.com/karo2203/CoolKart.git
     cd CoolKart/stallify-app
     ```

2.   **Install Dependencies:**
     ```bash
     npm install
     ```

3.   **Configure Environment Variables:**
     Inside the `stallify-app/backend` directory, create a `.env` file and add your MongoDB Atlas connection string and secret key:
     ```env
     MONGO_URI=your_mongodb_atlas_connection_string
     PORT=5000
     JWT_SECRET=your_super_secret_jwt_key
     ```

4.   **Start the Backend Server:**
     ```bash
     npm start
     ```
     *(You should see `MongoDB connected` and `Server running on http://localhost:5000` in the terminal)*

5.   **Open the Frontend:**
     Simply open the `stallify-app/frontend/index.html` file in your preferred web browser.

---

## 🌍 Deployment

The CoolKart application is designed to be deployed across two separate cloud services for maximum performance:

*   **Frontend Deployment (Vercel):** The static files located in the `frontend/` folder can be seamlessly deployed to Vercel. 
*   **Backend Deployment (Render):** The Node.js API residing in the `backend/` folder can be hosted as a Web Service on Render.
*   **Database (MongoDB Atlas):** The data itself lives securely in the MongoDB Atlas cloud cluster.

---

## 📸 Screenshots

*(Replace these placeholders with actual screenshots of your application)*

### Login Page
![Login Page Screenshot Placeholder](https://via.placeholder.com/800x400?text=Login+Page+Screenshot)

### Menu Page & AI Recommendations
![Menu Page Screenshot Placeholder](https://via.placeholder.com/800x400?text=Menu+Page+Screenshot)

### Dynamic Cart System
![Cart System Screenshot Placeholder](https://via.placeholder.com/800x400?text=Sliding+Cart+Screenshot)

### Admin Dashboard
![Admin Dashboard Screenshot Placeholder](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

---

## 👨‍💻 Developer

**Developed by:** Karoliya Agin Doli  
**Email:** [karoliyaagindoli22@gmail.com](mailto:karoliyaagindoli22@gmail.com)  
**GitHub:** [https://github.com/karo2203](https://github.com/karo2203)  

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to clone, fork, and modify it as you please!
