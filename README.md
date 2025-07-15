# ✈️ apnaAIRLINES

**apnaAIRLINES** is a practice full-stack flight booking web application built as part of an internship project. It simulates a simplified airline reservation system with core features such as searching flights, booking tickets, and managing bookings — both from a user and admin perspective.

This project was developed to strengthen practical skills in backend development, frontend integration, and full-stack deployment.

---

## 🚀 Features

- 🔎 Search for flights by source, destination, and date
- 🧾 Book flights and view your bookings
- 🎫 Dynamic seat availability and ticket pricing
- 🔐 User authentication (login/register)
- 🛠 Admin panel to:
  - Add new flights
  - Edit capacities and prices
  - Monitor bookings
- 📅 Real-time flight filtering
- 📂 MongoDB-based data persistence

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Other:**
- JWT for authentication
- RESTful API structure
- Git & GitHub for version control

---

## 📁 Project Structure

\`\`\`
apnaAIRLINES/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── .env
├── README.md
└── package.json
\`\`\`

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/saksham399/apnaAIRLINES.git
   cd apnaAIRLINES
   \`\`\`

2. **Install backend dependencies**
   \`\`\`bash
   cd backend
   npm install
   \`\`\`

3. **Configure environment**
   - Create a \`.env\` file in the backend folder with:
     \`\`\`
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     \`\`\`

4. **Start backend server**
   \`\`\`bash
   npm start
   \`\`\`

5. **Install frontend dependencies**
   \`\`\`bash
   cd ../frontend
   npm install
   \`\`\`

6. **Start frontend**
   \`\`\`bash
   npm run dev
   \`\`\`

---

## 📌 Notes

- This is a **practice project** developed as part of an **internship assignment**, not intended for production use.
- The focus is on learning backend logic, integration, and managing a full-stack codebase.

---

## 📧 Contact

Created by [@saksham399](https://github.com/saksham399)  
For any queries, feel free to reach out via GitHub issues or discussions.
