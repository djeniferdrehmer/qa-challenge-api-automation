# API Automation Challenge 

Automated tests for REST APIs (e.g., **Account** and **Bookstore**) using **Playwright APIRequestContext** with **Cucumber.js (BDD)**.  
Focus areas: token generation, auth‑protected endpoints, negative cases, and payload/schema validation.

---

## Tech Stack

* **Automation Framework:** [Playwright](https://playwright.dev/)
* **BDD Framework:** [Cucumber.js](https://cucumber.io/docs/cucumber/api/?lang=javascript)
* **Language:** JavaScript / Node.js
* **Assertions:** Playwright Test Library (`@playwright/test`)

---

## Project Structure
.
├── features
│   ├── account.feature
│   └── bookstore.feature
├── steps
│   ├── account.steps.js
│   ├── bookstore.steps.js
│   └── common.steps.js
└── support
    └── world.js

---

## Setup

1) **Install dependencies**
```bash
npm i
```

2) **Create your environment file**
Copy `.env.example` → `.env` and adjust values (see **Environment** below).

3) **Run all tests**
```bash
npm run test
```

3) **Run by script/tag**
```bash
npm run test:account    # only @account
npm run test:bookstore  # only @bookstore

# Run with any custom tag
npm run test:tag -- "@custom_tag"
```

---

## Environment (.env)
This project uses `process.env` to configure base URL, credentials and headers.

Copy `.env.example` to `.env` and fill the values:

```
# Server under test
API_BASE_URL=https://demoqa.com

# Bookstore / Account credentials (sample)
BOOKSTORE_USERNAME=demo_user
BOOKSTORE_PASSWORD=Test@12345
BOOKSTORE_USER_ID=UUID
```

---

**Author:** Djenifer Drehmer
