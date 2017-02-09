(function(){

    var render = function(obj, rangs, opt) {
        str = ''
        for (var el in obj) {
            var fname = obj[el].fname;
            var lname = obj[el].lname;
            var id = obj[el].id;
            str += `<tr>
              <td>
                  ${lname} ${fname}
              </td>
              <div class="collapsible-body">
                  <p>
                      <span class="red-text text-darken-2">Должности</span>
                      <a class="btn-tiny waves-effect waves-light btn_worker_add_rang" id=${id}><i class="material-icons">add</i></a>
                      <ul class="collection">
                          <li class="collection-item dismissable"><td>`;
              for (var r in rangs[id]){
                  var i = parseInt(r)+1;
                  str += `
                      ${rangs[id][r]['rang']}
                  <br>`;
              }

            str +=`</td><td>`
            for (var r in rangs[id]){
                var i = parseInt(r)+1;
                str += `
                    ${rangs[id][r]['hours']}
                <br>`;
            }
            str += '</td></tr>'
        }

        $('.striped').append(str);
        $('.p').on('click', ()=>{
            $('.menu').hide();
            window.print();
            $('.menu').show();
        })


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

})()
