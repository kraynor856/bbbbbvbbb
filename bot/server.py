import socket

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# IP and Port for receving connection
client_address = ('localhost', 10000)

# print address and port
print ("[+] Client IP {} | Port {}".format(client_address[0], client_address[1]))

# bind socket with server
sock.bind(client_address)

# Create Loop
while True:
 # Wait for a connection
     print ('[+]  Waiting for a client connection')
     # connection established
     data, client_address = sock.recvfrom(4096)
 print data