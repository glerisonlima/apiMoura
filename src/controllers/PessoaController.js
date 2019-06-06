const sql = require('mssql')
const config = require('../database/config')

module.exports = {
    async list(req, res){
        try {
            let pool = await sql.connect(config)
            let result1 = await pool.request()
                //.input('input_parameter', sql.Int, value)
                //.query('select * from mytable where id = @input_parameter')
                .query('SELECT codigo, nome FROM pessoa')
                
            console.dir(result1)
            res.json(result1.recordset)
        
            // Stored procedure
            
            /*let result2 = await pool.request()
                .input('input_parameter', sql.Int, value)
                .output('output_parameter', sql.VarChar(50))
                .execute('procedure_name')
            
            console.dir(result2)*/
        } catch (err) {
            // ... error checks
            console.log('erro:', err)
        }
    }
}