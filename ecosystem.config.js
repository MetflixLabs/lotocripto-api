module.exports = {
  apps: [
    {
      name: 'api',
      script: 'node_modules/.bin/ts-node',
      args: './src/server.ts',
      watch: '.',
      max_memory_restart: '450M',
      instances: 2,
      cron_restart: '0 8 * * *'
    }
  ]
}
