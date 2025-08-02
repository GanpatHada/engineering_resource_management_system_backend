# 🧠 Engineering Resource Management System – Backend

This is the backend for the Engineering Resource Management System, which enables managers to allocate engineers to projects based on availability and skillset, and track team capacity.

---

## 🌐 🚀 Live Demo & Documentation

<div style="border: 1px solid #ccc; padding: 16px; border-radius: 8px; background-color: #000000ff;">

🔗 <strong>Frontend Live URL:</strong>  
<a href="https://ermsgeeky.vercel.app" target="_blank">https://ermsgeeky.vercel.app</a>

🟢 <strong>Backend API (Hosted on Render):</strong><br>
<a href="https://engineering-resource-management-system-crbg.onrender.com" target="_blank">https://engineering-resource-management-system-crbg.onrender.com</a>

📬 <strong>Postman API Collection:</strong>  
<a href="https://documenter.getpostman.com/view/19675500/2sB3BAMCn8" target="_blank">https://documenter.getpostman.com/view/19675500/2sB3BAMCn8</a>

</div>


---

## 🛠️ Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for Authentication
- **RESTful API Design**

---

## 📁 Folder Structure


```bash
project-root/
├── public/                 # Static files (favicon, robots.txt, etc.)
├── .env                    # For secrets
├── server.js               # Entry point of the backend app
├── package.json            # Project metadata and scripts
├── README.md               # Documentation and instructions
└── src/                    # All core backend source files
    ├── configs/            # Configuration files (e.g., DB, env)
    ├── controllers/        # Route handler logic
    ├── middlewares/        # Auth, error handling, etc.
    ├── modals/             # Mongoose schemas/models
    ├── routes/             # API route definitions
    ├── services/           # Business logic layer
    └── utils/              # Helper utility functions

```

## 🧪 Run Locally

Follow the steps below to set up and run the backend locally:

### 1. Clone the repository

```bash
git clone https://github.com/GanpatHada/engineering_resource_management_system_backend.git
cd engineering_resource_management_system_backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the root folder and add the following:

```env
MONGODB_URI=mongodb+srv://hadaganpat42:SNfIEm9fMUUGDMw2@cluster0.q7r7ld1.mongodb.net

DATABASE_NAME=engineering_resource_management_system

JWT_SECRET=geekyantjwtsecret
```


### 4. Start the server

```bash
node server.js
```

> By default, the server will run on `http://localhost:8000`

---


