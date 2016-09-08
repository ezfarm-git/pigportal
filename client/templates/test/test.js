Template.test.onRendered(function() {
  var wait;
  function loadingSpin() {
    wait = setTimeout(showPage, 1000);
  }
  loadingSpin();
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("chartbox").style.display = "block";
  }
});
