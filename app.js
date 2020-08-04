//SET URL SO IT USES DEPLOYED API URL IF IT EXISTS, LOCALHOST IF IT DOESN'T
const deployedURL = "https://job-tracker-emestiza.herokuapp.com/";
const URL = deployedURL ? deployedURL : "http://localhost:3000";

//GLOBAL VARIABLES
// const $createButton = $("#create");
// const $updateButton = $("#update");
// const $deleteButton = $("#delete");

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	let actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		let index = $("table tbody tr:last-child").index();
        let row = '<tr>' +
            '<td><input type="text" class="form-control" name="company" id="company"></td>' +
            '<td><input type="text" class="form-control" name="position" id="position"></td>' +
            '<td><input type="text" class="form-control" name="location" id="location"></td>' +
            '<td><input type="text" class="form-control" name="date" id="date"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td><input type="text" class="form-control" name="onsite" id="onsite"></td>' +
            '<td><input type="text" class="form-control" name="offer" id="offer"></td>' +
            '<td><input type="text" class="form-control" name="url" id="url"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		let empty = false;
		let input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});

