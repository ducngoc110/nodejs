$(document).ready(function(){ 
    "use strict";

    var ATL_BACKEND_TOUR = {

        init () {
            this.handleNotify();
            this.manageSearch();
            this.manageRemove();

            this.addHighlight();
            this.deleteHighlight();
            this.addItinerary();
            this.addQuestion();
            this.deleteFeatured();
            this.deleteGallery();
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
            $('.atl-tour-manage-search-js').keyup((e) => {
                let input = $(e.currentTarget).val();
                let data  = { input };
                altair_helpers.content_preloader_show();
                // Send to server handle.
                $.post('/tour-manage-search', data).then((html) => {
                    altair_helpers.content_preloader_hide();
                    $('.atl-list-tour-js').html(html);
                    $('.atl-list-tour-not-js').remove();
                });
                return false;
            });
        },

        manageRemove () {
            $('.uk-table').on('click', '.atl-manage-tour-delete', function(e){
                let item = $(e.currentTarget);
                let id   = item.attr('data-id');
                let data = { id };
                altair_helpers.content_preloader_show();
                $.post('/tour-manage-remove', data, (result) => {
                    if (result) {
                        altair_helpers.content_preloader_hide();
                        item.closest('tr').remove();
                        UIkit.modal.alert('Delete Success!');
                    }
                });
                return false;
            })
        },

        addHighlight () {
            $('.tour-highlight-add-js').click((e) => {
                let key = window.ATLLIB.makeid();
                let output = `<div class="uk-input-group tour-highlight-item-js">
                    <div class="md-input-wrapper">
                        <input type="text" class="md-input" name="highlight[${key}]" placeholder="Type title highlight...">
                        <span class="md-input-bar"></span>
                    </div>
                    <span class="uk-input-group-addon">
                        <a class="tour-highlight-delete-js"><i class="uk-icon-remove uk-icon-small"></i></a>
                    </span>
                </div>`;
                let listW = $(e.currentTarget).closest('.tour-highlight-wrap-js').find('.tour-highlight-list-js');
                listW.append(output);
                return false;
            });
        },
        deleteHighlight () {
            $('.tour-highlight-list-js').on('click', '.tour-highlight-delete-js', (e) => {
                let listW = $(e.currentTarget).closest('.tour-highlight-item-js').remove();
                return false;
            });
        },
        addItinerary () {
            $('.tour-itinerary-add-js').click((e) => {
                let key = window.ATLLIB.makeid();
                let output = `<h3 class="uk-accordion-title">&nbsp;</h3>
                <div class="uk-accordion-content" style="padding-top: 0px;padding-left: 48px;">
                    <div class="uk-width-medium-1-1 uk-margin-bottom">
                        <div class="md-input-wrapper">
                            <label>Title</label>
                            <input type="text" class="md-input" name="itinerary[${key}][title]" value="" />
                        </div>
                    </div>
                    <div class="uk-width-medium-1-1">
                        <div class="md-input-wrapper">
                            <label>Content</label>
                            <textarea class="md-input" name="itinerary[${key}][content]" cols="30"
                            rows="4"></textarea>
                        </div>
                    </div>
                </div>`;
                let listW = $(e.currentTarget).closest('.tour-itinerary-wrap-js').find('.tour-itinerary-list-js');
                listW.append(output);
                return false;
            });
        },
        addQuestion () {
            $('.tour-question-add-js').click((e) => {
                let key = window.ATLLIB.makeid();
                let output = `<h3 class="uk-accordion-title">&nbsp;</h3>
                <div class="uk-accordion-content" style="padding-top: 0px;padding-left: 48px;">
                    <div class="uk-width-medium-1-1 uk-margin-bottom">
                        <div class="md-input-wrapper">
                            <label>Question</label>
                            <input type="text" class="md-input" name="question[${key}][question]" value="" />
                        </div>
                    </div>
                    <div class="uk-width-medium-1-1">
                        <div class="md-input-wrapper">
                            <label>Answer</label>
                            <textarea class="md-input" name="question[${key}][answer]" cols="30"
                            rows="4"></textarea>
                        </div>
                    </div>
                </div>`;
                let listW = $(e.currentTarget).closest('.tour-question-wrap-js').find('.tour-question-list-js');
                listW.append(output);
                return false;
            });
        },
        deleteFeatured () {
            $('.tour-featured-delete-js').click((e) => {
                $(e.currentTarget).closest('div').remove();
                return false;
            });
        },
        deleteGallery () {
            $('.tour-gallery-delete-js').click((e) => {
                $(e.currentTarget).closest('li').remove();
                return false;
            });
        },
    };

    ATL_BACKEND_TOUR.init();
});