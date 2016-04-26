/**
 * Created by Amr Abd Elrhim on 18/04/2016.
 */

jQuery(function ($) {
    $('.scroll_top').on("click", function (e) {
        e.preventDefault();
        var hd_height = $('.header').height();
        $('body,html').animate({scrollTop: $($(this).attr('href')).offset().top - hd_height}, 2000);
    });
    $('ul.menu_top').length > 0 && $('ul.menu_top').slicknav({label: '', 'closeOnClick': true});
});