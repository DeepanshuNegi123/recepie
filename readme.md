# 🍳 Recipe App - Backend & MongoDB Documentation

This documentation specially focuses on the **MongoDB data structures**, **backend connections**, and how different items are linked using **IDs**.

---

## 🏗️ Backend Architecture Overview

The backend is built with **Node.js** and **Express.js**, using **Mongoose** as an ODM (Object Data Modeling) library for MongoDB.

### Connection Strategy
- **Database**: MongoDB Atlas (Cloud) or Local MongoDB.
- **Authentication**: JWT (JSON Web Tokens) are used to maintain sessions and identify users.
- **File Storage**: Cloudinary is used for hosting recipe images, with URLs stored in MongoDB.

---

## 📊 MongoDB Data Models & ID Relationships

The application relies on `ObjectId` references to connect different pieces of data.

### 1. User Model (`models/User.js`)
Stores user identity and personal collections.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier for the User. |
| `username` | `String` | Unique display name. |
| `email` | `String` | Unique email for login. |
| `password` | `String` | Hashed password. |
| `savedRecipes` | `[ObjectId]` | **Reference**: Stores an array of `Recipe._id` that the user has saved. |

---

### 2. Recipe Model (`models/Recipe.js`)
The central entity of the application.

| Field | Type | ID Relationship |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier for the Recipe. |
| `title` | `String` | Name of the dish. |
| `author` | `ObjectId` | **Reference**: Links to the `User._id` of the creator. |
| `ingredients` | `Array` | List of items (Name, Amount, Unit). |
| `steps` | `[String]` | Ordered cooking instructions. |
| `favorites` | `[ObjectId]` | **Reference**: Array of `User._id` who liked this recipe. |

> [!NOTE]
> When a recipe is fetched, the `author` ID is often "populated" to show the username instead of just a raw ID string.

---

### 3. Comment Model (`models/comment.js`)
Links real-time user feedback to specific recipes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier for the Comment. |
| `recipeId` | `ObjectId` | **Link**: Stores the `Recipe._id` this comment belongs to. |
| `userId` | `ObjectId` | **Link**: Stores the `User._id` of the commenter. |
| `text` | `String` | The actual comment content. |

> [!TIP]
> To get all comments for a recipe, the backend searches for all documents where `recipeId` matches the current recipe's `_id`.

---

### 4. Like Model (`models/like.js`)
A lightweight model to track "Like" interactions.

| Field | Type | Description |
| :--- | :--- | :--- |
| `recipeId` | `ObjectId` | **Link**: The `Recipe._id` that was liked. |
| `userId` | `ObjectId` | **Link**: The `User._id` who clicked like. |

---

## 🔗 How IDs Connect Everything

Understanding how the `_id` flows through the system is key to the backend logic:

### Flow: Getting Recipe Details
1. Frontend calls `GET /api/recipes/:id`.
2. The `:id` in the URL is the `Recipe._id`.
3. The backend uses `Recipe.findById(id)` to get the recipe.
4. It then uses `.populate('author', 'username')` to replace the `author` ID with the actual User document containing their name.

### Flow: Adding a Comment
1. Frontend sends a `POST` request with `{ "recipeId": "...", "comment": "..." }`.
2. The backend gets the `userId` from the **JWT Token** (decoded in middleware).
3. A new Comment document is created:
   - `recipeId` = value from frontend.
   - `userId` = ID from token.
4. This ensures every comment is accurately linked to both the correct recipe and the correct user.

### Flow: My Kitchen (Personal Recipes)
1. Backend calls `Recipe.find({ author: req.user.id })`.
2. This filters the entire database to show only recipes where the `author` field matches the logged-in user's `_id`.

---

## 📡 Backend Execution & Endpoints

### Key Scripts
- `npm run dev` (Frontend): Runs the React UI on `http://localhost:5173`.
- `node server.js` (Server): Runs the Express server on `http://localhost:5003`.

### Main API Base Routes
- `/api/auth`: User registration and login.
- `/api/recipes`: Recipe CRUD operations and favorites.
- `/api/other/comment`: Adding and managing comments.

---

## 💬 Real-time Connections (WebSockets)
- **Port**: `8080`
- **Function**: Handles immediate chat communication between users.
- **Data Persistence**: Currently, chat messages are handled in-memory (`Map` in `chatsocket.js`) for speed, but can be extended to MongoDB using the same `userId` logic from the REST API.
