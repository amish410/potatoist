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
    console.log(randomimg.fun_fact);
    document.getElementById("potatoFact").innerHTML = `<br>${potatoFact}<br><br>Find more interesting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
    
}

function recipes() {
    let output = "<br>";
    randomimg.recipes.forEach(recipe => {
        output += `<strong>${recipe.name}</strong><br>${recipe.description}<br><br>`;
    });
    document.getElementById("potatoRecipie").innerHTML = output.trim();
}

function validImage(url) {
    return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
        console.log("Image Valid?", resolve);
    });
}

async function searchpotato() {
    let query = document.getElementById("searchpotato").value.trim().toLowerCase();

    let local = potatoData.find(potato =>
        potato.name.toLowerCase().includes(query)
    )

    if (local) {
        document.getElementById("mainPotato").src = local.image_url;
        document.getElementById("potatoName").textContent = `This is the ${local.name} potato!`;
        document.getElementById("potatoFact").innerHTML = `<br>${local.fun_fact}<br><br>Find more interesting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
        let output = "<br>";
        local.recipes.forEach(recipe => {
            output += `<strong>${recipe.name}</strong><br>${recipe.description}<br><br>`;
        });
        document.getElementById("potatoRecipie").innerHTML = output.trim();
        return;
    }


    let response = await fetch(`https://api.spoonacular.com/food/products/search?query=${query}&apiKey=36f3c03a739e442fa27ea40bdfcc4150`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status == 402) {
        document.getElementById("potatoName").textContent = `API limit reached. Try again tomorrow :(`;
        document.getElementById("mainPotato").src = "images/noimages.png";
        return;
    }

    let data = await response.json();
    const searchWord = "potato";
    for (i in data.products) {
            if (data.products && data.products.length > 0 && data.products[i].title.toLowerCase().includes("potato")) {
                document.getElementById("potatoName").textContent = `This is the ${data.products[i].title}!`;
                const image = data.products[i].image; 
                const valid =  await validImage(image);
                if (valid) {
                    document.getElementById("mainPotato").src = image;
                    document.getElementById("potatoFact").innerHTML = `<br>There are no fun facts available for this potato :( <br><br> You can some other intresting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
                    document.getElementById("potatoRecipie").innerHTML = `<br>There are no recipes available for this potato :(`;
                    break;
                }
                else {
                    document.getElementById("mainPotato").src = "images/noimages.png";
                    document.getElementById("potatoFact").innerHTML = `<br>There are no fun facts available for this potato :( <br><br> You can some other intresting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
                    document.getElementById("potatoRecipie").innerHTML = `<br>There are no recipes available for this potato :(`;
                    break;
                }
                } else {
                    console.log(data.products)
                    document.getElementById("potatoName").textContent = `No potato found :(`;
                    document.getElementById("mainPotato").src = "images/noimages.png";
                    document.getElementById("potatoFact").innerHTML = `<br>There are no fun facts available for this potato :( <br><br> You can some other intresting fun facts about potatoes <a href="https://potatogoodness.com/potato-fun-facts-history/" target="_blank">here</a>!`;
                    document.getElementById("potatoRecipie").innerHTML = `<br>There are no recipes available for this potato :(`;
                    break;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchpotato").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchpotato();
    }
  });
});