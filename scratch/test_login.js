const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qbfvqbxhmxjiymtzeekk.supabase.co'
const supabaseAnonKey = 'sb_publishable_p1BQdJrwRBJGN6PwqYVA2g_tTahagif'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLogin() {
  console.log('Attempting login for mainadmin@fastit.in...')
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'mainadmin@fastit.in',
    password: 'Aashish@07',
  })

  if (error) {
    console.error('Login failed:', error.message)
  } else {
    console.log('Login successful! User ID:', data.user.id)
  }
}

testLogin()
