## 📌 Project Overview

**ProjectPulse** is a full-stack internal project monitoring system designed for IT and software companies.
It helps teams track **project progress, employee confidence, client satisfaction, and delivery risks** in one centralized platform.

Instead of relying on manual status updates, ProjectPulse **automatically calculates a Project Health Score** based on real data from employees and clients, allowing admins to detect **at-risk or critical projects early** and take action.


## 🛠 Tech Stack Used

### Frontend

* **Next.js (App Router)**
* **Tailwind CSS v4**
* Fully responsive UI

### Backend

* **Next.js API Routes (App Router APIs)**

### Database

* **MongoDB Atlas**
* **Mongoose ODM**

### Authentication & Security

* **JWT-based authentication**
* **HTTP-only cookies**
* **Role-based authorization (Admin / Employee / Client)**
* Protected routes via Next.js Middleware

---

## ⚙ Backend Choice

✅ **Backend Option Used:**
**Next.js Backend (API Routes / App Router APIs)**

All backend logic (authentication, project management, check-ins, feedback, risks, and health calculation) is implemented inside the same Next.js project.

---

## 👥 User Roles & Capabilities

### Admin

* Full system access
* Creates and manages projects
* Assigns **one client** and **multiple employees**
* Monitors project health and risks
* Views all projects grouped by health status

### Employee

* Views only assigned projects
* Submits **weekly progress check-ins**
* Reports **blockers and challenges**
* Reports **project risks** with severity and mitigation plans

### Client

* Views assigned projects only
* Submits **weekly feedback**
* Rates satisfaction and communication
* Flags issues when dissatisfied

---

## ❤️ Project Health Score Logic (0–100)

The **Health Score** is automatically calculated using multiple weighted factors:

### Factors Considered

* **Employee confidence levels (1–5)**
* **Client satisfaction ratings (1–5)**
* **Project progress vs timeline**
* **Number and severity of open risks**
* **Flagged client issues**

### Health Interpretation

| Score Range  | Status   |
| ------------ | -------- |
| **80–100**   | On Track |
| **60–79**    | At Risk  |
| **Below 60** | Critical |

📌 The health score is the **single source of truth** for project status and is never manually set.

---

## 🔐 Authentication Rules

* No public registration
* Users are created via **admin seed script**
* JWT stored in **HTTP-only cookies**
* Middleware enforces strict role-based access

---

## 🚀 Setup Instructions (Local)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Apurbo810/ProjectPulse
cd project-pulse
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Seed Demo Users

```bash
POST /api/seed
```

This creates:

* Admin
* Employee
* Client
* Sample project with assignments

### 5️⃣ Run Development Server

```bash
npm run dev
```

---

## 🧪 Demo Login Credentials

| Role         | Email                                                         | Password    |
| ------------ | ------------------------------------------------------------- | ----------- |
| **Admin**    | [admin@projectpulse.com](mailto:admin@projectpulse.com)       | admin123    |
| **Employee** | [employee@projectpulse.com](mailto:employee@projectpulse.com) | employee123 |
| **Client**   | [client@projectpulse.com](mailto:client@projectpulse.com)     | client123   |

## live link 
📎 **live link:**
[https://project-pulse-mud9.vercel.app/](https://project-pulse-mud9.vercel.app/)
