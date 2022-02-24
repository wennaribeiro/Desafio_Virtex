const fs = require('fs')
const ONU = require('../models/ONU');
const path = require('path');

module.exports = {
    async index(request, response) {
        const onus = await ONU.find();
        return response.json(onus);
    },
    async store(request, response) {
        const dados_huawei_txt = path.resolve(__dirname, '..', 'Inputs', 'Huawei.txt');
        const dadosFormatados = [];

        fs.readFile(dados_huawei_txt, 'utf8', async (err, data) => {
            if (err) {
                console.log(err)
                return response.json({ error: err });
            }

            var linhas = data.split('\n');  // Transforma o texto em um vetor de strings separados por quebra-linhas ('\n');
            console.log(linhas);
            var apenas_linhas_importantes = linhas.slice(8, linhas.length); // Corta as linhas e retorna o recorte (retirado as 8 primeiras linhas)

            apenas_linhas_importantes.forEach(function (linha) {
                var linha_sem_barras = linha.replace(/\/+/g, ' '); // regex para eliminar as barras -> "/ e \"
                linha_sem_barras = linha_sem_barras.replace(/\s+/g, ','); // regex para apagar todo tipo de espaço 
                var regexWhiteSpace = /\s/g;
                var [vazio, s, p, ont_id, sn, control_flag, run_state] = linha_sem_barras.replace(regexWhiteSpace, '').split(',');
                dadosFormatados.push({
                    slot: s,
                    port: p,
                    sn: sn,
                    ont_id: ont_id,
                    state: run_state
                })
            })


            console.log(dadosFormatados)
            const onu = await ONU.create(dadosFormatados);
            return response.json(onu);
        })
    }
}