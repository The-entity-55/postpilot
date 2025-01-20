const { createClient } = require('@supabase/supabase-js');

const connectDB = async () => {
  try {
    console.log('[database] Attempting to connect to Supabase...');
    
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Test the connection
    const { data, error } = await supabase.from('users').select('count').single();
    
    if (error) {
      throw error;
    }

    console.log('[database] Successfully connected to Supabase');
    return supabase;

  } catch (error) {
    console.error('[database] Supabase connection error:', error);
    console.error('[database] Full error details:', error.stack);
    throw error;
  }
};

module.exports = { connectDB };