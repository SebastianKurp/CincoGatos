function langCodes(){
    var learning = document.getElementById("language").textContent;
    switch(learning){
        case "Spanish":
            learning = "spa";
            break;
        case "Arabic":
            learning = "ara";
            break;
        case "Polish":
            learning = "pol";
            break;
        case "Japanese":
            learning = "jpn";
            break;
    }    
    return learning;
}


function readFile(file) {      
    var learning = langCodes();
    var lowerCase = [];
    var noDuplicates= [];

    var reader = new FileReader();
    reader.onload = success;                                            
    async function success(evt) { 
        var contents = evt.target.result;
        var result = contents.split(/[^a-zA-Z0-9']/);
        
        for(i=0;i<result.length;i++){
            lowerCase.push(result[i].toLowerCase());
        }
        for(i=0;i<lowerCase.length;i++){//remove duplicates
            if(noDuplicates.indexOf(lowerCase[i])<0 && lowerCase[i].length>1){
                noDuplicates.push(lowerCase[i]);
            }
        } 
        
        for(i=0; i<noDuplicates.length;i++){
            var url = "https://glosbe.com/gapi/translate?from=eng&dest=" + learning +"&format=json&phrase=" + noDuplicates[i] +
                    "&pretty=true&callback=?";
            await getJSONAsync(url);
        }

        for(i=0; i<noDuplicates.length;i++){
            console.log(noDuplicates[i]+ " : " + translations[i]);
        }
    };
    reader.readAsText(file);   
} 

var translations = [];
async function getJSONAsync(url){
    await $.getJSON(url, function(json){
        if(json != "Nothing found."){
            try{
                var transWord = json.tuc[0].phrase.text;
                translations.push(transWord);
            }catch(err){
                translations.push("-1");
            }
        }       
    })
}

function showFileName(name){
    var txtIndex = name.search(".txt");
    var finalName = name.substring(0,txtIndex);
    document.getElementById("fileName").textContent = finalName;
    document.getElementById("fileName").setAttribute("style","visibility: visible");
}

document.getElementById('file').onchange = function(e) {
    readFile(e.srcElement.files[0]);
    showFileName(e.srcElement.files[0].name);
};





