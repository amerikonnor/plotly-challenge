function makeDropdown(){
    d3.json("../samples.json").then(importedData => {

        var data = importedData;
    
        // array of ids
         var names = data.names;

        //dictionary, keys are
        // id
        // ethnitcity
        //gender
        //age
        //location
        //bbtype
        //wfreq
        var metadata = data.metadata;

        //dictionary, keys are
        // id
        // otu_id is an array
        // otu_names is an array
        var samples = data.samples;

        var dropDown = d3.select('#selDataset');
    
        names.forEach(name => {
            var option = dropDown.append('option');
            option.attr('value',name);
            option.text(name);
        });

    });
};
d3.selectAll('body').on('change',optionChanged(this.value));
function optionChanged(name){
    updateTable(name);
};

function updateTable(name){
    d3.json("../samples.json").then(importedData => {

        //dictionary, keys are
        // id
        // ethnitcity
        //gender
        //age
        //location
        //bbtype
        //wfreq
        var metadata = importedData.metadata;
        if  (typeof(name) == "undefined"){
            name = '940';
        }
        console.log(name);
        var thisOne = metadata[0];
        var table = d3.select('.panel-body').append('table');
        d3.selectAll('tr').remove();
        metadata.forEach(subject =>{
            if (subject['id'] == name){
                thisOne = subject;
            }
        });
        Object.keys(thisOne).forEach(key =>{
            var row = table.append('tr');
            text = `${key}: ${thisOne[key]}`
            row.append('td').text(text)
        })
       
        
        
    })
};

function init(){
    makeDropdown();
    
};

init();
