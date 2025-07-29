
# 🍽️ Food Tracker and Donator

A web application to **track food waste** and **donate surplus food** to orphanages and old-age homes.
The platform connects donors and recipients while sending **real-time email notifications** using **Nodemailer**.

---

## 📌 Features

### Food Tracker

* Track food items with expiry dates.
* Edit or remove items from the tracker.
* Visual indicators for soon-to-expire food.

### Donation Module

* **Donors:** Create donation posts with quantity and pickup details.
* **Recipients (Orphanages/Old-age homes):** View and request donations.
* **Email Notifications:** Nodemailer automatically sends email alerts on donation updates.

### Additional Features

* Simple and clean UI using **HTML, CSS, JavaScript**.
* **MongoDB** database for food and donation data storage.
* Role-based access for donors and recipients.

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Email Service:** Nodemailer

---

## 📂 Project Structure

```
Food-Tracker-and-Donator/
│
├── public/         # Static assets (CSS, JS, images)
├── views/          # HTML templates
├── routes/         # Express routes
├── models/         # MongoDB schemas
├── server.js       # App entry point
├── package.json
└── .env.example
```

---

## 🌐 Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/food-tracker
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
```


