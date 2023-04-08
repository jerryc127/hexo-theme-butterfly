/**
 * Music Score
 * {% score %}
 */

'use strict';

function score(args, content) {
    function escapeHtmlTags(s) {
        let lookup = {
            '&': "&amp;",
            '"': "&quot;",
            '\'': "&apos;",
            '<': "&lt;",
            '>': "&gt;"
        };
        return s.replace(/[&"'<>]/g, c => lookup[c]);
    }
    return `<div class="abc-music-sheet">${escapeHtmlTags(content)}</div>`;
}

hexo.extend.tag.register('score', score, {ends: true});
