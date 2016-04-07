define("modules/gallery", ['jquery'], function ($) {

    function getMinions(){
        return $.ajax({
            url: "data/minions.json",
            dataType: "json"
        });
    }

    function renderGallery($minions){

        var $storageMinions = JSON.parse(localStorage.getItem('minions'));
        var $gallery = $('.gallery');
        var $count = 0;

        $minions.forEach(function($item){

            if($storageMinions.hasOwnProperty($item.title)){
                $count = $storageMinions[$item.title];
            } else {
                setCount($item.title);
                $count = 0;
            }

            var $li = '<li class="item" data-title="'+$item.title+'">' +
                '<img src="images/'+$item.img+'" alt="" />'+
                '<span class="counter">'+$count+'</span></li>';

            $gallery.append($li);

        });
    }

    function setCount($key){
        var $storageMinions = JSON.parse(localStorage.getItem('minions'));
        if($storageMinions.hasOwnProperty($key)){
            $storageMinions[$key] += 1;
        } else {
            $storageMinions[$key] = 0;
        }
        localStorage['minions'] = JSON.stringify($storageMinions);

        return $storageMinions[$key];
    }

    function bindCounter(){
        $('li.item').on('click', function(){
            var $title = $(this).data('title');
            $(this).find('.counter').html( setCount($title) );
        });
    }

    function clear(){
        localStorage['minions'] = JSON.stringify({});
    }

    if(!localStorage['minions']){
        clear();
    }

    getMinions().done(function(responce){
        renderGallery(responce);
        bindCounter();

    }).fail(function(error){
        console.log(error);
    });

});