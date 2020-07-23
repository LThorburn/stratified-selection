// ############################################################################### //

// Stratified Random Selection
// Luke Thorburn, July 2020

// To start local server:
// python -m http.server 8888

// ############################################################################### //
// DEFINE VARIABLES

var input = {},
    output = [];


// ############################################################################### //
// LOAD DATA

function dropHandler(ev, idSuffix) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    const reader = new FileReader();

    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        // console.log('... file[' + i + '].name = ' + file.name);
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});

          var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          input[idSuffix] = XLSX.utils.sheet_to_json(firstSheet);
        }

        reader.readAsArrayBuffer(file)
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }

  // Change styling:
  var id = 'dragdrop-' + idSuffix;
  document.getElementById(id).classList.remove('active');
}

function dragOverHandler(ev, idSuffix) {
  // Prevent default behavior.
  ev.preventDefault();
  
  // Change styling:
  var id = 'dragdrop-' + idSuffix;
  document.getElementById(id).classList.add('active');

}

function dragLeaveHandler(ev, idSuffix) {
  // Prevent default behavior.
  ev.preventDefault();
  
  // Change styling:
  var id = 'dragdrop-' + idSuffix;
  document.getElementById(id).classList.remove('active');

}

function handleFileSelect(ev) {
    var file = ev.target.files[0]; // FileList object

    var reader = new FileReader();

    // Fetch file ID.
    var idSuffix = this.id.split('-')[1];

    // Closure to capture the file information.
    reader.onload = function(e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});

      var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      input[idSuffix] = XLSX.utils.sheet_to_json(firstSheet);
    }

    reader.readAsArrayBuffer(file)
}

document.getElementById("browse-variables").addEventListener("change", handleFileSelect, false);
document.getElementById("browse-candidates").addEventListener("change", handleFileSelect, false);


// ------------------------------------------------------------------------------- //
// RUN

function performSelection(ev) {

  console.log('Selecting...');

  output = input.candidates;

}

document.getElementById("run").addEventListener("click", performSelection, false);

// ------------------------------------------------------------------------------- //
// EXPORT

function fileExport(ev) {

  var fileExtension = this.id.split('-')[1];

  // Construct workbook.
  var wb = {};
  wb['SheetNames'] = ['Selection'];
  wb['Sheets'] = {
    Selection: XLSX.utils.json_to_sheet(output)
  }

  XLSX.writeFile(wb, 'selection.' + fileExtension)

}

document.getElementById("export-csv").addEventListener("click", fileExport, false);
document.getElementById("export-xlsx").addEventListener("click", fileExport, false);


// ------------------------------------------------------------------------------- //