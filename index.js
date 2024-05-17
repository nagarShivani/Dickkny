require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;
  require('./src/config/db'); 
  const routes = require('./src/routes/routes'); 

const app = express();

// app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new GoogleStrategy({
//     clientID: '81360009037-lo33apjrvu0nnfpjkbpobjc67jq79i34.apps.googleusercontent.com',
//     clientSecret: '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',
//     // callbackURL: 'https://dickkny.onrender.com/auth/google/callback'
//     callbackURL: 'http://localhost:3000/auth/google/callback'
//   },
//   function(token, tokenSecret, profile, done) {
//     // You can save the user profile to your database here
//     return done(null, profile);
//   }
// ));

// // Configure Passport authenticated session persistence
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// // Define routes
// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Sign in with Google</a>');
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
// );

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/profile');
//   }
// );

// app.get('/profile', (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   console.log(req.user,'uswewewewe')
//   res.send(`Hello, ${req.user.displayName}`);
// });

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });


app.use(express.json());
app.use(cors());

app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your server is running on port ${port}`);
});
