module.exports = {
    apps: [
        {
            script: 'app.js',
            cwd: 'backend/',
            name: 'app',
            watch: true
        },
        {
            script: 'server.js',
            cwd: 'frontend/',
            name: 'server',
            watch: true
        }
    ]
}