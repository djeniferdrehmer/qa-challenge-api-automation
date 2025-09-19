# API Automation Challenge 

This repository contains an automated testing solution for **Account** & **Bookstore** endpoints (DemoQA API).

---

## Tech Stack

* **Automation Framework:** [Playwright](https://playwright.dev/)
* **BDD Framework:** [Cucumber.js](https://cucumber.io/docs/cucumber/api/?lang=javascript)
* **Language:** JavaScript / Node.js

---

## Project Structure

```
.
├── features                  # feature files
│   ├── account.feature
│   └── bookstore.feature
├── steps                     # step definitions
│   ├── account.steps.js
│   ├── bookstore.steps.js
│   └── common.steps.js
└── support                   # context
    └── world.js
```

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
