

# Comment System - README

## Overview
A simple comment system for recipes that allows authenticated users to add, edit, and delete comments.

## How It Works

### Backend

**Model (`Comment.js`)**
- Stores comments with `recipeId`, `userId`, and `text`
- Automatically adds timestamps for creation and updates

**Routes (`otherroutes.js`)**
- `POST /api/comment/add` - Add a new comment
- `POST /api/comment/delete` - Delete your comment
- `POST /api/comment/editcomment` - Edit your comment

**Controller (`commentcontrol.js`)**
- Validates JWT token from Authorization header
- Ensures users can only edit/delete their own comments
- Saves comments to MongoDB

### Frontend

**RecipePage Component**
- Displays a comment form on recipe details page
- On submit:
    1. Gets comment text from form
    2. Retrieves auth token from localStorage
    3. Sends `recipeId`, `text`, and `token` to backend
    4. Clears form on success

**Comment Service (`commentservices.js`)**
- Handles API calls to backend
- Sends JSON payload with proper authorization headers
- Returns response data or null on failure

## Data Flow

```
User Types Comment → Form Submit → Get Token → commentservice() 
→ POST /api/comment/add → Verify JWT → Save to MongoDB → Return Success
```

## Authentication
- Uses JWT tokens stored in localStorage
- Token passed in `Authorization: Bearer <token>` header
- Backend extracts userId from decoded token

## API Request Format

```json
{
  "recipeId": "672fa321ce43c5b0f1234567",
  "text": "This recipe is amazing!"
}
```

## Setup
1. Ensure MongoDB is running
2. Set `JWT_SECRET` in `.env`
3. Backend runs on `http://localhost:5003`
4. Frontend runs on `http://localhost:5173`

## Notes
- Users must be logged in to comment
- Comments are tied to both recipe and user
- Only comment owners can edit/delete their comments




# Readme.md 

1. flow of profile.jsx
  