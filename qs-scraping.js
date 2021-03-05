//==UserScript==
// @name         QS Ranking
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Criado para baixar a listas de Bolsitas de Produtividade do CNPq
// @author       Ewerton Silva Santos - ewerton_dc@hotmail.com.br - Universidade Federal de Minas Gerais
// @match        https://www.topuniversities.com/university-rankings/university-subject-rankings/2021/*
// @grant        none
// ==/UserScript== https://code.jquery.com/jquery-3.3.1.min.js

(function() {
    'use strict';

    //__________ Importando jquery __________//
    javascript:(function() {
        function l(u, i) {
            var d = document;
            if (!d.getElementById(i)) {
                var s = d.createElement('script');
                s.src = u;
                s.id = i;
                d.body.appendChild(s);
            }
        }
        l('//code.jquery.com/jquery-3.2.1.min.js', 'jquery')
    })();

    //__________ Funcao que realiza a criacao do csv e seu downaload __________//
    function downloadCSV(csvData, fileName) {

        let data, link;
        if (csvData == null) return;//Verifica se o dado recebido e valido

        if (!csvData.match(/^data:text\/csv/i)) {
            csvData = 'data:text/csv;charset=utf-8,' + csvData;//Cabecalho que define que o tipo do arquivo é csv e seu charset
        }
        data = encodeURI(csvData);//Criar caracteres de escape para criacao e uma URL

        link = document.createElement('a');         //Cria um elemento <a> no corpo da pagina
        link.setAttribute('href', data);            //Define seu atributo href
        link.setAttribute('download', fileName);    //
                                                    //    Permite que o arquivo seja baixado ao ser cliacado,
                                                    //    tambem define o nome do arqiov de saida

        link.click();                              //Simula o clique no elemento criado desencadeando o donwload do arquivo
    }

    //__________ Funcao que obtem dados do ranking __________//
    function getData(){

        // Numero de universidades
        let len = $('.university-rank-row').length;

        // Lista contendo dados
        let data = '';

        // Nome do arquivo de saida
        let fileName = '.csv';

        // Area do conhecimento
        let area = $('._qs-class-headline').eq(0).text().trim();

        // Percorrendo lista de univerisidades
        for (let i = 0; i < len; i++){
            let row = [
                area,
                $('._univ-rank').eq(i*25 + 36).text().trim(),
                $('.university-rank-row a').eq(i).text().trim(),
                $('.overall-score-span').eq(i).text().trim(),
            ];
            data = data + row.join(";")+"\n";
        }

        // Chamando funcao para donwload dos dados como csv
        downloadCSV(data, area+fileName);
    }

    //__________ Funcao que seleciona um filtros especificos __________//
    function selectFilter(){

        // Ativando campo de busca para paises
        setTimeout(function() {
            console.log("Click ...");
            $('.search').click();
        }, 10000);

        // Buscando valor para pais
        setTimeout(function() {
            console.log("Define value ...");
            $('.search').val("Braz");
        }, 12000);

        // Selecionando valor para pais
        setTimeout(function() {
            $('[data-value="brazil"]').click();
            console.log("Select value country...");
        }, 10000);

        // Ativnado campo para numero de paginas
        setTimeout(function() {
            $("#perpagedata").click();
            console.log("Click ...");
        }, 2000);

        // Selecionando numero de paginas
        setTimeout(function() {
            $('[data-value="100"]').click();
            console.log("Select value pagination ...");

            // Obtendo dados do ranking
            setTimeout(function() {
                getData();
            }, 2000);
        }, 10000);
    }

    // Funcao que filtra campos
    setTimeout(function() {
        selectFilter();
    }, 10000);
})();
