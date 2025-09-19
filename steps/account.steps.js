const { When, Then } = require("@cucumber/cucumber");
const { expect } = require('@playwright/test');

When("I register an account with unique username and valid password", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/User", {
    data: {
      userName: `user_${Math.random(159)}`,
      password: "Test@12345",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
  this.userId = this.responseBody.userID;
  this.username = this.responseBody.username;
  this.password = "Test@12345";
});

Then("the response should contain a non-empty {string}", async function (userID) {
  expect(this.responseBody).toHaveProperty(userID);
});

Then('the response should contain {string}', function (username) {
  expect(this.responseBody).toHaveProperty(username);
});

Then('the response should not contain the {string}', function (password) {
  expect(this.responseBody).not.toHaveProperty(password);
});

When("I register an account with the same username", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/User", {
    data: {
      userName: this.username,
      password: "Test@12345",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

When("I register an account with password {string}", async function (password) {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/User", {
    data: {
      userName: `user_${Math.random(159)}`,
      password: password,
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

When("I register an account with {string}", async function (body) {
  const api = await this.newApiContext();
  let data;
  switch (body) {
    case "no-body":
      data = undefined;
      break;
    case "missing-username":
      data = { password: "test" };
      break;
    case "missing-password":
      data = { userName: "test" };
      break;
    case "empty-username":
      data = { userName: "", password: "test" };
      break;
    case "empty-password":
      data = { userName: "test", password: "" };
      break;
    case "null-username":
      data = { userName: null, password: "test" };
      break;
    case "null-password":
      data = { userName: "test", password: null };
      break;
    default:
      throw new Error(`Unknown body type: ${body}`);
  }
  this.response = await api.post("/Account/v1/User", {
    data,
  });
  this.responseBody = await this.response.json();
});

When("I generate a token using valid credentials", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/GenerateToken", {
    data: {
      userName: this.username,
      password: this.password,
    },
  });
  this.response = response;
  this.responseBody = await response.json();
  this.token = this.responseBody.token;
});

Then('the response should contain status {string}', function (status) {
  expect(this.responseBody.status).toBe(status);
});

Then('the response should contain the token', function () {
  expect(this.responseBody.token).toBeTruthy();
});

When("I generate a token with {string}", async function (body) {
  const api = await this.newApiContext();
  let data;
  switch (body) {
    case "no-body":
      data = undefined;
      break;
    case "missing-username":
      data = { password: "test" };
      break;
    case "missing-password":
      data = { userName: "test" };
      break;
    case "empty-username":
      data = { userName: "", password: "test" };
      break;
    case "empty-password":
      data = { userName: "test", password: "" };
      break;
    case "null-username":
      data = { userName: null, password: "test" };
      break;
    case "null-password":
      data = { userName: "test", password: null };
      break;
    default:
      throw new Error(`Unknown body type: ${body}`);
  }
  this.response = await api.post("/Account/v1/GenerateToken", {
    data,
  });
  this.responseBody = await this.response.json();
});

When("I generate a token with incorrect password", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/GenerateToken", {
    data: {
      userName: this.username,
      password: "incorrectpassword",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

Then('the response should not contain the token', function () {
  expect(this.responseBody.token).not.toBeTruthy();
});

When("I generate a token using invalid credentials", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/GenerateToken", {
    data: {
      userName: "invalidusername",
      password: "invalidpassword",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

When("I check authorization for the user", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/Authorized", {
    data: {
      userName: this.username,
      password: this.password,
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

Then('the response should equal {string}', function () {
  expect(this.responseBody.token).not.toBeTruthy();
});

When("I check authorization using invalid user credentials", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/Authorized", {
    data: {
      userName: "invalidusername",
      password: "invalidpassword",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

When("I check authorization with incorrect password", async function () {
  const api = await this.newApiContext();
  const response = await api.post("/Account/v1/Authorized", {
    data: {
      userName: this.username,
      password: "incorrectpassword",
    },
  });
  this.response = response;
  this.responseBody = await response.json();
});

When("I check authorization with {string}", async function (body) {
  const api = await this.newApiContext();
  let data;
  switch (body) {
    case "no-body":
      data = undefined;
      break;
    case "missing-username":
      data = { password: "test" };
      break;
    case "missing-password":
      data = { userName: "test" };
      break;
    case "empty-username":
      data = { userName: "", password: "test" };
      break;
    case "empty-password":
      data = { userName: "test", password: "" };
      break;
    case "null-username":
      data = { userName: null, password: "test" };
      break;
    case "null-password":
      data = { userName: "test", password: null };
      break;
    default:
      throw new Error(`Unknown body type: ${body}`);
  }
  this.response = await api.post("/Account/v1/Authorized", {
    data,
  });
  this.responseBody = await this.response.json();
});

When("I send a delete request using valid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.delete(`/Account/v1/User/${this.userId}`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
});

When("I send a delete request using invalid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.delete(`/Account/v1/User/fake1234`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I send a get request using valid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.get(`/Account/v1/User/${this.userId}`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

Then('the response should contain user information', function () {
  expect(this.responseBody.userId).toBe(this.userId);
  expect(this.responseBody.username).toBe(this.username);
  expect(Array.isArray(this.responseBody.books)).toBe(true);
});

When("I send a get request using invalid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.get(`/Account/v1/User/fake1234`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});