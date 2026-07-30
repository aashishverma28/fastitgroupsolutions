const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://qbfvqbxhmxjiymtzeekk.supabase.co'
const supabaseAnonKey = 'sb_publishable_p1BQdJrwRBJGN6PwqYVA2g_tTahagif'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLogin() {
  const usernameInput = "Mainadmin01"
  const passwordInput = "Aashish@07"

  // Simulating the internal mapping in the app
  let loginEmail = usernameInput
  if (usernameInput.toLowerCase() === "mainadmin01") {
    loginEmail = "mainadmin01@fastitgroup.in"
  }

  console.log(`Testing login for username: ${usernameInput} (mapped to: ${loginEmail})...`)
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: loginEmail,
    password: passwordInput,
  })

  if (error) {
    console.error('Login failed:', error.message)
  } else {
    console.log('Login successful! User ID:', data.user.id)
  }
}

testLogin()
