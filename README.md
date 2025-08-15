# The Daily Bulletin

The Daily Bulletin is a modern, full-stack newspaper platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It offers a seamless and interactive experience for reading, writing, and managing news articles, featuring role-based access for regular users, premium subscribers, and administrators.

## Links

### Official
- 🚀 [Live Demo](https://daily-bulletin-96f27.web.app)

## Features

- **Fully Responsive Design:** - Suitable for all devices, including mobile, tablet, and desktop.
- **User Authentication** -Easy registration and login with Email/Password and Google.
-  **Role-Based Interface** - Separate dashboards and features for regular users, premium users, and administrators.
-  **Article Management** -Users can easily add, update, and delete their new articles
-  *Dynamic Dashboard:** - Beautiful data visualization with various charts made using Rechart js 
-  **Fast Data Loading** - Utilizes TanStack Query for efficient data fetching and caching.## Features
-  **Payment System** - Secure subscription purchases through Stripe integration.


## Technology Stack

- **Framework/Library: React.js**

- **Routing: React Router**

- **Styling: Tailwind CSS & Miraki UI**

- **Data Fetching: TanStack Query & Axios**

- **Form Management: React Hook Form**

- **Authentication: Firebase Authentication**

- **Charts: Recharts**

- **Animations & Visuals: Framer Motion, Swiper.js, React CountUp**

- **Notifications: SweetAlert2, React-Toastify**
## Instructions to Run Locally: 

### Follow the steps below to run this project on your computer :

### 1. Clone the repository:
```bash 
git clone https://github.com/sanjidaRimi023/the-dailybulletin-client.git
```

###  2.Install necessary packages:

```bash
npm install
```
### 3.Create a .env.local file:
Create a file named .env.local in the root folder of the project and add your Firebase and other keys there.


```javascript
VITE_API_KEY=your_firebase_apikey
VITE_AUTH_DOMAIN=your_firebase_authdomain
VITE_PROJECT_ID=your_firebase_projectid
VITE_STORAGE_BUCKET=your_firebase_storagebucket
VITE_MESSAGING_SENDER_ID=your_firebase_messagingsenderid
VITE_APP_ID=your_firebase_appid
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

### 4. Start the project:

```bash
npm run dev
```

Now, you can visit http://localhost:5173 (the default port) in your browser to see the website.


## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [Sanjida Rimi](https://github.com/sanjidaRimi023)**






























