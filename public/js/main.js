(function(){

    //render
    var render = function(obj) {
        str = ''
        for (el in obj) {
            var rang = obj[el].rang;
            var id = obj[el].id;
            str+= `<li class="collection-item dismissable">
                <div>
                    ${rang}
                    <a href="#!" class="secondary-content delete_rang" id=${id}><i class="material-icons">power_settings_new</i></a>
                    <a href="#!" class="secondary-content edit_rang" name=${rang} id=${id}><i class="material-icons">mode_edit</i></a>
                </div>
            </li>`
        }
        $('.rangs_container').append(str);
        $('.delete_rang').on('click', _delete);
        $('.edit_rang').on('click', _edit);
    }

    function _edit() {
        var rang = $(this).attr('name');
        var id = $(this).attr('id');
        console.log($(this).attr('name'));
        $('#rang_name_edit').val(rang);
        $('#id_rang_edit').val(id);
        $('#edit_rang').modal('open');
    }

    //requests
    $.get( "rangs/", function( data ) {
      console.log(data);
      render(data);
    });

    $('.modal').modal();

    $('.add_rangs').on('click', ()=>{
        $('#modal1').modal('open');
    })

    $('.form__add_rang').on('submit', function(event){
        event.preventDefault();
        $('.submit_rang').addClass('disabled');
        $.ajax({
            type: 'POST',
            url: 'rangs/',
            data: $(this).serialize(),
            success: function(data){
              location.reload();
            }
        });
    })

    function _delete() {
        var data = {
            'id': $(this).attr('id')
        }
        $.ajax({
            type: 'DELETE',
            url: 'rangs/',
            data: data,
            success: function(data){
              location.reload();
            }
        });
    }

    $('.form__edit_rang').on('submit', function(){
        event.preventDefault();
        $('.submit_rang_edit').addClass('disabled');
        console.log($(this).serialize());
        $.ajax({
            type: 'PUT',
            url: 'rangs/',
            data: $(this).serialize(),
            success: function(data){
              location.reload();
            }
        });

    })

})();
