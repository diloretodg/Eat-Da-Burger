

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
  