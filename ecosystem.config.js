module.exports = {
  apps : [{
    name: 'api',
    script: './src/server.ts',
    watch: '.',
    max_memory_restart: '450M',
    instances: 2,
  }]
};