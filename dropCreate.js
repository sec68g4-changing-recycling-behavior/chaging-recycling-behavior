
function validateForm() {
	
	if(document.getElementsByName("Metals")[0].checked || document.getElementsByName("Paper")[0].checked || document.getElementsByName("Plastics")[0].checked || document.getElementsByName("Electronics")[0].checked || document.getElementsByName("mat-other")[0].value.trim() != "")
		return true;
	else {
		alert("Please select at least one type of material that you will accept at your drop point before proceeding.");
		return false;
	}
}

function filterDropPoints() {
	
	// Reset all rows and show div
	document.getElementById("dropPointResults").style.display = "block";
	materialClick();
	
	return false;
}

function materialClick() {
	
	// Ghetto implementation, but it gets the job done!
	
	if ((document.getElementById("dropPointResults").style.display == "") ||(document.getElementById("dropPointResults").style.display == "block") ) {
	
		// If everything is unchecked, check everything since we never want to show nothing
		if (!document.getElementById("cbx_metal").checked && !document.getElementById("cbx_paper").checked && !document.getElementById("cbx_plastic").checked && !document.getElementById("cbx_electronics").checked && !document.getElementById("cbx_other").checked) {
			document.getElementById("cbx_metal").checked = true;
			document.getElementById("cbx_paper").checked = true;
			document.getElementById("cbx_plastic").checked = true;
			document.getElementById("cbx_electronics").checked = true;
			document.getElementById("cbx_other").checked = true;
		}
		
		// Set bool state value for each material
		var checkedMetal = false;
		var checkedPaper = false;
		var checkedPlastic = false;
		var checkedElectronics = false;
		var checkedOther = false;
		
		if (document.getElementById("cbx_metal").checked)
			checkedMetal = true;
		if (document.getElementById("cbx_paper").checked)
			checkedPaper = true;
		if (document.getElementById("cbx_plastic").checked)
			checkedPlastic = true;
		if (document.getElementById("cbx_electronics").checked)
			checkedElectronics = true;
		if (document.getElementById("cbx_other").checked)
			checkedOther = true;

		rows = document.getElementsByName("dataRow");
		var showRow = false;

		for (i=0; i<rows.length; i++) {
			// If none, show all rows
			if (checkedMetal || checkedPaper || checkedPlastic || checkedElectronics || checkedOther) {
				// If something is checked, show the corresponding rows
				showRow = false;
				
				// Note, we're using index of 5 here because the tabs in the source file are being picked up as children of the parent node
				if (checkedMetal && (rows[i].childNodes[5].innerHTML.indexOf("Metals") != -1))
					showRow = true;
				if (checkedPaper && (rows[i].childNodes[5].innerHTML.indexOf("Paper/Cardboard") != -1))
					showRow = true;
				if (checkedPlastic && (rows[i].childNodes[5].innerHTML.indexOf("Plastics") != -1))
					showRow = true;
				if (checkedElectronics && (rows[i].childNodes[5].innerHTML.indexOf("Electronics") != -1))
					showRow = true;
				if (checkedOther && (rows[i].childNodes[5].innerHTML.indexOf("Other") != -1))
					showRow = true;
				
				if (showRow)
					rows[i].style.display = "";
				else
					rows[i].style.display = "none";
			}
			else {
				// Nothing was checked so show all rows
				rows[i].style.display = "";
			}
		}
	}
}

function filterOnLoad() {
	filterParam = getAllUrlParams(window.location).filter;
	if (typeof filterParam !== "undefined") {
		// Uncheck all boxes
		document.getElementById("cbx_metal").checked = false;
		document.getElementById("cbx_paper").checked = false;
		document.getElementById("cbx_plastic").checked = false;
		document.getElementById("cbx_electronics").checked = false;
		document.getElementById("cbx_other").checked = false;
		
		// Check the appropriate box
		if (filterParam == "metal")
			document.getElementById("cbx_metal").checked = true;
		if (filterParam == "paper")
			document.getElementById("cbx_paper").checked = true;
		if (filterParam == "plastic")
			document.getElementById("cbx_plastic").checked = true;
		if (filterParam == "electronics")
			document.getElementById("cbx_electronics").checked = true;
		if (filterParam == "other")
			document.getElementById("cbx_other").checked = true;
	}
}

function getAllUrlParams(url) {

  url = url.toString().toLowerCase();
  
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
