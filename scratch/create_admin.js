const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qbfvqbxhmxjiymtzeekk.supabase.co'
const supabaseAnonKey = 'sb_publishable_p1BQdJrwRBJGN6PwqYVA2g_tTahagif'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'mainadmin01@fastitgroup.in',
    password: 'Aashish@07',
  })

  if (error) {
    console.error('Error creating admin:', error.message)
  } else {
    console.log('Admin account created successfully:', data.user.email)
    console.log('Please check your email for a confirmation link if email confirmation is enabled.')
  }
}

createAdmin()
