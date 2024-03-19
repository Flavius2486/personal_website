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
  
  });
