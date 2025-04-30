# 🌍 MERN Location App

A full-featured MERN (MongoDB, Express, React, Node.js) application where users can:

- Select a location on an interactive map

- Submit location details with image upload

- View all submitted locations on the map

- Edit and update existing locations

- Authenticate via login

- Drag markers and view location popups

---

## ✨ Features

- ✅ React + Redux Toolkit for state management

- ✅ React Hook Form for form handling and validation

- ✅ React Leaflet + Leaflet for interactive map

- ✅ Image uploading using Multer

- ✅ Express.js + MongoDB backend

- ✅ JWT-based authentication

- ✅ Marker dragging and popups

- ✅ Responsive and intuitive UI (Tailwind CSS)

- ✅ Lazy loading and code-splitting for performance

---

## 📦 Folder Structure

```

mern-location-app/

├── backend/ # Express server

│ ├── controllers/ # Logic for routes

│ ├── middleware/ # Auth & error handling

│ ├── models/ # Mongoose models

│ ├── routes/ # API endpoints

│ ├── uploads/ # Uploaded images

│ ├── .env # Environment variables

│ └── server.js # Entry point

├── frontend/ # React client

│ ├── public/

│ └── src/

│ ├── components/ # Reusable components

│ ├── pages/ # Route pages (Form, Map, List, Login)

│ ├── store/ # Redux slices

│ ├── App.jsx # Main app component

│ └── main.jsx # React entry point

└── package.json

```

---

## ⚙️ Backend Setup

### 1. Navigate and install:

```bash

cd  backend

npm  install

```

### 2. Create `.env` file in `/backend`:

```env

PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

```

### 3. Start backend server:

```bash

npm  run  dev

```

Server runs on: `http://localhost:5000`

---

## ⚛️ Frontend Setup

### 1. Navigate and install:

```bash

cd  frontend

npm  install

```

### 2. Create `.env` file in `/frontend`:

```env

REACT_APP_API_URL=http://localhost:5000

```

### 3. Start frontend dev server:

```bash

npm  run  dev

```

App runs on: `http://localhost:3000`

---

## 🔐 Authentication

Basic login form using JWT.

### Default Test Credentials:

```

Username: admin

Password: password

```

> You can modify these in `backend/routes/authRoutes.js`.

---

## 🌐 API Endpoints

### Auth

| Method | Endpoint | Description |

|--------|-------------------|-----------------------|

| POST | /api/auth/login | Login and get JWT |

### Locations

| Method | Endpoint | Description |

|--------|------------------------|----------------------------|

| GET | /api/locations | Get all locations |

| POST | /api/locations | Create a new location |

| PUT | /api/locations/:id | Update a location |

| GET | /uploads/:filename | Serve uploaded image |

---

## ✨ Bonus Features

- ✅ Marker dragging on map

- ✅ Popups on map markers

- ✅ Lazy loading with React's `Suspense`

- ✅ Protected routes for authenticated access

- ✅ Notifications for success/failure

- ✅ Clean and modern responsive design

---

## ⚠️ Environment Variables Summary

### Frontend

```

REACT_APP_API_URL=http://localhost:5000

```

### Backend

```

PORT=5000

MONGO_URI=<your_mongodb_uri>

JWT_SECRET=<your_secret>

```

---

## 👨‍💻 Author

Built by [Min Htet](https://github.com/MinHtet007007)

Feel free to reach out with feedback or questions!
