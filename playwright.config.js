import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.API_BASE_URL || "https://demoqa.com",
  },
});