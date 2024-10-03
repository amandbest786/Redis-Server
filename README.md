# Redis-Server (In-Memory Database Prototype)

A prototype implementation of a Redis-inspired in-memory database using the RESP protocol. This project supports basic Redis commands such as `SET`, `GET`, `DEL`, and also allows setting TTL (Time-To-Live) on keys for automatic expiration.

## Features

- **In-memory storage:** Fast access and retrieval of key-value pairs.
- **RESP Protocol:** Communication using the Redis Serialization Protocol.
- **TTL Support:** Allows setting keys with an expiration time.
- **Core Commands:** Supports basic commands like `SET`, `GET`, `DEL`, and others.

## How It Works

The project uses `net` for creating a TCP server and `redis-parser` for parsing RESP requests. Key-value pairs are stored in an in-memory JavaScript object, and expiration times are managed using Node.js's `setTimeout` for TTL.

### Supported Commands
- `SET key value`: Stores a value with the given key.
- `GET key`: Retrieves the value associated with the key.
- `DEL key`: Deletes the key-value pair.
- `SET key value EX seconds`: Stores a value with the key and sets it to expire after the given number of seconds.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amandbest786/Redis-Server.git


`cd Redis-Server`
`npm install`
`node server.js`
`nc localhost`
