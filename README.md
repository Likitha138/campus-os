# 🏫 Campus OS — Intelligent 3D Campus Digital Twin

**Explore. Simulate. Optimize.**

Campus OS is a smart campus management and digital twin web application designed to simulate campus activities, visualize campus operations, and provide centralized access to academic and administrative information.

The platform combines an interactive campus interface, simulated IoT data, event management, and academic management modules to demonstrate how digital technologies can improve campus monitoring and decision-making.

> **Project approach:** Campus OS simulates IoT-style campus activity digitally through software. It does not require physical IoT devices.

## ✨ Key Features

### 🗺️ Interactive Campus Digital Twin
- Interactive campus visualization and navigation.
- Campus building and room information.
- Digital simulation of campus activity and occupancy.
- Visual representation of campus zones and traffic conditions.

### 📅 Campus Event Management
- Create and manage campus events.
- Store event information in a MySQL database.
- Display published events in the student view.
- View event dates, times, locations, and categories.
- Refresh campus event information.

### 🎓 Academic Management
- Attendance management.
- Student marks and grade information.
- Assignment management.
- Academic performance monitoring.

### 🚦 Smart Campus Simulation
- Simulated campus traffic and movement.
- Occupancy and activity indicators.
- Environmental information and campus status displays.
- Digital scenarios for demonstrating smart-campus operations.

### 🤖 Intelligent Analytics
- Campus activity dashboards.
- Academic performance insights.
- Potential low-attendance and performance alerts.
- Data-driven reporting and decision support.

*Individual modules and analytics capabilities are being integrated and tested as development progresses.*

### 🔐 Authentication and Access Control
- Student registration and login workflow.
- Separate administrative access.
- Role-based access design for student and administrator activities.

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS, CSS |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Database connectivity | `mysql2` |
| Development tools | VS Code, Git, GitHub |

## 🏗️ System Architecture

```text
Campus OS Web Application
          |
          v
React + TypeScript Frontend
          |
          v
Backend REST APIs
     Node.js + Express
          |
          v
      MySQL Database
          |
          v
Campus Data and Management
```

Campus OS uses a frontend-backend architecture in which the React application communicates with backend REST APIs, and the backend interacts with MySQL to store and retrieve application data.

## 📂 Project Structure

```text
campus-os/
├── src/
│   ├── auth/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

*The exact folders may vary depending on the current implementation.*

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/)
- [MySQL](https://dev.mysql.com/downloads/)
- [Git](https://git-scm.com/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd campus-os
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the frontend

```bash
npm run dev -- --port 5174
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5174
```

### 4. Configure the backend

Open the backend directory in a separate terminal:

```bash
cd backend
npm install
```

Configure the backend environment variables according to the project's database configuration and `.env` example, if provided.

Ensure the MySQL server is running and the existing `campus_os` database is configured correctly. Use the project's existing schema and migrations where applicable; do not overwrite an existing database unnecessarily.

### 5. Start the backend

Use the start script defined in `backend/package.json`. For example:

```bash
npm run dev
```

The development backend is configured to use port `5000`.

Confirm that the backend can connect to MySQL before testing the API endpoints.

## 🧪 Testing

Development and integration testing can include:

- Frontend page and navigation checks.
- REST API request and response validation.
- MySQL data persistence checks.
- Event creation and student-side event display.
- Attendance, marks, and assignment integration.
- Authentication and access-control verification.
- End-to-end frontend/backend testing.

## 🎯 Project Objectives

- Centralize campus information and management workflows.
- Demonstrate a software-based campus digital twin.
- Simulate IoT-style campus activity without physical devices.
- Improve visibility into academic and administrative information.
- Explore analytics-driven campus monitoring and decision support.
- Build a modular web application that can be extended with additional features.

## 🔮 Future Enhancements

- Complete integration of all academic management modules.
- Advanced 3D campus visualization.
- Expanded simulated vehicle and traffic monitoring.
- Automated academic alerts and reporting.
- Improved analytics dashboards.
- Additional role-based permissions and security checks.

## 👩‍💻 Development

Campus OS is being developed as an academic software project using a modular frontend, REST API backend, and relational database.

The application is intended to demonstrate the practical use of web technologies, database integration, digital simulation, and intelligent campus management concepts.

## 📄 License

Add a license appropriate for your project before redistributing or reusing the source code.

---

**Campus OS — A smarter way to explore and manage a digital campus.**
