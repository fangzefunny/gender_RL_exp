function downloadCSV(csv, filename){
    var csvFile;
    var downloadLink;

    // retrieve CSV file from the experiment
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // Retrieve File name
    downloadLink.download = filename 

    // Create a link to the file 
    downloadLink.href = window.URL.createObjectURL(csvFile)

    // Hide download link
    downloadLink.style.display = "name";

    // Add link to the DOM
    document.body.appendChild(downloadLink);

    downloadLink.click();
}