
function validateForm() {
	
	if(document.getElementsByName("Metals")[0].checked || document.getElementsByName("Paper")[0].checked || document.getElementsByName("Plastics")[0].checked || document.getElementsByName("Electronics")[0].checked || document.getElementsByName("mat-other")[0].value.trim() != "")
		return true;
	else {
		alert("Please select at least one type of material that you will accept at your drop point before proceeding.");
		return false;
	}
}