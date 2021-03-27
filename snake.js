document.body.onload = initPlateau();
function initPlateau()
{
    document.getElementById("points").innerHTML = "&#127822 0";
    if (typeof higherScore === 'undefined')
    {
        higherScore = 0;
    }
    dead = false;
    direction = "droite";
    let table = document.createElement("table");
    table.id = "plateau";
    let tbody = document.createElement("tbody");
    tbody.id = "tbodyPlateau";
    table.appendChild(tbody);
    for (let y = 1; y < 17; y++)
    {
        let tr = document.createElement("tr");
        tr.id = "tr" + y;
        for (let x = 1; x < 17; x++)
        {
            let td = document.createElement("td");
            td.id = x + "td" + y;
            let classe = "grass" + (x + y -1) % 2;
            td.classList += classe;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    document.getElementById("container").innerHTML = "";
    document.getElementById("container").appendChild(table);

    initSnake();
    initPomme();
    joue();
}



function initSnake()
{
    snake = new Array();
    for (let x = 5; x >= 2; x--)
    {
        document.getElementById(x + "td8").classList = "snake";
        snake.push([x, 8]);
    }
}

function initPomme()
{
    pomme = [13, 8];
    document.getElementById("13td8").classList = "pomme";
}

function joue()
{
    aJoue = false
    playAlon = setInterval(playAlone, 300);
    if(!dead){document.onkeydown = checkKey;}
    else{return;}
}

function checkKey(e)
{
    if(!dead)
    {e = e || window.event; console.log(dead)}
    else{return;}

    if(e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40')
    {
        aJoue = true;
        e.preventDefault();
    }

    if (e.keyCode == '38' && !dead && direction != "bas" && direction != "haut")
    {
        avanceHaut();
    }
    else if (e.keyCode == '40' && !dead && direction != "haut" && direction != "bas")
    {
        avanceBas();
    }
    else if (e.keyCode == '37' && !dead && direction != "droite" && direction != "gauche")
    {
        avanceGauche();
    }
    else if (e.keyCode == '39' && !dead && direction != "gauche" && direction !== "droite")
    {
        avanceDroite();
    }
    if(e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40')
    {
        let r = parseInt("3f", 16);
        let g = parseInt("6b", 16);
        let b = parseInt("b6", 16);
        for (let i = 0; i < snake.length; i++)
        {
            r -= 3;
            g -= 3;
            b -= 3;
        }
    }
    else if (dead)
    {
        clearInterval(playAlon);
        document.getElementById("points").innerHTML = "";
        if (snake.length - 4 > higherScore)
        {
            higherScore = snake.length - 4;
        }
        affichePoints();
        return;
    }
}

function Pomme()
{
    let x = Math.floor(Math.random() * 16)+1;
    let y = Math.floor(Math.random() * 16)+1;
    for (let i = 0; i< snake.length; i++)
    {
        if(snake[i][0] == x && snake[i][1] == y)
        {
            Pomme();
            return;
        }
    }
    pomme = [x, y];
    document.getElementById("points").innerHTML = "&#127822 " + (snake.length - 4).toString();
    document.getElementById(x + "td" + y).classList = "pomme";
}

function verifSnake()
{
    for (let i = 0; i < snake.length; i++)
    {
        for (let j = 0; j<snake.length; j++)
        {
            if (snake[i][0] === snake[j][0] && snake[i][1] === snake[j][1] && i !== j)
            {
                return true;
            }
        }
    }
}
function verifCotes()
{
    let head = snake[0]
    if((head[0] <= 1 && direction === "gauche") || (head[0] >= 16 && direction === "droite") || (head[1] <= 1 && direction === "haut") || (head[1] >= 16 && direction === "bas"))
    {
        return true;
    }
    return false;
}

function avanceDroite()
{
    direction = "droite";
    dead = verifCotes();
    isPomme = snake[0][0] === pomme[0] && snake[0][1] === pomme[1];
    snake.unshift([snake[0][0] + 1, snake[0][1]]);
    let classe = "grass" + (snake[snake.length - 1][0] + snake[snake.length - 1][1] - 1) % 2;
    document.getElementById(snake[snake.length - 1][0] + "td" + snake[snake.length - 1][1]).classList = classe;
    document.getElementById(snake[0][0] + "td" + snake[0][1]).classList = "snake";
    if(!isPomme)
    {
        snake.pop();
    }
    else
    {
        Pomme();
    }
    dead = verifSnake();
    clearInterval(playAlon);
    playAlon = setInterval(playAlone, 300);
}

function avanceHaut()
{
    direction = "haut";
    dead = verifCotes();
    isPomme = snake[0][0] === pomme[0] &&  snake[0][1] === pomme[1];
    snake.unshift([snake[0][0], snake[0][1]-1]);
    let classe = "grass" + (snake[snake.length - 1][0] + snake[snake.length - 1][1]-1)%2;
    document.getElementById(snake[snake.length - 1][0] + "td" + snake[snake.length - 1][1]).classList = classe;
    document.getElementById(snake[0][0] + "td" + snake[0][1]).classList = "snake";
    if(!isPomme)
    {
        snake.pop();
    }
    else
    {
        Pomme();
    }
    dead = verifSnake();
    clearInterval(playAlon);
    playAlon = setInterval(playAlone, 300);
}

function avanceBas()
{
    direction = "bas";
    dead = verifCotes();
    isPomme = snake[0][0] === pomme[0] && snake[0][1] === pomme[1];
    snake.unshift([snake[0][0], snake[0][1]+1])
    let classe = "grass" + (snake[snake.length - 1][0] + snake[snake.length - 1][1]-1)%2;
    document.getElementById(snake[snake.length - 1][0] + "td" + snake[snake.length - 1][1]).classList = classe;
    document.getElementById(snake[0][0] + "td" + snake[0][1]).classList = "snake";
    if(!isPomme)
    {
        snake.pop();
    }
    else
    {
        Pomme();
    }
    clearInterval(playAlon);
    playAlon = setInterval(playAlone, 300);
    dead = verifSnake();
}

function avanceGauche()
{
    direction = "gauche";
    dead = verifCotes();
    isPomme = snake[0][0] === pomme[0] && snake[0][1] === pomme[1];
    snake.unshift([snake[0][0] - 1, snake[0][1]])
    let classe = "grass" + (snake[snake.length - 1][0] + snake[snake.length - 1][1] - 1) % 2;
    document.getElementById(snake[snake.length - 1][0] + "td" + snake[snake.length - 1][1]).classList = classe;
    document.getElementById(snake[0][0] + "td" + snake[0][1]).classList = "snake";
    if(!isPomme)
    {
        snake.pop();
    }
    else
    {
        Pomme();
    }
    dead = verifSnake();
    clearInterval(playAlon);
    playAlon = setInterval(playAlone, 300);
}

function playAlone()
{
    if(verifCotes() || verifSnake())
    {
        clearInterval(playAlon);
        document.getElementById("points").innerHTML = "";
        if (snake.length - 4 > higherScore)
        {
            higherScore = snake.length - 4;
        }
        affichePoints();
        return;
    }
    switch (direction)
    {
        case "droite":
            if(aJoue)
            {
                avanceDroite();
            }
            break;
        case "gauche":
            if(aJoue)
            {
                avanceGauche();
            }
            break;
        case "bas":
            if(aJoue)
            {
                avanceBas();
            }
            break;
        case "haut":
            if(aJoue)
            {
                avanceHaut();
            }
            break;
    }
    if (dead || verifSnake())
    {
        clearInterval(playAlon);
        document.getElementById("points").innerHTML = "";
        if (snake.length - 4 > higherScore)
        {
            higherScore = snake.length - 4;
        }
        affichePoints();
        return;
    }
}

function affichePoints()
{
    dead = true;

    let bigTable = document.createElement("table");
    let bigThead = document.createElement("thead");
    let bigTbody = document.createElement("tbody");
    let bigHeadTr = document.createElement("tr");
    let plateauTd = document.createElement("td");
    plateauTd.colSpan = "2";
    bigHeadTr.appendChild(plateauTd);
    bigThead.appendChild(bigHeadTr);
    bigTable.id = "tableResultat";
    bigThead.id = "plateauMort";
    bigTbody.id = "scores";
    bigTable.appendChild(bigThead);
    let scoreTr = document.createElement("tr");
    bigTbody.appendChild(scoreTr);
    let scoreTd = document.createElement("td");
    let higherScoreTd = document.createElement("td");
    scoreTr.appendChild(scoreTd);
    scoreTr.appendChild(higherScoreTd);
    scoreTd.id = "scoreTd";
    higherScoreTd.id = "highScoreTd";
    bigTable.appendChild(bigTbody);

    scoreTd.innerHTML = "&#127822 " + (snake.length-4).toString();
    higherScoreTd.innerHTML = "&#127942 " + higherScore;
    scoreTd.style.fontSize = "4em";
    higherScoreTd.style.fontSize = "4em";
    let table = document.createElement("table");
    table.id = "plateau";
    let tbody = document.createElement("tbody");
    tbody.id = "tbodyPlateau";
    table.appendChild(tbody);
    for (let y = 1; y < 17; y++)
    {
        let tr = document.createElement("tr");
        tr.id = "tr" + y;
        for (let x = 1; x < 17; x++)
        {
            let td = document.createElement("td");
            td.id = x + "td" + y;
            let classe = "grass" + (x + y -1) % 2;
            td.classList += classe;
            td.style.width = "2em";
            td.style.height = "2em";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    document.getElementById("container").innerHTML = "";
    plateauTd.appendChild(table);
    document.getElementById("container").appendChild(bigTable);
    document.getElementById(pomme[0] + "td" + pomme[1]).className = "pomme";
    for (let i = 1; i <= snake.length-1; i++)
    {
        document.getElementById(snake[i][0] + "td" + snake[i][1]).className = "snake";
    }
    document.getElementById(snake[0][0] + "td" + snake[0][1]).className = "snakehead";
    let button = document.createElement("button");
    button.onclick = initPlateau;
    button.innerHTML = "Rejouer";
    let trButton = document.createElement("tr");
    let tdButton = document.createElement("td");
    tdButton.colSpan = "2";
    bigTbody.appendChild(trButton);
    trButton.appendChild(tdButton);
    tdButton.appendChild(button);
    tdButton.style.alignContent = "center";
}