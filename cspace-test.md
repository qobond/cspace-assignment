# Cognitive Space Full Stack Dev Test

## Intro

Write code solutions for the questions below. You can use either Javascript or Python, however, do at least one question in Python and at least one in Javscript.

Once you complete the problems, send your code back for us to review, and we'll schedule a technical interview with you. Be prepared to walk us through your code and answer questions about your code during the interview. Your code doesn't need to be perfect or fully optimized but it should solve the problem. If you made a design decision be ready to discuss it.

Lastly, make sure the code for each problem can run and if there are any special directions for running it, document them in your code.

This test is "open book", so feel free to "Google" and learn as you solve the problems. Just don't copy anybody's code exactly and present it as your own. If you base some code on a particular reference, be sure to note it in some comments and most importantly make sure you know how to explain and walk through that code.


## Problem 1: Binary Search

Problem: Efficient searching

Not using an existing library (this includes standard library functions), write a binary search algorithm.

The program should take an unordered list of integers to search through. Then it should ask for an integer to search for. It should then state if the Integer was found and the original position in the unordeded list it was found at.


## Problem 2: Async Kittens

Problem: We need to fetch lots of kitten images fast for our Machine Learning algorithm.

Download 128 images of various sizes from https://placekitten.com/. However, when you fetch the images, do so asynchronously so that you can send off all the requests and then wait for the results to come back.

Then generate a static HTML page or dynamic page in the browser that shows off all your newly fetched images.


## Problem 3: Dev Ops

Problem: Automating deployments.

Using a cloud provider API such as:

- Digital Ocean: https://developers.digitalocean.com/documentation/v2/
- AWS EC2: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/Welcome.html
- Vultr: https://www.vultr.com/api/

or using an existing library that integrates one of the APIs:

- Digital Ocean: https://developers.digitalocean.com/libraries/
- Boto 3: https://boto3.amazonaws.com/v1/documentation/api/latest/index.html

Or using a higher level framekwork like Ansible or SaltStack. However, this will require more time to learn if you haven't used them before.

Write a script to do the the following in an automated fashion:

- Create an Ubuntu 18.04 server.
- Perform an `apt update` and `apt upgrade`.
- Copy the `server.py` code to the server.
- Start `server.py` code running: `python3 server.py`.

You will be asked to run your script during your interview, wait for the setup, and then show resulting web page in your browser like: `http://your-server:8000`

Note: you may have to spend a few cents to bring up the server. But then promptly delete the server once your done.


### server.py

```python
import http.server
import socketserver
from http import HTTPStatus


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.send_response(HTTPStatus.OK)
        self.end_headers()
        self.wfile.write(b'Hello world')


httpd = socketserver.TCPServer(('', 8000), Handler)
httpd.serve_forever()
```
