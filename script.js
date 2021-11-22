let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //randeriza o desenho dentro do canvas
let box = 32; //32px cada quadradinho
let snake =[];
/*Definir o tamanho da cobrinha*/
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = { /*Math.floor tira o numero flutuante do retorno de Math.random que sempre retorna um número abaixo de 1*/
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 +1) * box
} 

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retangulo
}
/*A cobrinha será um array de coordenadas. Será adicionado um elemento e retirado o último para ela andar*/

function criarCobrinha() {
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green"; //cor da cobra
        context.fillRect(snake[i].x, snake[i].y, box, box); //desenha a cobra
    }
}

function desenharComida(){
    context.fillStyle = 'red'; //cor da comida
    context.fillRect(food.x, food.y, box, box);
}

/*parâmetros para a cobrinha não desaparecer da tela*/
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; //se o botão foir o 37 e a direção não for right, muda para right
    if(event.keyCode == 40 && direction != "down")direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 38 && direction != "up") direction = "down";
}

function iniciarJogo(){
   
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0; //se o valor da cabeça da cobrinha na posição x foi maior que 15 ela recomeça em 0 no eixo x
    if (snake[0].x < 0 && direction =="left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "up") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "down") snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++){
        /*se a posição da cabeça foi identica à posição do corpo, para.*/
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ 
            clearInterval(jogo);
            alert('Game Over! :(');

        }
    }

    criarBG();
    criarCobrinha();
    desenharComida();

    let snakeX = snake[0].x;//posição inicial 0 de x e 0 de y
    let snakeY = snake[0].y;

    /*condicionais para direcionar a cobrinha, para o lado direito vai add um quadrado no lado direito e se estiver indo para o lado esquerdo vai subtrair um quadradinho*/
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY += box;
    if (direction == "down") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();//retira o último elemento da array
    }
    else {
    food.x = Math.floor(Math.random() * 15 + 1) * box,
    food.y = Math.floor(Math.random() * 15 +1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //100mseg para iniciar o jogo e a cada 100milisegundo vai atualizar o jogo e reiniciar se travar