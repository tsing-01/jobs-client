export const config = {
  development: {
    BASE_URL: 'http://localhost:4000',
    SOCKET_URL: 'ws://localhost:4000'
  },
  production: {
    // online server address
    BASE_URL: 'https://jobs-server-jobs-server-online.up.railway.app',
    SOCKET_URL: 'ws://jobs-server-jobs-server-online.up.railway.app'
  }
}