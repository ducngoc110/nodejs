$(document).ready(function(){ 
    "use strict";

    var ATL_BACKEND_USER = {

        init () {
            this.handleNotify();
            this.manageSearch();
            this.manageRemove();
        },

        handleNotify () {
            let notify = $('.atl-notify');
            if (notify.length > 0) {
                let time = 800;
                $.each(notify, ( index, value ) => {
                    setTimeout(() =>  {
                        $(value).fadeOut();
                    }, time);
                    time += 600;
                });
            }
        },

        manageSearch () {
            $('.atl-user-manage-search').keyup((e) => {
                let input = $(e.currentTarget).val();
                let data  = { input };
                altair_helpers.content_preloader_show();
                // Send to server handle.
                $.post('/user-manage-search', data).then((html) => {
                    altair_helpers.content_preloader_hide();
                    $('.atl-list-user-js').html(html);
                    $('.atl-list-user-not-js').remove();
                });
                return false;
            });
        },

        manageRemove () {

        },
    };

    ATL_BACKEND_USER.init();
});