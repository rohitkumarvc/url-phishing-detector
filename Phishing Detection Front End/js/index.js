var getUrlInfo = async(promptUrl) => {
    const url = `https://phishing-url-risk-api.p.rapidapi.com/url/?url=${promptUrl}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '24c1521ffbmshb266a50d0ee837cp1b99a4jsn9cd6fd628b28',
            'X-RapidAPI-Host': 'phishing-url-risk-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        var percentPishing = parseFloat(result[0].Ai_model_phishing_predict_score.substring(0,3));
        console.log(`Error Value: ${percentPishing}`);
    } catch (error) {
        console.error(error);
    }
    document.querySelector("img").style.display = "none";
    console.log(`percent = ${percentPishing}`);
    return percentPishing;
};

var globalURL = "";
document.querySelector(".fa-solid").addEventListener("click", async() =>{
    var url = document.querySelector("input").value;
    globalURL = url;
    document.querySelector("img").style.display = "block";
    var riskVal = 100;
    if(url !== ''){
        riskVal = await getUrlInfo(url);
        console.log(riskVal);
        if(riskVal > 20)
        {document.querySelector("img").style.display = "none";
            document.querySelector(".warning").style.display = "flex";
            document.querySelector(".content").style.display = "none";
        }
        else{
            location.replace(url);
        }
    }
});
var input = document.querySelector("input");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector(".fa-solid").click();
    }
  });

document.querySelector(".continue-btn").addEventListener("click", () => {
    window.location.replace(globalURL);
})