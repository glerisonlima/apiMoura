const sql = require('mssql')
const config = 'Server=localhost;Database=sismoura;User Id=sa;Password=epilef;'

module.exports = {
    async list(req, res){
        sql.close()
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
    },

    async insert(req, res){
        sql.close()
        try{
            let pool = await sql.connect(config) 
            const codigo = await pool.request().query('select codigo from pessoa')
            const valor = codigo.rowsAffected[0] + 1
            console.log(valor)
                       
            const resultado = await pool.request()
            .input('codigo',valor)
            .input('nome','Teste Glerison')
            .query('INSERT INTO PESSOA (CODIGO,NOME) VALUES (@codigo,@nome)')
            console.log('Linhas afetadas', resultado.rowsAffected);
            res.send(resultado);

            const cliente = await pool.request()
            .input('pessoa', valor)
            .query('INSERT INTO CLIENTE (PESSOA) VALUES (@pessoa)')           
            
        }catch(err){
            console.log('erro:', err)
        }
    }
}