let potatoData = [];
let randomimg = null;

fetch('potato_data.json')
    .then(response => response.json())
    .then(data => {
        potatoData = data;
    })

function randompotato() {
    randomimg = potatoData[Math.floor(Math.random() * potatoData.length)];
    document.getElementById("mainPotato").src = randomimg.image_url;
    potatoName = randomimg.name;
    document.getElementById("potatoName").textContent = `This is the ${potatoName} potato!`;
}

function funfacts() {
    let potatoFact = randomimg.fun_fact;
    document.getElementById("potatoFact").textContent = `${potatoFact}`;
}