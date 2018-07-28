#!/usr/bin/env python

from livereload import Server, shell

server = Server()
server.watch('*.js')
server.serve(port=8000)
