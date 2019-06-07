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
            const codigo = await pool.request().query('select codigo from pessoa order by codigo desc')
            const valor = parseInt(codigo.recordset[0].codigo) + 1
                       
            const resultado = await pool.request()
            .input('codigo', valor)
            .input('nome',req.body.nome)
            .input('cep',req.body.cep)
            .input('endereco',req.body.endereco )
            .input('numero',req.body.numero)
            .input('bairro',req.body.bairro)
            .input('cidade',req.body.cidade)
            .input('email',req.body.email)
            .input('ddd',req.body.ddd)
            .input('telefone',req.body.telefone)
            .query('INSERT INTO PESSOA (CODIGO,NOME,CEP,ENDERECO_NOME,NUMERO,BAIRRO,CIDADE,EMAIL,DDD1,FONE_NUMERO)'+
             'VALUES (@codigo,@nome,@cep,@endereco,@numero,@bairro,@cidade,@email,@ddd,@telefone)')
            res.send(resultado);
            
            const cliente = await pool.request()
            .input('pessoa', valor)
            .query('INSERT INTO CLIENTE (PESSOA) VALUES (@pessoa)')         
            
        }catch(err){
            console.log('erro:', err)
        }
    }
}