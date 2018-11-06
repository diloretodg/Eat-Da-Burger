// $(()=>{
//   usePartial();
//   displayPage();
//   setupEventHandlers();
// });

// function usePartial(name, partialId) {
//   let partialTemplate = $(partialId).text();
//   Handlebars.registerPartial(name, partialTemplate);
// }

// function displayPage(){
//   $.get("/api/burgers/").then((burgers)=>{
//       renderTemplate({burgers: burgers});
//   });
// }

// function renderTemplate(data) {
//     var source = $("#handlebars-template").text();
//     var template = Handlebars.compile(source);
//     var html = template(data);
//     $("#app").html(html);
//   }

// function setupEventHandlers(){
//   $(document).on("click", "#inputButton", (event)=>{
//       if ($("#burger-input").val() == "") return;
//       else inputClickOrEnterPress();
//   });

//   $(document).on("keyup", "#burger-input", (event)=>{
//       if ((event.keyCode === 13) && ($("#inputBurgerName").val()!== "")) {
//           ClickOrEnter();
//       }
//   });
  
//   function ClickOrEnter(){
//       var burgerName = $("#burger-input").val().trim();
//       var newBurger = {
//           name: burgerName,
//           eaten: false
//       }
//       $("#burger-input").val("");
//       $.ajax("/api/burgers/", {type: "POST", data: newBurger}).then(()=>{
//           displayPage();
//       });
//   }

//   //On clicking devour, sends the bugers id and new state to the server
//   $(document).on("click", "DevourButton", function(){
//       var id = this.getAttribute("data-id");
//       var isEaten = this.getAttribute("data-isEaten");

//       if (isEaten == "false") isEaten = true;
//       else isEaten = false;
//       var newBurgerState = {
//           eaten: isEaten
//       }
//       $.ajax("/api/burgers/" + id, {type: "PUT", data: newBurgerState}).then(()=>{
//           displayPage();
//       });
//   });

//   //On clicking the main burger image, changes state of all burgers back to false
//   $(document).on("click", "#logo_burger", function(){

//       $.get("/api/burgers/resetBase").then((res)=>{
//           displayPage();
//       });
//   });
// }



// ////////////////////////////

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    displayPage();
    setupEventHandlers();
  });
  
  function displayPage() {
    // Send the GET request.
    $.get("/api/burgers/").then(
      function(burgers) {
        renderTemplate({burger_data: burgers});
      }
    );
  }
  
  function renderTemplate(data) {
    var source = $("#handlebars-template").text();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#app").html(html);
  }
  
  function setupEventHandlers() {
    $(document).on("submit", ".devour-form", function(event) {
      event.preventDefault();
  
      var burger_id = $(this).children(".burger_id").val();
      console.log(burger_id);
      $.ajax("/api/burgers/" + burger_id, {
        type: "PUT"
      }).then(function(data) {
        // Rerender the page with the updated list
        displayPage();
      });
  
    });
  
    $(document).on("submit", ".create-form", function(event) {
      event.preventDefault();
  
      var burgerName = $(this).children(".form-control").val();
      console.log(burgerName);
      $.ajax("/api/burgers/", {
        type: "POST",
        data: { burger: burgerName }
      }).then(function(data) {
        // Rerender the page with the updated list
        displayPage();
      });
  
    });
  };
  