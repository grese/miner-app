// Please note that Handlebars helpers will only be found automatically by the
// resolver if their name contains a dash (reverse-word, translate-text, etc.)
// For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html
import Em from 'ember';
export default Em.Handlebars.makeBoundHelper(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
});

