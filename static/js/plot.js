
// Call the metadata table function
function DemogInfo(data,selectedSample) {
    
    var metadata_panel = d3.select("#sample-metadata");
    var metadata = data.metadata
    var selectedMetadata = metadata.filter(m => m.id == selectedSample)[0]
    console.log(data)
    metadata_panel.html("");
    
    Object.entries(selectedMetadata).forEach(([key, value]) => {
        console.log(key);
        console.log(value);
        metadata_panel.append("p").text(`${key}: ${value}`);
        
    })};



// Call the build table function
var samplesData ="";
function init() {
    var selDropdown = d3.select("#selDataset");
    d3.json("data/samples.json").then((data)=>{
      samplesData  = data
        var names = data.names;
        
        names.forEach((sample)=>{
            selDropdown.append("option").text(sample).property("value",sample)
        });

        var firstSample = names[0];    
        console.log(firstSample);
        // Call the build table function and call the metadata function
    
        DemogInfo(data, firstSample);
        drawChart(data,firstSample)

        function optionChanged() {
            var selectedSample = d3.select("#selDataset").property("value")
        
            DemogInfo(data, selectedSample);
            drawChart(data,selectedSample)
        
            //buildDashboard(selectedValue)
         }
        
        d3.select("#selDataset").on("change", optionChanged)
         
        
    })};// 


init();




function drawChart(data,selectedSample) {

    var samples = data.samples
    var selectedsample = samples.filter(s => s.id == selectedSample)[0]

var yNames = selectedsample.otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse()

var sampleValues = selectedsample.sample_values.slice(0,10).reverse()


var  bardata = [
    {
       y: yNames,
       x: sampleValues,
        type: "bar",
       orientation: "h",

     }

 ];


Plotly.newPlot('bar', bardata)

var  bubledata = [
    {
        x: selectedsample.otu_ids,
        y: selectedsample.sample_values,
        mode: 'markers',
        marker: {
            size: selectedsample.sample_values,
            color:selectedsample.otu_ids
    }

    }];


Plotly.newPlot('bubble', bubledata)



}


// var trace1 = {
//     x: otu_ids,
//     y: sample_values,
//     mode: 'markers',
//     marker: {
//       size: sample_values,
//       color: otu_ids,
//       colorscale: "Earth"
//     }
//   };
  
//   var data = [trace1];
  
//   };
  
//   Plotly.newPlot('bubble', data);



// buildDashboard(940)

// // every time I change the dropdown it will change it dynamically. Run a function on change. It takes two arguments the vent you want to listen and 2nd is a function we want to run//
// 