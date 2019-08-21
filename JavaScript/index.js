
Vue.component('barra-nav', {
  template: `
  <div>
  <nav class="navbar navbar-expand-lg barra-navegacion sticky-top navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item dropdown active">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Congress 113
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="house-data.html">House</a></li>                  
          <li><a class="dropdown-item" href="senate-data.html">Senate</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown active">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Attendance
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="house-attendance.html">House</a></li>                  
          <li><a class="dropdown-item" href="senate-attendance.html">Senate</a></li>
        </ul>
      </li>
      <li class="nav-item dropdown active">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Party Loyalty
        <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="house-party-loyalty.html">House</a></li>                  
          <li><a class="dropdown-item" href="senate-party-loyalty.html">Senate</a></li>
        </ul>
      </li>
    </ul>
    </div>
</nav>
</div>
   `
})

Vue.component('encabezado',{
  template:
  `<header>
  <div class="row encabezado justify-content-between">
    <a class=" col-2"  href="index.html"><img class="logo" src="css/TGIF.png" alt="TGIF logo" ></a>
    <h1 class=" col-8 align-middle">TGIF: Transparent Government in Fact</h1>
    <a class="col-2 text-right mailto" href="mailto:info@tgif.net">info@tgif.net</a>
  </div>
</header>`
})

var app = new Vue({
  el: '#app',
  data:{
   
  }
})
