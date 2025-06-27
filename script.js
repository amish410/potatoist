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
    let query = document.getElementById("searchpotato").value;

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
                    break;
                }
                else {
                    document.getElementById("mainPotato").src = "images/noimages.png";
                    break;
                }
                } else {
                    console.log(data.products)
                    document.getElementById("potatoName").textContent = `No potato found :(`;
                    document.getElementById("mainPotato").src = "images/noimages.png";
                    break;
        }
    }
}

/* document.getElementById("searchpotato").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault(); // prevent form submission if it's inside a form
    searchquery();
  }
}); */