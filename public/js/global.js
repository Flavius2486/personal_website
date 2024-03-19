/*------------------------------------*\
	Information
\*------------------------------------*/

/*
 * Scripts by Dominik Serafin
 * * http://serafin.io/
 * * dominikdsgnr@gmail.com
 *
 */

/*------------------------------------*\
	Document Ready
\*------------------------------------*/
$(document).ready(function () {
  /*------------------------------------*\
		FUNCTION ShowcaseHeightSet()
		Set '.showcase__stage-wrapper'
		height the same as
		'.showcase__stage--active'
		(which is positioned absolutely
		and doesn't fill wrapper)
	\*------------------------------------*/
  function ShowcaseHeightSet() {
    $(".showcase__stage-wrapper").css(
      "height",
      $(".showcase__stage--active").height()
    );
  }

  /*------------------------------------*\
		Set hero and showcase heights
	\*------------------------------------*/
  if ($(".maxwidth1050").css("display") == "none") {
    $(".content").css("top", $(window).height());
    $(".hero").css("height", $(window).height());
  } else {
    var HeroHeight =
      $(".hero__content").height() + $(".experience__hollow-arrow").height();
    $(".hero").css("height", HeroHeight);
    $(".content").css("top", 0);
  }

  ShowcaseHeightSet();

  $(window).resize(function (event) {
    if ($(".maxwidth1050").css("display") == "none") {
      $(".content").css("top", $(window).height());
      $(".hero").css("height", $(window).height());
    } else {
      var HeroHeight =
        $(".hero__content").height() + $(".experience__hollow-arrow").height();
      $(".hero").css("height", HeroHeight);
      $(".content").css("top", 0);
    }

    ShowcaseHeightSet();
  });

  window.addEventListener("orientationchange", function () {
    ShowcaseHeightSet();
  });

  /*------------------------------------*\
		Hamburger navigation in header
	\*------------------------------------*/
  $(".header__hamburger").click(function (event) {
    $(".header__navigation").fadeToggle(100);
    event.stopPropagation();
  });

  $(".header__navigation").click(function (event) {
    event.stopPropagation();
  });

  $("html, .header__navigation a").click(function (event) {
    $(".header__navigation").slideUp(100);
  });

  /*------------------------------------*\
		Smooth Scroll
	\*------------------------------------*/

  $(".js-smooth-scroll").click(function (event) {
    event.preventDefault();

    var ThisHref = $(this).attr("href");
    //var HeaderHeight = $(".header").height();

    $(ThisHref).velocity("scroll", {
      duration: 1500,
      //offset: -HeaderHeight,
      easing: "ease",

      begin: function () {
        $(window).on("mousewheel", function (event) {
          return false;
        });
      },

      complete: function () {
        $(window).off("mousewheel");
      },
    });

    window.location.hash = ThisHref;
  });

  /*------------------------------------*\
		Hat tip
	\*------------------------------------*/
  $(".header__title-wrapper").hover(function (event) {
    $(".hero__hat").toggleClass("hero__hat--tip");
  });

  $(".hero__title-small").hover(function (event) {
    $(".hero__hat").toggleClass("hero__hat--tip");
  });
});


/*------------------------------------*\
		            3D card
	\*------------------------------------*/

let calculateAngle = function(e, item, parent) {
  let dropShadowColor = `rgba(0, 0, 0, 0.3)`
  if(parent.getAttribute('data-filter-color') !== null) {
      dropShadowColor = parent.getAttribute('data-filter-color');
  }

  parent.classList.add('animated');
  // Get the x position of the users mouse, relative to the button itself
  let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
  // Get the y position relative to the button
  let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

  // Calculate half the width and height
  let halfWidth  = item.getBoundingClientRect().width / 2;
  let halfHeight = item.getBoundingClientRect().height / 2;

  // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
  // Changing these numbers will change the depth of the effect.
  let calcAngleX = (x - halfWidth) / 14;
  let calcAngleY = (y - halfHeight) / 6;

  let gX = (1 - (x / (halfWidth * 2))) * 100;
  let gY = (1 - (y / (halfHeight * 2))) * 100;

  item.querySelector('.glare').style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243), transparent)`;
  // And set its container's perspective.
  parent.style.perspective = `${halfWidth * 6}px`
  item.style.perspective = `${halfWidth * 6}px`

  // Set the items transform CSS property
  item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
  parent.querySelector('.inner-card-backface').style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04) translateZ(-4px)`;

  if(parent.getAttribute('data-custom-perspective') !== null) {
      parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
  }

  // Reapply this to the shadow, with different dividers
  let calcShadowX = (x - halfWidth) / 3;
  let calcShadowY = (y - halfHeight) / 6;
  
  // Add a filter shadow - this is more performant to animate than a regular box shadow.
  item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
}

document.querySelectorAll('.card').forEach(function(item) {
  if(item.querySelector('.flip') !== null) {
    item.querySelector('.flip').addEventListener('click', function() {
      item.classList.add('flipped');
    });
  }
  if(item.querySelector('.unflip') !== null) {
    item.querySelector('.unflip').addEventListener('click', function() {
      item.classList.remove('flipped');
    });
  }
  item.addEventListener('mouseenter', function(e) {
      calculateAngle(e, this.querySelector('.inner-card'), this);
  });

  item.addEventListener('mousemove', function(e) {
      calculateAngle(e, this.querySelector('.inner-card'), this);
  });

  item.addEventListener('mouseleave', function(e) {
      let dropShadowColor = `rgba(0, 0, 0, 0.3)`
      if(item.getAttribute('data-filter-color') !== null) {
          dropShadowColor = item.getAttribute('data-filter-color')
      }
      item.classList.remove('animated');
      item.querySelector('.inner-card').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
      item.querySelector('.inner-card-backface').style.transform = `rotateY(0deg) rotateX(0deg) scale(1.01) translateZ(-4px)`;
      item.querySelector('.inner-card').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
  });
})

/*canavas*/

// Find all elements with the class "inner-content"
var innerContents = document.querySelectorAll('.inner-content');


if(innerContents){
  // Loop through each inner content element
  innerContents.forEach((innerContent, index) => {
    var particlesDiv = document.createElement('div');
    particlesDiv.id = 'particles-js' + (index + 1);
    particlesDiv.classList.add('particles-js');
    
    // Append the particles div to the current inner content element
    innerContent.appendChild(particlesDiv);
  });
  
  document.querySelectorAll('.card-back-side-text').forEach((data) => {
     data.innerHTML = data.innerHTML.slice(0, 150) + '...';
  })
}

const projectRedirectionBtns = document.querySelectorAll('.project-redirection');

projectRedirectionBtns.forEach((btn) => {
  btn.addEventListener('click', (event)=> {
    event.preventDefault();
    console.log(btn.getAttribute('projectId'))
    window.location.href = "/projects/"+btn.getAttribute('projectId');
  })
})


/*--------Show username from link-----------*/

const contactIconDescription = document.querySelectorAll(".contact__icon-description");
const contactIconsLink = document.querySelectorAll('.contact__icon a');
contactIconDescription[1].innerHTML  = contactIconsLink[1].getAttribute('href').split("/")[3]
contactIconDescription[2].innerHTML = contactIconsLink[2].getAttribute('href').split("/")[3]






