$(function(){

'use strict';

/**An object with questions, answers, and one for the right answer. **/

var test = {								
	headH1: 'Тест по программированию',	
	quests: [								
		{									
			quest:"Вопрос №1",	
			1:"Вариант ответа №1_1",			
			2:"Вариант ответа №1_2",
			3:"Вариант ответа №1_3",
			answTrue:"1"
		},
		{
			quest:"Вопрос №2",
			1:"Вариант ответа №2_1",
			2:"Вариант ответа №2_2",
			3:"Вариант ответа №2_3",
			answTrue:"3"
		},
		{
			quest:"Вопрос №3",
			1:"Вариант ответа №3_1",
			2:"Вариант ответа №3_2",
			3:"Вариант ответа №3_3",
			answTrue:"2"
		}
	]
};

/** Writes an object with questions, answers and 
/*  the correct answers in the local storage. 
**/

localStorage.setItem('dataStr', JSON.stringify(test));

/** Read the object with questions, answers and 
/*  the correct answers from the local store.
**/

var data = JSON.parse(localStorage.getItem('dataStr'));

/**We form the the contents of a web page with 
/* questions and answer options.
**/

var results = document.getElementById("results");
results.innerHTML = tmpl("item_tmpl", data);

var checkedEl;

/** Processing click a button to display the results of the test.
/*  Disable standard role element.
/*  Gradually show a dark substrate.
/*  After the previous animation remove from the modal window display: none.
/*  Gradually increasing transparency at the same time with a shift down.
/*  Сall the function checkRezalt.
**/

document.getElementById('btn-test').onclick = function(event){
	event.preventDefault(); 
	$('body').css('overflow', 'hidden'); 
	$('#overlay').fadeIn(400, 
		function(){ 
			$('#formModal').css('display', 'block')
			.animate({opacity:1, top:'50%'}, 200); 
		}
	);
	checkRezalt();
};

/**
/*  Check answers and prepare the information 
/*  with the results of the test.
/*  Then, call the function printResult.
**/
	
function checkRezalt(){
	checkedEl = $("input:radio:checked");
	var res_folse = "Неверный ответ на вопрос № ";
	var mist = false;
	var notCheck = checkedEl.length;   
	if (notCheck == 3){
		for (var i=0; i < checkedEl.length; i++){
			if(checkedEl[i].value != test.quests[i].answTrue){
				mist = true;
				res_folse = res_folse + (i + 1) + ',' ;
			}
		};
	};
	printResult (mist, notCheck, res_folse);
};


/**
/*  We print the test results in the modal window.
/*  If there are errors, show the numbers of questions with a wrong answer.
/*  When the answer is not in all questions - show the reminder and 
/*  does not clear the selection of the other possible answers.
**/

function printResult (mist, notCheck, res_folse){
	if (mist == true ){
		res.innerHTML = 'Тест не пройден' + '<br>' + 
		res_folse.substring(0, res_folse.length - 1);   
		}else if ( notCheck !== 3) {
			res.innerHTML = "Сделайте Ваш выбор варианта " + 
			"ответа для каждого вопроса";
		}
		else{ 
			res.innerHTML = "Тест успешно пройден!";
		}
};


 /**
/* Closing a modal window, doing here in reverse order.
/* Turn on scrolling.
/* Gradually changing the opacity to 0 at the same time move-up window.
/* After the animation make it display: none.
/* Hide substrate. 
/* Call the function resetRadio.
**/

function formClose(){ 
   	$('body').css('overflow', 'auto'); 
    $('#formModal').animate({opacity: 0, top: '45%'}, 200,  
        function(){ 
          	$(this).css('display' , 'none'); 
           	$('#overlay').fadeOut(400); 
		}
    );
	resetRadio();
};


 /* Reset all radiobuttons */

function resetRadio (){
	if (checkedEl.length ==3){
      	var btnRes = document.getElementsByClassName('btn-reset');
   		for (var i = 0; i < btnRes.length; i++) {
   			var el = btnRes[i];
   			el.click();
  		}
  	}
};

/* We catch a click on the cross. */ 

$('#closeForm, #btn-mod').click(formClose); 

/* Closing the modal form for the escape */

document.onkeydown = function(e) {
    if (e.keyCode == 27) { // escape
      	var state = $('#formModal').css('display');
      	if (state != 'none'){
      		formClose();
      	}else{
      		return;
	   	}
    };
};

 }());