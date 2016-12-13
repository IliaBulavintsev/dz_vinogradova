(function(){
    $('.modal').modal();
    $('.m').on('click', function(){
        $('.teal').removeClass('teal lighten-5');
        $(this).addClass('teal lighten-5');
        $('.showen').removeClass('showen').addClass('hidden');
        $('.m_block').addClass('showen');
    });

    $('.t').on('click', function(){
        $('.teal').removeClass('teal lighten-5');
        $(this).addClass('teal lighten-5');
        $('.showen').removeClass('showen').addClass('hidden');
        $('.t_block').addClass('showen');
    });

    $('.w').on('click', function(){
        $('.teal').removeClass('teal lighten-5');
        $(this).addClass('teal lighten-5');
        $('.showen').removeClass('showen').addClass('hidden');
        $('.w_block').addClass('showen');
    });

    $('.th').on('click', function(){
        $('.teal').removeClass('teal lighten-5');
        $(this).addClass('teal lighten-5');
        $('.showen').removeClass('showen').addClass('hidden');
        $('.th_block').addClass('showen');
    });

    $('.f').on('click', function(){
        $('.teal').removeClass('teal lighten-5');
        $(this).addClass('teal lighten-5');
        $('.showen').removeClass('showen').addClass('hidden');
        $('.f_block').addClass('showen');
    });

    var render = function(data) {
        for (k in data){
            console.log(k);
            var toapp = $(`.${k}_table`);
            console.log(data[k]);
            (data[k]).forEach((el)=>{
                console.log(el);
                var str = `<tr><td>${el['fname']} ${el['lname']}</td>`;
                str += `<td>${el['from']}</td>`;
                str += `<td>${el['to']}</td>`;
                str += `<td>
                    <a href="#!" class="edit_plan" table="${k}" id="${el['id']}" fl="${el['fname']} ${el['lname']}" from="${el['from']}" to="${el['to']}"><i class="material-icons">mode_edit</i></a>
                </td>`
                str += `<td>
                    <a href="#!" class="del_plan" table="${k}" id="${el['id']}"><i class="material-icons">power_settings_new</i></a>
                </td></tr>`
                toapp.append(str);
            })
        }

    };

    $.get( "plan/", function( data ) {
      console.log(data);
      render(data);
      $('.del_plan').on('click', _del);
      $('.edit_plan').on('click', function(){
          var id = $(this).attr('id');
          var from = $(this).attr('from');
          var to = $(this).attr('to');
          $('#id').val($(this).attr('id'));
          $('#from').val($(this).attr('from'));
          $('#to').val($(this).attr('to'));
          $('#fl').val($(this).attr('fl'));
          $('#plan_edit').modal('open');
      })
    });

    function _del(){
        var data = {'id': $(this).attr('id'), table: $(this).attr('table')};
        console.log(data);
        $.ajax({
            type: 'DELETE',
            url: 'plan/',
            data: data,
            success: function(data){
              location.reload();
            }
        });
    }



})()
