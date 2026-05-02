let keyApiMy = '2c41d817d0b59e6b4512e01e6e707ff3';

//está pegando o form e adiconando um escutador nele,
document.querySelector('.busca').addEventListener('submit', async (event) => {// listener gera um event, event é algo q aconteceu
    event.preventDefault(); // vai parar o efeito padrao que ele ia fazer, que era enviar o input, com essa funcao ele para o envio e evitando assim recarregar a página.

    let input = document.querySelector('input');
    let cidade = input.value;
    //pegando o valor digitado pelo usuario

    if (cidade !== '') {//fazemos uma verificao se o campo nao esta vazio
        msgAviso('carregando...');

        //let url com encodeURI
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cidade)}&appid=${keyApiMy}&units=metric&lang=pt_br`;
        //usamos a funcao encodeURI para modificar a pesquisar para um formato onde o navegador entenda os acentos e espaços, para adicionarmos mais dados usamos &, tipo(e) ai clocamos o dado a mais que queremos: units seria o tipo da medida metric(C) e lang pt_br;


        //fazer a requisição:
        let req = await fetch(url);
        let dados = await req.json();

        //verificacao caso ache ou nao ache a cidade
        if (dados.cod === 200) {
            mostrarClima({
                name: dados.name,
                pais: dados.sys.country,
                temp: dados.main.temp,
                tempMax: dados.main.temp_max,
                tempMin: dados.main.temp_min,
                tempDesc: dados.weather[0].description,
                tempIcon: dados.weather[0].icon,
                vento: dados.wind.speed,
            });
        } else {
            msgAviso('Cidade não encontrada!');
            document.querySelector('.resultado').style.display = "none";
        }

    }
})

//function para exibir msg no aviso
function msgAviso(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}



//fuction mostrar dados/clima
function mostrarClima(json) {

    input.value = '';
    //quando mostrar a cidade, sumir o carregando.
    msgAviso('');

    //fazer info aparecer qunado tiver o json
    document.querySelector('.resultado').style.display = "block";

    //titulo com nome da cidade e pais:
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.pais}`;

    //informando a temperatura
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    //mduando o icon da temperatura:
    document.querySelector('.bloco.principal .img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)


    //adicionando temp max e MIn

    document.querySelector('.tempMax').innerHTML = `${json.tempMax} <sup>ºC</sup>`;

    document.querySelector('.tempMin').innerHTML = `${json.tempMin}<sup>ºC</sup>`;

    //informando o vento
    document.querySelector('.bloco.vento .ventoInfo').innerHTML = `${json.vento} <span>km/h</span>`;
}

