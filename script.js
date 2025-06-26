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
    document.getElementById("potatoFact").innerHTML = `<br>${potatoFact}<br><br>Find more intresting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
}

function recipies() {
    let output = "<br>";
    randomimg.recipes.forEach(recipe => {
        output += `<strong>${recipe.name}</strong><br>${recipe.description}<br><br>`;
    });
    document.getElementById("potatoRecipie").innerHTML = output.trim();
}