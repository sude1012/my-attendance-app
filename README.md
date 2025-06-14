# My Attendance App

A web application for tracking attendance with time-in/time-out, built with React (Vite) and Node.js.

---

## Features

- Timekeeping (Time-In/Time-Out)
- Attendance monitoring table
- Pagination and lazy loading
- Export to Excel
- Test and Production environments

---

## Getting Started

### 1. **Clone the repository**

```sh
git clone https://github.com/yourusername/my-attendance-app.git
cd my-attendance-app
```

### 2. **Install dependencies**

```sh
npm install
```

### 3. **Set up environment variables**

Create `.env.test` and `.env.prod` in the project root:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=attendance_app_test   # or attendance_app_prod
NODE_ENV=test                 # or production
```

Add `.env*` to your `.gitignore` to keep secrets safe.

### 4. **Run the backend**

- **Test environment:**

  ```sh
  NODE_ENV=test node config/server.js
  ```

- **Production environment:**

  ```sh
  NODE_ENV=production node config/server.js
  ```

### 5. **Run the frontend**

```sh
npm start
```

---

## Usage

- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Use the UI to time in/out and monitor attendance.

---

## Folder Structure

```
/backend
  server.js
  psql.js
/src
  components/
  ...
.env.test
.env.prod
```

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
