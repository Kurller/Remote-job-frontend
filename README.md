# Remote Job Application Manager (Frontend)

A React-based frontend application for managing remote job applications. The app provides authentication (login & registration), protected routes, a user dashboard, and the ability to apply for jobs securely.

---

## 🚀 Features

* **User Authentication**

  * Login and Registration
  * JWT-based authentication using access tokens
  * Tokens persisted in `localStorage`

* **Protected Routes**

  * Prevents unauthenticated access to sensitive pages
  * Automatic redirection to login when not authenticated

* **Dashboard**

  * Central hub for authenticated users
  * Supports nested routes under `/dashboard/*`

* **Job Application Flow**

  * Apply to a job using a job ID
  * Route protection ensures only logged-in users can apply

* **Smart Routing**

  * Redirects users based on authentication status
  * Fallback routing for unknown URLs

---

## 🧱 Tech Stack

* **React** (with Hooks)
* **React Router DOM (v6)**
* **Axios** (via custom API instance)
* **Local Storage** (for token persistence)

---

## 📁 Project Structure

```text
src/
│── api/
│   ├── api.js            # Axios instance
│   ├── cvApi.js          # CV-related API calls
│
│── components/
│   ├── Dashboard/
│   │   └── Dashboard.jsx
│   ├── ProtectedRoute.jsx
│
│── Pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── ApplyJob.jsx
│
│── App.jsx               # Main app & routing logic
│── main.jsx              # App entry point
```

---

## 🔐 Authentication Logic

* Tokens are stored in `localStorage` under the key `token`.

* When a user logs in or registers successfully:

  * `setToken(token)` is called
  * Token is persisted automatically

* When a user logs out:

  * Token is removed from `localStorage`
  * User is redirected to `/login`

```js
const [token, setToken] = useState(() => localStorage.getItem("token"));
```

---

## 🛡️ Protected Routes

The `ProtectedRoute` component ensures that only authenticated users can access certain routes.

### Example

```jsx
<Route
  path="/dashboard/*"
  element={
    <ProtectedRoute token={token}>
      <Dashboard setToken={setToken} />
    </ProtectedRoute>
  }
/>
```

If `token` is missing or invalid, the user is redirected to `/login`.

---

## 🧭 Routing Overview

| Route           | Access        | Description                   |
| --------------- | ------------- | ----------------------------- |
| `/login`        | Public        | User login page               |
| `/register`     | Public        | User registration page        |
| `/apply/:jobId` | Protected     | Apply for a specific job      |
| `/dashboard/*`  | Protected     | User dashboard                |
| `*`             | Auto-redirect | Redirects based on auth state |

### Fallback Behavior

```jsx
<Route
  path="*"
  element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
/>
```

* Authenticated users → `/dashboard`
* Unauthenticated users → `/login`

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

Ensure your Axios instance uses this value.

---

## 🧪 Running the Project Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Kurller/Remote-job-Frontend.git
cd Remote-job-Application-Frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

```bash
npm run build
```

Deployed with **Vercel**.

---

## 🔒 Security Notes

* Do **not** store sensitive data other than tokens in `localStorage`.
* Always use HTTPS in production.
* Backend should validate tokens on every protected request.

---

## 📌 Future Improvements

* Refresh token rotation
* Role-based access control (Admin / User)
* Better error handling & notifications
* Unit and integration tests

---

## 👨‍💻 Author

**Remote Job Application Manager**

Built with ❤️ using React.

By Kolawole Oladejo

---

---

