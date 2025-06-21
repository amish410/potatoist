function randompotato(potato) {
    fetch('potato_data.json')
        .then(response => response.json())
        .then (data => {
            const randomimg = data[Math.floor(Math.random() * data.length)];
            document.getElementById("mainPotato").src = randomimg.image_url;
            potatoName = randomimg.name
            document.getElementById("potatoName").textContent = `This is the ${potatoName} potato!`;
        }) 
}