
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