var checkedValue = null; 

var allForm = ["name", "e-mail","code", "insta", "num","snacks","fitness", "vibe", "haircut", "rooms", "music"];
var count = 0;
var temp;
$(document).ready(app);

function app() {
	var win = $(window),
		doc = $(document),
		body = $("html, body"),
		inputs = $("input"),
		goLeftBtn = $("#goLeft"),
		goRightBtn = $("#goRight"),
		// 0 = in, 1 = cm
		unit = 0,
		dogLength = $("#dogLength"),
		dogLengthUnit = $("#dogLengthUnit"),
		dog = $(".dog"),
		growingState = "growing",
		rootStyle = document.querySelector(":root"),
		csRoot = window.getComputedStyle(rootStyle),

		pvDuration = csRoot.getPropertyValue("--dur"),
		duration = +pvDuration.substr(0,pvDuration.length - 1),

		pvDogWidth = csRoot.getPropertyValue("--dogWidth"),
		dogWidth = +pvDogWidth.substr(0,pvDogWidth.length - 2),

		pvDogUpAngle = csRoot.getPropertyValue("--dogUpAngle"),
		dogUpAngle = +pvDogUpAngle.substr(0,pvDogUpAngle.length - 3),

		pvDogBouceDown = csRoot.getPropertyValue("--dogBounceDown"),
		dogBouceDown = +pvDogBouceDown.substr(0,pvDogBouceDown.length - 3),

		pvDogBouceUp = csRoot.getPropertyValue("--dogBounceUp"),
		dogBouceUp = +pvDogBouceUp.substr(0,pvDogBouceUp.length - 3),

		growAmount = 20,   //15,
		scrollDur = 350,
		timeout;

	var changeUnit = function() {
			unit = this.value == "in" ? 0 : 1;
			if (!unit) {
				dogLength.html(dogWidth);
				dogLengthUnit.html("in.");

			} else {
				dogLength.html(+(dogWidth * 2.54).toFixed(1));
				dogLengthUnit.html("cm");
			}
			
		},
		updateDogWidth = function() {
			dogLength.html(!unit ? dogWidth : +(dogWidth * 2.54).toFixed(1));
		},
		

		growDog = function(e) {
			var temp="";
			if(count!= allForm.length){ 
				showForm(allForm[count]);
				count++;
			}

			if(count == allForm.length){
				document.getElementById("submit").style.display="block";
			}

			if (
				(e.clientX || e.keyCode == 32 || e.keyCode == 39) && 
				!dog.hasClass(growingState) && 
				!goLeftBtn.is(":focus") && 
				!goRightBtn.is(":focus")
			) {
				let dur1e3 = duration * 1e3;

				dog.addClass(growingState);
				dogWidth += growAmount;

				rootStyle.style.setProperty("--dogWidth",dogWidth + "em");
				rootStyle.style.setProperty("--dogUpAngle",dogUpAngle + "deg");
				rootStyle.style.setProperty("--dogBounceDown",dogBouceDown + "deg");
				rootStyle.style.setProperty("--dogBounceUp",dogBouceUp + "deg");

				dogUpAngle /= 2;
				dogBouceDown /= 2;
				dogBouceUp /= 2;

				clearTimeout(timeout);
				timeout = setTimeout(updateDogWidth,dur1e3);

				body
					.stop().dequeue()
					.delay(dur1e3)
					.animate(
						{scrollLeft: dogWidth < 50? 100 + (dogWidth*12): (dogWidth*13)}, //doc.outerWidth()},
						scrollDur,
						"linear",
						function(){
							dog.removeClass(growingState);
						}
					);
			}
		}

		inputs.each(function(){
			$(this).change(changeUnit);
		})
		dog.click(growDog);
		win.keydown(growDog);
		goLeftBtn.click(function(){
			body.stop().dequeue().animate({scrollLeft: 0},scrollDur,"linear");
		});
		goRightBtn.click(function(){
			body.stop().dequeue().animate({scrollLeft: doc.outerWidth()},scrollDur,"linear");
		});
		win.scroll(function(){
			goLeftBtn.attr(
				"disabled", 
				win.scrollLeft() > 0 ? false : true
			);
			goRightBtn.attr(
				"disabled", 
				win.scrollLeft() < doc.innerWidth() - win.outerWidth() ? false : true
			);
		});


}

function showForm(temp){
	document.getElementById(temp).style.display="block";
}


function checkBoxValid(){
	var checkboxOption = document.getElementsByClassName("form-check-input");
	for(var i=0; checkboxOption[i]; ++i){
		if(checkboxOption[i].checked){ 
			return true;
		}
	}
	alert("Please choose at leats one haircut");
	return false;
}
