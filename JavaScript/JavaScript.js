var app2 = new Vue({
  el: '#app2',
  data:{
   members: [],
   states:[],
   selectedState: ["all"],
   partyCheck:["R","D","I"],
  }
})


//X-API-Key: Y0VxUuXEZKE8G7jcFhlpDIbQQX3caqXgQFc9sJqS;
var senate = 'https://api.propublica.org/congress/v1/113/senate/members.json';
var house = 'https://api.propublica.org/congress/v1/113/house/members.json';

var myHeaders = new Headers();
myHeaders.append('X-API-Key', 'Y0VxUuXEZKE8G7jcFhlpDIbQQX3caqXgQFc9sJqS');

var myInit = { method: 'GET',
               headers: myHeaders};
               
               
if(document.getElementById('senate')){
  var myRequest = new Request(senate, myInit);
}
else if (document.getElementById('house')){
  var myRequest = new Request(house, myInit);
}

$('.ajax-loader').css("display", "block");
fetch( myRequest).then(function(response) {
  if (response.ok) {
    return response.json(); 
  }
  throw new Error(response.statusText);
}).then(function(json) {
    $('.toHide').css("display", "table-row-group");
    $('.ajax-loader, .ajax-loader img').css("display", "none");
    app2.members = json.results[0].members.sort(function(a,b) {if (a.first_name > b.first_name) return 1; else return -1});
    app2.states = json.results[0].members.map(member => member.state).sort()
    app2.states = app2.states.filter((v,i)=> app2.states.indexOf(v)===i)
    $(document).ready( function () {
      $('.table').DataTable( {
        columnDefs: [
          { "width": "20%", "targets": [1,2,3, 4] }
        ],
        bInfo: false,
        responsive: true,
        scrollY: 300,
        scrollX: false,
        paging: false,
        fixedHeader: {
          header: true,
          footer: false
        },
      } );
    } );
}).catch(function(error) {
  console.log( "Request failed: " + error.message );
});