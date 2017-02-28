function onStart() {

	// Click handlers
	/***** ME *******/
	$(".me").click(function() {
		// Set "me" to clicked and remove active tag from project tiles
		$(".link").removeClass("clicked");
		$(this).addClass("clicked");
		var $ps = $(".projects").children();
		$ps
			.addClass("fastOut")
			.removeClass("active clicked noDelay");
		$(".projects").removeClass("active");

		// Switch background
		$(".bg").css("opacity", "0");
		$("#bgMe").css("opacity", "1");

		// Shrink menu, move it and pop it up again
		menuOut();
		setTimeout(function() {
			// Since classes handle positioning, remove all classes before setting this one
			$(".menu")
				.removeClass()
				.addClass("menu topCenter");
			menuIn();
		}, 1200);

		//Show about div
		$(".about").addClass("active");
	});

	/***** WORK *******/
	$(".work").click(function() {
		// Set "work" to clicked
		$(".me").removeClass("clicked");
		$(this).addClass("clicked");
		$(".about").removeClass("active");

		// Switch background
		$(".bg").css("opacity", "0");
		$("#bgWork").css("opacity", "1");

		// Shrink menu, move it and pop it up again
		menuOut();
		setTimeout(function() {
			$(".menu")
				.removeClass()
				.addClass("menu midCenter");
			menuIn();
		}, 1000);

		// Show projects area
		$(".projects").addClass("active");
		// Show tiles
		// Remove class "fastOut" if it's been activated and add class "active"
		$(".projects").children()
			.removeClass("fastOut")
			.addClass("active");
		setTimeout(function() {
			$(".projects").children().addClass("noDelay");
		}, 1000);

	});

	// Click handlers on projects
	$(".project").click(function() {
		// Set "clicked" tag and transition delay, and lower opacity of other tiles
		var $p = $(this);
		if($p.hasClass("clicked")) {
			$p.removeClass("clicked");

		}else {
			$(".projects").children().removeClass("clicked")
			$(this).addClass("clicked");
		}
		
	});

	// Hide loader on page load and show menu
	$(window).on('load', function() {
			$(".loader-wrapper-wrapper").css("opacity", "0");

			// Show menu
			setTimeout(function() {
				menuIn();
			}, 1000);
	});
	

	

	// Initialize Konami Code easter egg
	var easterEgg = new Konami(function() {
		// Slide in cutouts
		$(".pottfrilla").css("transform", "translateY(-100%)");

		// Slide out
		setTimeout(function() {
			$(".pottfrilla").css("transform", "translateY(100%)");
		}, 3000);
	});
}

function menuIn() {
	// Show menu
	// Widen svg line
	$("svg").css("transform", "scaleX(1)");
	// Fade in and rise name
	$(".name")
		.css("transform", "translateY(0%)")
		.css("opacity", "1");
	// Fade in and drop links
	$(".me, .work, .principles, .komma, .och")
		.css("transform", "translateY(0%)")
		.css("opacity", "1");

}

function menuOut() {
	// Hide menu
	// Incease transition speed on all elements
	$(".name, .me, .work, .principles, .komma, .och")
		.addClass("fast");
	// Shrink svg line - settimeout to do it last
	setTimeout(function(){
		$("svg").css("transform", "scaleX(0)");
	}, 100);
	// Fade out and fall name
	$(".name")
		.css("transform", "translateY(30%)")
		.css("opacity", "0");
	// Fade out and rise links
	$(".me, .work, .principles, .komma, .och")
		.css("transform", "translateY(-50%)")
		.css("opacity", "0");

	// Reset transition speed increase
	setTimeout(function() {
		$(".name, .me, .work, .principles, .komma, .och").removeClass("fast");
	}, 1000);
}

/**********************/
/* IMPORTED FUNCTIONS */
/**********************/
// helper function to get an element's exact position
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}