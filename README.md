building continuous add oauth
project is closed
# Build Bharat Hackathon Portal

A comprehensive, full-stack web application designed for the "Build Bharat Hackathon". This portal provides a robust platform for managing the entire hackathon lifecycle, including team registration, role-based dashboards, and a ranking system.

## 🚀 Key Features

- **User Authentication**: Secure JWT-based authentication system.
- **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for different user roles:
  - 🎓 **Students**: Register for the hackathon, form teams, and submit projects.
  - 🤝 **Mentors**: Guide teams, view submissions, and provide feedback.
  - ⚖️ **Evaluators**: Review and score projects based on defined criteria.
  - ⚙️ **Admins**: Manage users, oversee the event, and generate reports.
- **Team Registration System**: Streamlined process for forming and joining hackathon teams.
- **Interactive Dashboards**: Tailored views for each user role to manage their specific tasks.
- **Ranking System**: Automated evaluation and leaderboard generation.

## 🛠️ Technology Stack

**Frontend (Client)**
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Plain CSS (Modern & Responsive)
- **Routing**: React Router DOM
- **State/Data Fetching**: Axios
- **Form Validation**: Zod
- **Icons**: Lucide React

**Backend (Server)**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JSON Web Tokens (JWT) & bcrypt
- **Validation**: Zod

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- PostgreSQL running locally or a remote database URL

### 1. Clone the repository
```bash
git clone <repository-url>
cd aibh
```

### 2. Backend Setup
Navigate to the server directory, install dependencies, and configure the database.

```bash
cd server
npm install
```

**Environment Variables**
Create a `.env` file in the `server` directory and add the necessary variables:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/build_bharat?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
```

**Database Migration & Prisma Setup**
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to the database
npx prisma db push
```

**Start the Development Server**
```bash
npm run dev
```
The server will start on `http://localhost:5000` (or your configured port).

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and start the Vite development server.

```bash
cd client
npm install

# Start the development server
npm run dev
```
The frontend will typically run on `http://localhost:5173`.

---

## 📁 Project Structure

```
aibh/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code (Components, Pages, etc.)
│   └── package.json        # Frontend dependencies
├── server/                 # Express Backend
│   ├── prisma/             # Database schema and migrations
│   ├── src/                # Source code (Controllers, Routes, Utils)
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## 📜 License
This project is licensed under the ISC License.
