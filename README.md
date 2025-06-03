A minimal full-stack clone of the YTS movie website, using the YTS public API. This project showcases full-cycle development from data ingestion to deployment, including backend and frontend implementation, with filters and performance optimizations.\
**Phase 1**
**Tasks Completed:**
Backend and Frontend will run with **npm run dev**
Explored the YTS API and handled pagination.
Created a Node.js script to fetch all movies using async requests.
Used MongoDB to store the fetched movie data.

**Database Choice Justification:**
MongoDB was chosen because the YTS API returns deeply nested and flexible JSON objects.
No strict schema enforcement needed (ideal for NoSQL).
Easy scalability and high-speed reads with proper indexing (on fields like title, year, rating, etc.)
Support for geo-redundancy and cloud hosting (MongoDB Atlas used).

**Collection: movies**

Fields Stored:
title, year, rating, genres, language, summary, runtime, download_links, background_image, torrents, etc.

Uses Axios for concurrent requests.
Resumable: Skips already fetched pages using meta info.
Stores data with upsert logic (avoids duplicates).
Can be run multiple times safely.

**Phase 2**
 Features:
Built using Express.js with clean route structure.
RESTful endpoint: GET /movies

Supports:
Filters: genre, rating, year, language, quality
Pagination: limit, page
Sorting: sort_by (e.g., year, rating), order (asc/desc)
Search: title keyword match

**Extras:**
Error handling with status codes (400, 500)
CORS enabled for frontend access
Environment variable support using .env

**Phase 3**
Features:
Responsive and clean UI built using Tailwind CSS
Fetches movies from custom backend API
Supports all core filters:
Genre
Rating
Year
Quality

Components:
Filter Sidebar
Movie Grid View
Search Bar
Pagination Controls



## 🔗 Postman Collection

You can explore and test the API using the Postman collection below:
 [Click here to open the Postman Collection](https://www.postman.com/workspace/My-Workspace~65f856e9-608a-4f8b-80f2-39bb78153aeb/collection/39774840-888a5230-dcf2-4c3e-851f-185aad94faac?action=share&creator=39774840)

> To use:
> 1. Open the link.
> 2. Click **"Fork"** or **"Run in Postman"**.
> 3. Explore or test all available API endpoints.

