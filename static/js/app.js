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
        //sample values in an array
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
    bubbleGraph(name);
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




function bubbleGraph(name){
    d3.json("../samples.json").then(importedData => {
        var data = importedData;
        //array of dictionaries, keys are
        // id
        // otu_ids is an array
        //sample_values in an array
        // otu_names is an array
        var samples = data.samples;
        if  (typeof(name) == "undefined"){
            name = '940';
        }
        console.log(name);
        var thisOne = samples[0];
        samples.forEach(subject =>{
            if (subject['id'] == name){
                thisOne = subject;
            }
        });

        var trace1 = [{
            x: thisOne['otu_ids'],
            y: thisOne['sample_values'],
            mode: 'markers',
            marker:{
                color:thisOne['otu_ids'],
                size: thisOne['sample_values']
            }
        }]

        var layout = {
            title: 'Operational Taxonomy Units (OTU)',
            xaxis:{
                title: 'OTU ID'
            },
            yaxis:{
                title: 'Sample Value'
            }
        }

        Plotly.newPlot('bubble',trace1,layout);

        

    })
}
function init(){
    makeDropdown();
    
};

init();
