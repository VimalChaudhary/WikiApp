
//This function makes the request to localhost:8088/api/:query which returns all the related links 
function getLinks(){
	var query = document.getElementById("textbox").value;
	var htmlOutput="";
	
	var url = "http://127.0.0.1:8088/api/"+query;
	$.getJSON(url, function(data){
		var obj=(JSON.parse(data));
		for(var i=0; i<obj[3].length ;i++){
			htmlOutput += "<div class=\"link\">" + "<a href='#' id="+obj[3][i]+" onClick=\"getData(this.id)\">"+ obj[3][i]+ "</a>"+ "</div>";
		}
		$("#article").html(htmlOutput);	

	});
};


//When you click on a link this function is called and it gets the data of link that you clicked
function getData(query){
	var split = query.split('/');       //we need the last part of url thet will be in split[4] 
	var url = "http://127.0.0.1:8088/api/detail/"+split[4];   
	$.getJSON(url, function(data){
			
			//Returned data is not a valid json so removing the unnecessary parts
			data= data.slice(5,data.length-1);
			var jsonObject = JSON.parse(data);
		
			//retreiving the html data
			var markup = jsonObject.parse.text["*"];
			var blurb = $('<div></div>').html(markup);
 
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
 
            // remove any references
            blurb.find('sup').remove();
 
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('#article').html($(blurb).find('p'));
			
			
	});
};

