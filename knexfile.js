module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: '', // add your user of the database
            password: '', // add your database password
            database: '', // add your database name
            port: '5432', 
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        }
    }
}
