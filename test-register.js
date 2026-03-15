fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: 'password123' })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
