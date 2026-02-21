# Blackcoffer - Data Visualization Dashboard

A full-stack web application designed to present interactive data visualizations and analytics based on the provided JSON dataset. This project was developed as part of the Blackcoffer assignment.

<img width="1121" height="664" alt="Screenshot 2026-02-21 at 7 46 30 PM" src="https://github.com/user-attachments/assets/b55cd437-e1c4-49b9-9e8e-ff6f2eadfaa3" />

## 📊 Overview
The Visualization Dashboard reads JSON data stored in a **MongoDB** database and exposes it via a **Node.js/Express API**. The frontend is built using **Next.js** and utilizes **Recharts** to beautifully render responsive, interactive charts. 

Drawing inspiration from high-fidelity analytical dashboards, this application focuses on clear insights, dynamic real-time filtering, and professional UI/UX design.

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Visualizations:** Recharts
- **Icons:** Lucide React

### Backend & Database
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## 🔥 Key Insights & Visualized Variables
The dashboard focuses on the following core data variables from the dataset:
- **Intensity**
- **Likelihood**
- **Relevance**
- **Year**
- **Country**
- **Topics**
- **Region**
- **City**

## 🎛️ Dynamic Filters
Users can drill down into the data using a comprehensive suite of real-time filters:
- **End Year**
- **Topics**
- **Sector**
- **Region**
- **PESTLE**
- **Source**
- **SWOT** (Derived from Intensity, Relevance, and Likelihood)
- **Country**
- **City**

## 📈 Dashboard Features
- **Key Performance Indicators (KPIs):** Instant overview of total records, average intensity, likelihood, and relevance.
- **Trend Over Time:** Line chart displaying intensity and relevance averages by year.
- **Country Comparison:** Bar charts ranking countries by likelihood and relevance scores.
- **Sector Composition:** Pie chart breaking down the dataset by sector.
- **PESTLE x SWOT Matrix:** A unique matrix analyzing strategic signals.
- **City / Country Drill-down:** In-depth tabular modal to inspect granular city-level metrics.
- **Scatter & Radar Charts:** Point clouds and radar maps to evaluate impact relationships easily.

---

## ⚙️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/NishulDhakar/Visualization-Dashboard
cd visualization-dashboard
```

### 2. Database Setup
1. Ensure you have MongoDB running locally or a MongoDB Atlas cluster.
2. The initial `jsondata.json` data must be imported into a MongoDB collection. A seeding script is typically provided in the `server` directory to bulk insert the data.

### 3. Backend Setup (Node.js/Express)
```bash
cd server
npm install

# Create a .env file and configure your MongoDB URI and port
# Example:
# MONGO_URI=mongodb://localhost:27017/blackcoffer
# PORT=5001

npm run dev
```

### 4. Frontend Setup (Next.js)
```bash
cd frontend
npm install

# Create a .env.local file to point to your backend API
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:5001

npm run dev
```
Navigate to `http://localhost:3000` to view the dashboard.

---

## 📝 Assignment Requirements Checklist
- [x] Use the given JSON data.
- [x] Create a MongoDB database from the JSON data.
- [x] Backend: Node.js (Express).
- [x] Frontend: Next.js / React.js.
- [x] Charts: Used Recharts (a highly effective data visualization library for React).
- [x] Read data from MongoDB via a generated API.
- [x] Visualized all important variables.
- [x] Implemented all requested filters + combinations.

## 📄 License
This project is open-source and created as an assignment demonstration.
