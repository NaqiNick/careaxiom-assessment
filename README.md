
# 🌐 Careaxiom Coding Assessment – Node.js Title Fetcher

This project is a simple Node.js server that handles one specific route and returns the `<title>` tag for one or more given URLs. It demonstrates asynchronous control flow, modular design, and good software engineering practices.

---

## 📋 Problem Statement

Create a Node.js server that:

- Accepts a GET request to `/I/want/title`
- Expects one or more query params like `?address=google.com&address=www.dawn.com/events`
- Fetches each website, extracts its `<title>`, and returns an HTML response listing them
- Handles invalid URLs with a fallback message: `"NO RESPONSE"`
- Responds with `404` for all other routes

---

## 📁 Project Structure

```

careaxiom-title-fetcher/
├── server.js                  # Entry point
├── routes/
│   └── title-route.js         # Route handler for /I/want/title
├── services/
│   └── title-fetcher.js       # Logic to fetch and parse titles
├── utils/
│   └── html-builder.js        # Generates HTML response
└── README.md

````

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/careaxiom-title-fetcher.git
cd careaxiom-title-fetcher
````

### 2. Run the Server

```bash
node server.js
```

### 3. Try a Request

Open your browser or use curl:

```
http://localhost:3000/I/want/title/?address=google.com&address=www.dawn.com/events/
```

---

## ✅ Features

* ✅ Supports HTTP and HTTPS URLs
* ✅ Handles redirects (301, 302)
* ✅ Graceful fallback for invalid addresses
* ✅ Modular, testable, and easy to extend
* ✅ Custom `User-Agent` to avoid bot-blocking
* ✅ Follows clean architecture: routes, services, utils

---

## 🛠 Tech Stack

* Node.js (plain HTTP)
* No external libraries (callback version)
* Follows JS modular and Node idiomatic standards

---

## 🙋‍♂️ Author

**Naqi Azam**
[LinkedIn](https://www.linkedin.com/in/naqi-azam) | [GitHub](https://github.com/your-username)
