const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    res.json({
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    res.json({
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    console.log('Refresh token request received:', {
      hasRefreshToken: !!req.body.refreshToken,
      refreshTokenLength: req.body.refreshToken?.length
    });

    const { refreshToken } = req.body;

    if (!refreshToken) {
      console.log('Refresh token missing in request');
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    console.log('Attempting to refresh session with Supabase');
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken
    });

    if (error) {
      console.error('Supabase refresh error:', error);
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    console.log('Successfully refreshed session:', {
      hasAccessToken: !!data.session.access_token,
      hasRefreshToken: !!data.session.refresh_token
    });

    res.json({
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

module.exports = router;