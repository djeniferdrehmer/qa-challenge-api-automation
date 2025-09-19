const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require('@playwright/test');

Given("I log in a valid user", async function () {
  await this.loginBookstoreUser();
  expect(typeof this.token).toBe("string");
  expect(typeof this.userId).toBe("string");
});

When("I fetch the list of existing books", async function () {
  const api = await this.newApiContext();
  this.response = await api.get("/BookStore/v1/Books");
  this.responseBody = await this.response.json();
});

Then("the response contains a valid book catalog with unique ISBNs", async function () {
  expect(Array.isArray(this.responseBody.books)).toBe(true);
  const isbns = this.responseBody.books.map(b => b.isbn);
  const unique = new Set(isbns);
  expect(unique.size).toBe(isbns.length);
});

When("I fetch a book by ISBN {string}", async function (isbn) {
  const api = await this.newApiContext();
  this.response = await api.get(`/BookStore/v1/Book?ISBN=${isbn}`);
  this.responseBody = await this.response.json();
});

Then("the response contains a valid book for ISBN {string}", async function (isbn) {
  expect(this.responseBody.isbn).toBe(isbn);
});

Then("the response should contain the ISBN {string}", async function (isbn) {
  expect(JSON.stringify(this.responseBody)).toContain(isbn);
});

When("I add ISBN {string} to the user", async function (isbn) {
  const api = await this.newApiContext();
  this.response = await api.post("/BookStore/v1/Books", {
    data: { userId: this.userId, collectionOfIsbns: [{ isbn }] },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I add an empty list of ISBNs", async function () {
  const api = await this.newApiContext();
  this.response = await api.post("/BookStore/v1/Books", {
    data: { userId: this.userId, collectionOfIsbns: [] },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I add ISBN {string} to userId {string}", async function (isbn, userId) {
  const id = userId === "empty-userId" ? "" : "0000-nonexistent";
  const api = await this.newApiContext();
  this.response = await api.post("/BookStore/v1/Books", {
    data: { userId: id, collectionOfIsbns: [{ isbn }] },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I send a delete all books request using valid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.delete(`/BookStore/v1/Books?UserId=${this.userId}`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
});

When("I send a delete all books request using invalid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.delete("/BookStore/v1/Books?UserId=0000-invalid", {
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I send a delete request to delete ISBN {string}", async function (isbn) {
  const api = await this.newApiContext();
  this.response = await api.delete("/BookStore/v1/Book", {
    data: { userId: this.userId, isbn },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  if (this.response.status() !== 204) {
    this.responseBody = await this.response.json();
  }
});

When("I send a delete specific book request using invalid userId", async function () {
  const api = await this.newApiContext();
  this.response = await api.delete("/BookStore/v1/Book", {
    data: { userId: "0000-invalid", isbn: "9781449331818" },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I replace ISBN {string} with new ISBN {string}", async function (oldIsbn, newIsbn) {
  const api = await this.newApiContext();
  this.response = await api.put(`/BookStore/v1/Books/${oldIsbn}`, {
    data: { userId: this.userId, isbn: newIsbn },
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});

When("I replace ISBN {string} with {string}", async function (oldIsbn, bodyType) {
  const api = await this.newApiContext();
  const validNewIsbn = "9781491904244";
  let data;
  switch (bodyType) {
    case "empty-userId":
      data = { userId: "", isbn: validNewIsbn };
      break;
    case "empty-isbn":
      data = { userId: this.userId, isbn: "" };
      break;
    default:
      throw new Error(`Unknown body type: ${bodyType}`);
  }
  this.response = await api.put(`/BookStore/v1/Books/${oldIsbn}`, {
    data,
    headers: { Authorization: `Bearer ${this.token}` },
  });
  this.responseBody = await this.response.json();
});