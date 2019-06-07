const sql = require('mssql')
const config = 'Server=localhost;Database=sismoura;User Id=sa;Password=epilef;'

module.exports = {

    async insert(req, res){
        sql.close()
        try {
            let pool = await sql.connect(config)

            const codigo = await pool.request().query('select codigo from ANIMAIS_CADASTRO order by codigo desc')
            const valor = parseInt(codigo.recordset[0].codigo) + 1

            const resultado = await pool.request()
            .input('codigo',valor)
            .input('nome',req.body.nome)
            .input('cod_proprietario',req.body.cod_prop)
            .input('cod_especie',req.body.especie)
            .input('cod_raca',req.body.raca)
            .input('sexo',req.body.sexo)
            .input('pelagem',req.body.pelagem)
            .input('peso',req.body.peso)
            //.input('data_cadastro',pool.Date, Date.now)
            .query('INSERT INTO ANIMAIS_CADASTRO (CODIGO,NOME_ANIMAL,COD_PROPRIETARIO,COD_ESPECIE,COD_RACA,SEXO,PELAGEM,PESO)'+
             'VALUES (@codigo,@nome,@cod_proprietario,@cod_especie,@cod_raca,@sexo,@pelagem,@peso)')
            res.send(resultado);
        } catch (err) {
            // ... error checks
            console.log('erro:', err) 
        }
    }


}