from http.server import SimpleHTTPRequestHandler, HTTPServer
import json

class RequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        answer = json.loads(post_data)
        with open('/tmp/answer.json', 'w') as f:
            json.dump(answer, f)
        self.send_response(200)
        self.end_headers()

httpd = HTTPServer(('0.0.0.0', 8000), RequestHandler)
httpd.serve_forever()
