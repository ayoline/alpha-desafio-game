module.exports = {
    apps: [
        {
            script: 'app.js',
            cwd: 'backend/',
            name: 'app'
        },
        {
            script: 'server.js',
            cwd: 'frontend/',
            name: 'server'
        }
    ]
}