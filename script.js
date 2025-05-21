document.addEventListener('DOMContentLoaded', function() {
    // Add target="external" to every external link
    let links = document.querySelectorAll('a[href^="http"]');
    links.forEach(function(link) {
        link.setAttribute('target', 'abc');
    });
});