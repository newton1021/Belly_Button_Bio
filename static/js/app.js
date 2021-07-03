//		Use the D3 library to read in samples.json.

var dataset = {}

var datafile = "./samples.json";
selectID = d3.select('#selDataset')
d3.json(datafile).then(data => {
	dataset = data;
	var names = data.names.map((d,i) => {
		selectID.append('option')
		.attr("value", i)
		.text(d)
	});
	//	var samples = data.samples.map(d => {
	//		var id = d.id;
	//		var otu_ids = d.otu_ids;
	//		var sampleValues = d.sample_values;
	//		var otu_labels = d.otu_labels;
	//		
	//		
	//		console.log(id);
	//		console.log(otu_ids);
	//		console.log(sampleValues);
	//		console.log(otu_labels);
	//	});
	//	
	//	var metadata = data.metadata.map(d => d);
	
});

function zip(A,B,C) {
	return A.map((a,i) => [a,B[i],C[i]])
}

function optionChanged(index) {
	var subject = dataset.names[index];
	var sample =  dataset.samples[index];
	var metadata = dataset.metadata[index];
	console.log(metadata);
	
	d3.select('#demoInfo')
	.selectAll("tr").remove()
	
	
	d3.select('#demoInfo')
	.selectAll("tr")
	.data(Object.keys(metadata))
	.enter()
	.append('tr')
	.html(row => `<th>${row}</th><td>${metadata[row]}</td>` );
	
	
	otu_id = sample.otu_ids;
	values = sample.sample_values
	labels = sample.otu_labels;
	
	datapoints = zip(otu_id, values, labels);
	
	sorted = datapoints.sort((a,b) => a[1] < b[1])
	
	
	var top10_ids = [];
	var top10_values = [];
	var top10_labels = [];
	
	
	for(i = 0; i < Math.min(10,sorted.length); i++ ){
		var temp = `ID ${sorted[i][0]}`
		top10_ids.push(temp);
		top10_values.push(sorted[i][1]);
		top10_labels.push(sorted[i][2]);
	}
	
	console.log(top10_ids)
	
	
	trace = {
		x: top10_values,
		y: top10_ids,
		text: top10_labels,
		type: "bar",
		orientation: 'h'
	}
	layout = {
		title: `Bacteria for ${subject}`,
		yaxis: {autorange:"reversed"}
		
	}
	
	
	Plotly.newPlot('bar',[trace],layout)
	
	var colors = otu_id.map(id => `rgb(${Math.floor(255-id*255/4000)}, 100, ${Math.floor(id * 255/4000)})`)
	
	//Bubble chart
	var trace2 = {
		x: otu_id,
		y: values,
		text: labels,
		mode: 'markers',
		marker: {size: values.map(val => val / 3 + 20),
			color: colors},
	}
	var layout2 = {
		title: "Bubble Chart"
	}
	
	
	Plotly.newPlot('bubble', [trace2], layout2)
	console.log(colors)
	console.log(sample)
	console.log(metadata)
	
	var wfreq = parseInt(metadata['wfreq']);
	console.log(wfreq)
		
	// gauge
	var trace3 = {
		value: wfreq,
		type: 'indicator',
		mode: "gauge+number",
		gauge: {
			axis: { range: [null, 7] }
		}
	}
	
	var layout3 = {
		title: "Washing Frequency"
	}
	
	Plotly.newPlot('gauge', [trace3], layout3);
}


//		Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//		
//		Use sample_values as the values for the bar chart.
//		
//		Use otu_ids as the labels for the bar chart.
//		
//		Use otu_labels as the hovertext for the chart.
//		
//		bar Chart
//		
//		Create a bubble chart that displays each sample.
//		
//		Use otu_ids for the x values.
//		
//		Use sample_values for the y values.
//		
//		Use sample_values for the marker size.
//		
//		Use otu_ids for the marker colors.
//		
//		Use otu_labels for the text values.

