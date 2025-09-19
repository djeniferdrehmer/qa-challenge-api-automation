const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { request } = require("@playwright/test");
require("dotenv").config();

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.api = null;
    this.token = null;
    this.userId = null;
    this.response = null;
    this.responseBody = null;
  }

  async newApiContext() {
    if (!this.api) {
      this.api = await request.newContext({
        baseURL: process.env.API_BASE_URL,
      });
    }
    return this.api;
  }

  async loginBookstoreUser() {
    const api = await this.newApiContext();
    const response = await api.post("/Account/v1/GenerateToken", {
      data: {
        userName: process.env.BOOKSTORE_USERNAME,
        password: process.env.BOOKSTORE_PASSWORD,
      },
    });
    const body = await response.json();
    this.token = body.token;
    this.userId = process.env.BOOKSTORE_USER_ID;
  }
}

setWorldConstructor(CustomWorld);