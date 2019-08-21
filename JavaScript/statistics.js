var app2 = new Vue({
  el: '#app2',
  data:{
   members: [],
   statistics:{}
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
  app2.members = json.results[0].members;
  app2.statistics = stats();
  $(document).ready( function () {
    $('.table').DataTable( {
      columnDefs: [
        { "width": "20%", "targets": [0,1,2] }
      ],
      order: [],
      ordering: false,
      bInfo: false,
      searching: false,
      responsive: true,
      scrollY: 300,
      scrollX: false,
      paging: false,
      fixedHeader: {
        header: true,
        footer: false
      }
    } );
  } );
}).catch(function(error) {
  console.log( "Request failed: " + error.message );
});


function stats(){
  var statistics = new Object();
  var D = [], R = [], I = [], members = app2.members;

  app2.members.forEach(filterParty);

  statistics.noD =D.length;
  statistics.noR = R.length;
  statistics.noI = I.length;
  statistics.noTotal = members.length;
  statistics.AvrgVWPTotal = Average(members);
  statistics.AvrgVWPD = Average(D);
  statistics.AvrgVWPR = Average(R);
  statistics.AvrgVWPI = Average(I);
  statistics.leastLoyal = makeStatics (members, 10,'votes_with_party_pct',1 );
  statistics.mostLoyal = makeStatics (members, 10,'votes_with_party_pct',-1 );
  statistics.leastEngage = makeStatics (members, 10,'missed_votes_pct',-1 );
  statistics.mostEngage = makeStatics (members, 10,'missed_votes_pct',1 );

  function filterParty (member){
    if (member.party == "D")
      D[D.length] = member;
    else if (member.party == "R")
      R[R.length] = member;
    else
      I[I.length] = member;
  }

  function Average (members){
    var sum = 0;
    members.map( function (member){
      sum += member.votes_with_party_pct;
    })
    if(members.length == 0)
      return 0;
    else
      return roundToTwo(sum/members.length);
  }

  function makeStatics (arr, perctg, prop, direction) {
    arr = arr.sort(propComparator(prop, direction)); 
    var i = Math.round([(perctg * arr.length)/100] - 1);
    for ( i; arr[i][prop] == arr[i+1][prop]; i++);
    return arr = arr.slice(0, i+1);
  }

  function propComparator(prop, direction) {
      return function(a, b) {
          return direction*(a[prop] - b[prop]);
      }
  }

  function roundToTwo(num) {    
      return +(Math.round(num + "e+2")  + "e-2");
  }

  return statistics;
}