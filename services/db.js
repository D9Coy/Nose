'use strict'

const { Pool } = require('pg')
const db = new Pool({ user: 'postgres', host: 'localhost', database: 'nose', password: 'admin12345', port: 5432 })

db.on('connect', () => console.log('Conectado a base de datos'))

module.exports = {
    db
}
