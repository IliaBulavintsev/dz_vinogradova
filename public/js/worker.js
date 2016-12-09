(function(){

    //render
    var render = function(obj, rangs, opt) {
        str = ''
        for (var el in obj) {
            var fname = obj[el].fname;
            var lname = obj[el].lname;
            var id = obj[el].id;
            str += `<li>
              <div class="collapsible-header">
                  ${lname} ${fname}
              </div>
              <div class="collapsible-body">
              <a class="secondary-content waves-effect waves-light btn red delete_worker" id=${id}>Удалить</a>
              <a class="secondary-content waves-effect waves-light btn yellow darken-1 edit_worker" id=${id} fname=${fname} lname=${lname}>Редактировать</a>
                <div class="about_worker">
                  <p>
                      <span class="red-text text-darken-2">Должности</span>
                      <a class="btn-tiny waves-effect waves-light btn_worker_add_rang" id=${id}><i class="material-icons">add</i></a>
                      <ul class="collection">
                          <li class="collection-item dismissable">`;
              for (var r in rangs[id]){
                  var i = parseInt(r)+1;
                  str += `
                      <div>
                          ${i}) ${rangs[id][r]['rang']} ${rangs[id][r]['hours']} часов
                          <a href="#!" class="secondary-content delete_worker_rang" id="${rangs[id][r]['id']}"><i class="material-icons">power_settings_new</i></a>
                          <a href="#!" class="secondary-content edit_worker_rang" id="${rangs[id][r]['id']}" r_id="${rangs[id][r]['r_id']}" rang="${rangs[id][r]['rang']}" hours="${rangs[id][r]['hours']}"><i class="material-icons">mode_edit</i></a>
                      </div>
                  `;
              }

            str +=` </li>
                      </ul>
                  </p>
                  </div>
              </div>
            </li>`
        }
        str+= `<!-- Modal Structure -->
        <div id="worker_add_rang" class="modal">
          <div class="modal-content">
            <h4>Добавление должности</h4>
            <p>
                <form class="form__worker_add_rang col s12">
                    <div class="row">
                        <div class="input-field col s7">
                            <select required name="rang" class="select_rangs">
                              <option value="" disabled selected>Должность</option>
                              `
                              for(var el in opt){
                                  str+= `<option value=${opt[el]['id']}>${opt[el]['rang']}</option>`;
                              }
                    str+=          `
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s7">
                          <input required min="1" max="40" name="hours" id="hours" type="number" class="validate">
                          <label for="hours">Часы</label>
                        </div>
                    </div>
                    <input id="id_worker_rang" name="id" type="hidden">
                  <button class="btn waves-effect waves-light submit_worker_rang" type="submit" name="action">Добавить
                    <i class="material-icons right">send</i>
                  </button>
                </form>
            </p>
          </div>
        </div>`
        str+= `<!-- Modal Structure -->
        <div id="worker_edit_rang" class="modal">
          <div class="modal-content">
            <h4>Редактирование должности</h4>
            <p>
                <form class="form__worker_edit_rang col s12">
                    <div class="row">
                        <div class="input-field col s7">
                            <select required name="rang" id="edit_select" class="edit_select_rangs">
                              <option value="" disabled selected>Должность</option>
                              `
                              for(var el in opt){
                                  console.log(opt[el]['id']);
                                  str+= `<option value=${opt[el]['id']}>${opt[el]['rang']}</option>`;
                              }
                    str+=          `
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s7">
                          <input required min="1" max="40" value=1 name="hours" id="edit_hours" type="number" class="validate">
                          <label for="hours">Часы</label>
                        </div>
                    </div>
                    <input id="id_edit_wrh" name="id" type="hidden">
                  <button class="btn waves-effect waves-light submit_edit_worker_rang" type="submit" name="action">Изменить
                    <i class="material-icons right">send</i>
                  </button>
                </form>
            </p>
          </div>
        </div>`
        $('.workers_container').append(str);
        $('.modal').modal();
        $('select').material_select();
        $('.delete_worker').on('click', _delete);
        $('.edit_worker').on('click', _edit);
        $('.btn_worker_add_rang').on('click', _show_add_rang)
        $('.form__worker_add_rang').on('submit', function( event ) {
            event.preventDefault();
            // console.log($(this).serialize());
            $('.submit_worker_rang').addClass('disabled')
            $.ajax({
                type: 'POST',
                url: 'worker_rangs/',
                data: $(this).serialize(),
                success: function(data){
                  location.reload();
                }
            });
        });
        $('.form__worker_edit_rang').on('submit', function( event ) {
            event.preventDefault();
            console.log($(this).serialize());
            $('.submit_edit_worker_rang').addClass('disabled')
            $.ajax({
                type: 'PUT',
                url: 'worker_rangs/',
                data: $(this).serialize(),
                success: function(data){
                  location.reload();
                }
            });
        });
        $('.edit_worker_rang').on('click', _edit_worker_rang);
        $('.delete_worker_rang').on('click', _delete_worker_rang);
    }


    function _show_add_rang(){
        var id = $(this).attr('id')
        $('#id_worker_rang').val(id)
        $('#worker_add_rang').modal('open');
    }

    function _edit_worker_rang(){
        var id = $(this).attr('id')
        var hours = $(this).attr('hours')
        var rang = $(this).attr('r_id')
// console.log(rang);
        $('#edit_select').val(rang).change();
        $('#edit_select').material_select();
        $('#edit_hours').val(hours);
        $('#id_edit_wrh').val(id);
        $('#worker_edit_rang').modal('open');
    }

    //requests
    var toapp = [];

    $.get( "rangs/", function( data ) {
      console.log(data);
      toapp = data;
    //   var toapp = $('.select_rangs')
    //   for(var el in data){
    //       toapp.append(`<option value=${data[el]['id']}>${data[el]['rang']}</option>`)
    //   }
    //   console.log(toapp);
    });

    $.get( "workers/", function( data ) {
    //   console.log(data.workers, data);
      render(data.workers, data, toapp);
    });

    $('.form__add_worker').on('submit', function( event ) {
        event.preventDefault();
        $('.submit_worker').addClass('disabled')
        console.log($(this).serialize());
        $.ajax({
            type: 'POST',
            url: 'workers/',
            data: $(this).serialize(),
            success: function(data){
              location.reload();
            }
        });
    })


    function _delete_worker_rang() {
        var data = {
            'id': $(this).attr('id')
        }
        $.ajax({
            type: 'DELETE',
            url: 'worker_rangs/',
            data: data,
            success: function(data){
              location.reload();
            }
        });
    }

    function _delete() {
        var data = {
            'id': $(this).attr('id')
        }
        $.ajax({
            type: 'DELETE',
            url: 'workers/',
            data: data,
            success: function(data){
              location.reload();
            }
        });
    }

    $('.form__edit_worker').on('submit', function(){
        event.preventDefault();
        $('.submit_worker_edit').addClass('disabled');
        console.log($(this).serialize());
        $.ajax({
            type: 'PUT',
            url: 'workers/',
            data: $(this).serialize(),
            success: function(data){
              location.reload();
            }
        });

    })

    function _edit() {
        var lname = $(this).attr('lname');
        var fname = $(this).attr('fname');
        var id = $(this).attr('id');
        console.log($(this).attr('fname'));
        $('#lname_edit').val(lname);
        $('#fname_edit').val(fname);
        $('#id_edit').val(id);
        $('#edit_worker').modal('open');
    }


    $('.modal').modal();
    $('select').material_select();

    //modal forms
    $('.add_worker').on('click', ()=>{
        console.log('click');
        $('#modal1').modal('open');
    })

    $('.btn_worker_add_rang').on('click', ()=>{
        console.log('click');
        $('#worker_add_rang').modal('open');
    })


})();
