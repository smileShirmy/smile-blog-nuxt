const Config = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.shirmy.me' : 'http://127.0.0.1:3000',
  staticPath: 'resource.shirmy.me'
}

export default Config
