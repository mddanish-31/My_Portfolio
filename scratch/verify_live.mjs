async function inspectUiUx() {
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();

  let pos = 0;
  while ((pos = html.indexOf('UI / UX', pos)) !== -1) {
    console.log('Match at position', pos, ':');
    console.log(html.slice(Math.max(0, pos - 100), pos + 150));
    console.log('----------------------------------------------------');
    pos += 7;
  }
}

inspectUiUx();
