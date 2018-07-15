// ==UserScript==
// @name         Nerd Fitness completed quests toggler
// @namespace    https://github.com/tobbe
// @version      0.2
// @description  Toggles showing completed quests on the quest page
// @license      MIT
// @author       Tobbe
// @match        https://www.nerdfitness.com/level-up/my-quests/
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        #toggle-completed-quests-container {
            display: inline-block;
        }

        #toggle-completed-quests-container input {
            margin: 0;
        }

        #toggle-completed-quests-container label {
            margin: 0;
        }
    `);

    function htmlToElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstChild;
    }

    function insertToggle() {
        const innerCont = document.querySelectorAll('.fx-inner-cont')[0];
        const toggleHtml = `
            <div id="toggle-completed-quests-container">
                <input type="checkbox" id="toggle-completed-quests" checked>
                <label for="toggle-completed-quests">Include completed</label>
            </div>
        `;
        const toggle = htmlToElement(toggleHtml);
        innerCont.insertBefore(toggle, innerCont.firstChild);
        const checkbox = document.getElementById('toggle-completed-quests');
        checkbox.onclick = event => showCompleted(event.target.checked);
    }

    function showCompleted(shouldShow) {
        const questBlocks = document.querySelectorAll('.quests-quests-block');

        for (const block of questBlocks) {
            const completedStatus = block.querySelector('.quest-head');
            if (completedStatus.classList.contains('q-complete')) {
                block.style.display = shouldShow ? 'block' : 'none';
            }
        }
    }

    unsafeWindow.jQuery(document).ajaxComplete((event, jqXHR, ajaxOptions) => {
        const toggle = document.getElementById('toggle-completed-quests');
        showCompleted(toggle.checked);
    });

    insertToggle();
})();