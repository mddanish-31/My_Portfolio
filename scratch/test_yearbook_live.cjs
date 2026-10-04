const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    const hasAcademic = data.includes('id="academic"');
    const hasCumulativeCGPA = data.includes('CUMULATIVE CGPA');
    const hasSgpa = data.includes('SEMESTER SGPA');
    console.log('Has academic section:', hasAcademic);
    console.log('Has CUMULATIVE CGPA:', hasCumulativeCGPA);
    console.log('Has SEMESTER SGPA:', hasSgpa);
    if (hasAcademic && hasCumulativeCGPA && hasSgpa) {
      console.log('✅ Academic Yearbook rendered successfully on live server!');
    } else {
      console.error('❌ Render check failed');
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('HTTP Error:', err.message);
  process.exit(1);
});
