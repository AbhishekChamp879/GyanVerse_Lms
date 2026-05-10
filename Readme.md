# EDEMY_LMS

Full-stack learning management system (LMS) with a React (Vite) client and a Node.js/Express server.

## Highlights
- Student and educator experiences with role-based access
- Course browsing, details, and video playback
- Educator dashboards and course management
- Authentication via Clerk and protected routes
- Media uploads using Multer + Cloudinary
- Payments with Stripe (webhook-driven enrollment)

## Tech Stack
- Client: React, Vite, Tailwind CSS
- Server: Node.js, Express, MongoDB, Mongoose
- Auth: Clerk
- Payments: Stripe
- Uploads: Multer, Cloudinary

## Project Structure
```
Lms_v2/
  client/   # React app (Vite)
  server/   # Express API
```

## Getting Started

### 1) Prerequisites
- Node.js 18+ recommended
- MongoDB connection string
- Clerk application (publishable key + webhook secret)
- Cloudinary account
- Stripe account (secret key + webhook secret)

### 2) Install dependencies
```bash
cd client
npm install

cd ../server
npm install
```

### 3) Environment variables

#### Server (`server/.env`)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string

# Clerk
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Notes:
- The server appends `/lms` to `MONGODB_URI` when connecting.
- Clerk webhooks are handled at `/clerk`.
- Stripe webhooks are handled at `/stripe` and require the raw request body.

#### Client (`client/.env`)
```
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=USD
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4) Run the apps
```bash
# terminal 1
cd server
npm run server

# terminal 2
cd client
npm run dev
```

Client runs at `http://localhost:5173` by default. Server runs at `http://localhost:5000`.

## API Overview

Base path: `http://localhost:5000`

### Health
- `GET /` - API status

### Courses
- `GET /api/course/all`
- `GET /api/course/:id`

### Educator (protected)
- `GET /api/educator/update-role`
- `POST /api/educator/add-course` (multipart: `image`)
- `GET /api/educator/courses`
- `GET /api/educator/dashboard`
- `GET /api/educator/enrolled-students`

### User
- `GET /api/user/data`
- `GET /api/user/enrolled-courses`
- `POST /api/user/purchase`
- `POST /api/user/update-course-progress`
- `POST /api/user/get-course-progress`
- `POST /api/user/add-rating`

### Webhooks
- `POST /clerk` - Clerk user lifecycle events
- `POST /stripe` - Stripe payment events

## Scripts

### Client
- `npm run dev` - start Vite dev server
- `npm run build` - build for production
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

### Server
- `npm run server` - start server with nodemon
- `npm start` - start server

## Development Notes
- For protected educator routes, the Clerk user must have `publicMetadata.role = "educator"`.
- The client uses `VITE_BACKEND_URL` to call the API.
- Stripe webhooks must be configured to hit `/stripe` with the signing secret.
- Cloudinary is initialized at startup using the environment variables above.

## Troubleshooting
- If Clerk auth fails, verify publishable key in the client and webhook secret in the server.
- If uploads fail, re-check Cloudinary env variables.
- If MongoDB connection fails, confirm `MONGODB_URI` and network access.

## Security
- Keep `.env` files out of source control.
- Rotate keys if any secret leaks.


