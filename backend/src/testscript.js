import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const API = "http://localhost:5000/api";

// Cookie jar to persist httpOnly cookies
const jar = new CookieJar();
const client = wrapper(
  axios.create({
    baseURL: API,
    jar,
    withCredentials: true,
  })
);

async function seedAdmin() {
  console.log("🔹 Seeding admin...");

  try {
    const res = await client.post("/auth/seed-admin", {
      username: "DRAKE",
      email: "drake@admin.com",
      password: "WINNING26",
    });

    console.log("✅ Admin seeded:", res.data.message);
  } catch (err) {
    console.log("⚠️ Admin may already exist");
  }
}

async function loginAdmin() {
  console.log("🔹 Logging in admin...");

  const res = await client.post("/auth/login", {
    email: "drake@admin.com",
    password: "WINNING26",
  });

  console.log("✅ Admin logged in");
}

async function testCloudinaryAndCreateHome() {
  console.log("🔹 Uploading image & creating demo home...");

  const form = new FormData();

  form.append("title", "Luxury 4 Bedroom Duplex");
  form.append("price", 120000000);
  form.append("location", "Lekki Phase 1, Lagos");
  form.append("bedrooms", 4);
  form.append("amenities[]", "Swimming Pool");
  form.append("amenities[]", "Security");
  form.append(
    "images",
    fs.createReadStream(path.join(process.cwd(), "scripts/demo-house.jpg"))
  );

  const res = await client.post("/homes", form, {
    headers: form.getHeaders(),
  });

  console.log("✅ Home created");
  console.log("🏠 Home ID:", res.data._id);
}

async function submitCustomerOrder() {
  console.log("🔹 Submitting customer order form...");

  const res = await axios.post(`${API}/orders`, {
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+2348012345678",
    message: "I am interested in this property. Please contact me.",
    propertyTitle: "Luxury 4 Bedroom Duplex",
  });

  console.log("✅ Customer order submitted");
}

async function run() {
  console.log("🚀 STARTING FULL API TEST\n");

  await seedAdmin();
  await loginAdmin();
  await testCloudinaryAndCreateHome();
  await submitCustomerOrder();

  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY");
}

run().catch((err) => {
  console.error("❌ TEST FAILED");
  console.error(err);
});
