module.exports = {
  apps : [{
    name: 'api',
    script: 'node_modules/.bin/ts-node',
    args: './src/server.ts',
    watch: '.',
    max_memory_restart: '450M',
    instances: 3,
  }]
};