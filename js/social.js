function shareTwitter() {
    var url = encodeURIComponent(window.location.href);
    var text = encodeURIComponent(document.title);
    window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank');
}

function shareWhatsApp() {
    var url = encodeURIComponent(window.location.href);
    window.open('https://wa.me/?text=' + url, '_blank');
}

function shareFacebook() {
    var url = encodeURIComponent(window.location.href);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
}

function sharePinterest() {
    var url = encodeURIComponent(window.location.href);
    var image = encodeURIComponent('imgs/share-img.png');
    window.open('https://pinterest.com/pin/create/button/?url=' + url + '&media=' + image, '_blank');
}

function shareLinkedIn() {
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    window.open('https://www.linkedin.com/shareArticle?url=' + url + '&title=' + title, '_blank');
}

function shareEmail() {
    var subject = encodeURIComponent('¡Mirá esto!');
    var body = encodeURIComponent('Encontré esta página y pensé que podía interesarte: ' + window.location.href);
    window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}