function langCodes(){//get users language they want to learn
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
        
        for(i=0; i<noDuplicates.length;i++){//use api to fetch translations
            var url = "https://glosbe.com/gapi/translate?from=eng&dest=" + learning +"&format=json&phrase=" + noDuplicates[i] +
                    "&pretty=true&callback=?";
            await getJSONAsync(url);
        }

        for(i=0; i<noDuplicates.length;i++){//remove words with no translation
            console.log(translations[i] + " " + typeof translations[i]);
            if(typeof translations[i] === "number"){
                translations.splice(i, 1);
                noDuplicates.splice(i, 1);
            } //for some reason this only removes some of the '1' values.
            console.log(noDuplicates[i]+ " : " + translations[i]);
        }
        console.log(translations);
        showTranslations(noDuplicates, translations);
    };
    reader.readAsText(file);  
} 

var translations = [];
async function getJSONAsync(url){//gets translation from api 
    await $.getJSON(url, function(json){
        if(json != "Nothing found."){
            try{
                var transWord = json.tuc[0].phrase.text;
                translations.push(transWord);
            }catch(err){
                translations.push(1);
            }
        }       
    })
}

var list = document.getElementById("list");//displays translations for the user 
function showTranslations(eng,trans){
    document.getElementById('loadingcat').setAttribute("style", "display : none");
    document.getElementById("display").setAttribute("style", "display: block");
    for(i = 0; i<eng.length; i++){
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(eng[i] + " : "+ trans[i]));
        list.appendChild(entry);        
    }
}


function showFileName(name){//displays file name that was uploaded
    var txtIndex = name.search(".txt");
    var finalName = name.substring(0,txtIndex);
    document.getElementById("fileName").textContent = finalName;
    document.getElementById("fileName").setAttribute("style","visibility: visible");
}

document.getElementById('file').onchange = function(e) {//waits for file upload 
    readFile(e.srcElement.files[0]);
    showFileName(e.srcElement.files[0].name);
    document.getElementById('loadingcat').setAttribute("style", "display : block");
};





