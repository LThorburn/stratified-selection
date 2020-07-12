// ############################################################################### //

// Stratified Random Selection
// Luke Thorburn, July 2020

// To start local server:
// python -m http.server 8888

// ############################################################################### //
// LOAD DATA

function dropHandler(ev) {
  console.log('File(s) dropped');

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();


  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();
        console.log('... file[' + i + '].name = ' + file.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    }
  }

  // Change styling:
  var id = ev.target.id;
  document.getElementById(id).classList.remove('active');
}

function dragOverHandler(ev) {
  console.log('File(s) in drop zone'); 

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  
  // Change styling:
  var id = ev.target.id;
  document.getElementById(id).classList.add('active');

}


// ------------------------------------------------------------------------------- //
// LOAD CONTROLS



// ------------------------------------------------------------------------------- //
// REFRESH TAXONOMY


// ------------------------------------------------------------------------------- //