require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { createClient } = require('@supabase/supabase-js');
const basicRoutes = require("./routes/index");
const authRoutes = require("./routes/authRoutes");
const socialRoutes = require("./routes/socialRoutes");
const cors = require("cors");

console.log('[server] Starting server initialization...');
console.log('[server] Environment variables loaded:', {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  supabaseUrl: !!process.env.SUPABASE_URL,
  supabaseKey: !!process.env.SUPABASE_ANON_KEY
});

const app = express();
const port = process.env.PORT || 3000;

// Pretty-print JSON responses
app.enable('json spaces');
// We want to be consistent with URL paths, so we enable strict routing
app.enable('strict routing');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.JWT_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.path}`, {
    headers: req.headers,
    query: req.query,
    body: req.body
  });
  next();
});

console.log('[server] Attempting to connect to Supabase...');
supabase.auth.getSession()
  .then(() => {
    console.log('Supabase connection verified successfully');

    // Make supabase client available in requests
    app.use((req, res, next) => {
      req.supabase = supabase;
      next();
    });

    // Routes
    app.use('/', basicRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/social', socialRoutes);

    // Log registered routes
    console.log("[server] Registered routes:", app._router.stack
      .filter(r => r.route)
      .map(r => ({
        path: r.route.path,
        methods: Object.keys(r.route.methods)
      }))
    );

    // If no routes handled the request, it's a 404
    app.use((req, res, next) => {
      res.status(404).send("Page not found.");
    });

    // Error handling
    app.use((err, req, res, next) => {
      console.error(`Unhandled application error: ${err.message}`);
      console.error(err.stack);
      res.status(500).send("There was an error serving your request.");
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      console.log('Routes configured:', {
        basic: '/',
        auth: '/api/auth',
        social: '/api/social'
      });
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });