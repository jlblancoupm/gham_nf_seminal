from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path

DOCS = Path(__file__).resolve().parent / "docs"
handler = partial(SimpleHTTPRequestHandler, directory=str(DOCS))
server = ThreadingHTTPServer(("127.0.0.1", 8000), handler)

print("GOTHAM-NF local site:")
print("  http://127.0.0.1:8000/")
print("Press Ctrl+C to stop.")
server.serve_forever()
