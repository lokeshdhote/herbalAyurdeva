function displayTick() {
    var tickBtn = document.getElementById("tickBtn");
    var crossBtn = document.getElementById("crossBtn");
    
    tickBtn.addEventListener("click", function() {
        if (!tickBtn.classList.contains("selected")) {
            tickBtn.classList.add("selected");
            crossBtn.classList.remove("selected");
            tickBtn.style.backgroundColor = "green";
            crossBtn.style.backgroundColor = "";
        }
    });
  }
  function displayCross() {
    var tickBtn = document.getElementById("tickBtn");
    var crossBtn = document.getElementById("crossBtn");
    
    crossBtn.addEventListener("click", function() {
        if (!crossBtn.classList.contains("selected")) {
            crossBtn.classList.add("selected");
            tickBtn.classList.remove("selected");
            crossBtn.style.backgroundColor = "red";
            tickBtn.style.backgroundColor = "";
        }
    });
  }
  
  displayTick();
  
  
  displayCross();
  