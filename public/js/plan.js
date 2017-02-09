(function(){
    $('.modal').modal();
    $('.p').on('click', ()=>{
        $('.menu').hide();
        window.print();
        // $('.showen ').printThis();
        $('.menu').show();
    });
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

    var render = function(data, workers) {
        for (k in data){
            console.log(k);
            var toapp = $(`.${k}_table`);
            // console.log(data[k]);
            (data[k]).forEach((el)=>{
                // console.log(el);
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
        str = '';
        for (worker in workers){
            str += `<option value=${workers[worker]['id']}>${workers[worker]['fname']} ${workers[worker]['lname']}</option>`;
        }
        $('.select_add_plan_worker').append(str);
        $('.select_add_plan_worker').change();
        $('.select_add_plan_worker').material_select();

    };

    $.get( "plan/", function( data ) {
      console.log(data);
      var workers = data['workers'];
      delete data['workers'];
      console.log(workers);
      render(data, workers);
      $('select').material_select();
      $('.a').on('click', ()=>{
          $('#add_plan').modal('open');
      });
      $('.del_plan').on('click', _del);
      $('.edit_plan').on('click', function(){
        //   var id = $(this).attr('id');
        //   var from = $(this).attr('from');
        //   var to = $(this).attr('to');
          $('#id').val($(this).attr('id'));
          $('#from').val($(this).attr('from'));
          $('#to').val($(this).attr('to'));
          $('#fl').val($(this).attr('fl'));
          $('#table').val($(this).attr('table'));
          $('#plan_edit').modal('open');
      });
      $('.form__add_plan').on('submit', function(event){
          event.preventDefault();
          console.log($(this).serialize());
          $.ajax({
              type: 'POST',
              url: 'plan/',
              data: $(this).serialize(),
              success: function(data){
                //   console.log(data);
                //   if (data == 'OK'){
                  location.reload();
                //   }
              }
          });
      });
      $('.form__plan_edit').on('submit', function(event){
          event.preventDefault();
          console.log($(this).serialize());
          $.ajax({
              type: 'PUT',
              url: 'plan/',
              data: $(this).serialize(),
              success: function(data){
                //   console.log(data);
                //   if (data == 'OK'){
                  location.reload();
                //   }
              }
          });
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
