let isTamil = false;
let translationData = {};

async function loadTranslationData() {
    try {
        const response = await fetch('/event-planner/py/translations.json'); 
        translationData = await response.json();
        console.log('Translation data loaded:', translationData);

        const savedLanguagePreference = localStorage.getItem('isTamil');
        isTamil = savedLanguagePreference === 'true';

        if (isTamil) {
            applyTranslations();
        }
    } catch (error) {
        console.error('Failed to load translation data:', error);
    }
}

function toggleLanguage() {
    const elements = document.querySelectorAll('[data-original]');
    const updates = []; 

    elements.forEach(el => {
        const originalText = el.getAttribute('data-original');
        if (!originalText) return; 

        if (el.tagName.toLowerCase() === 'h3' && el.querySelector('span')) {
            updates.push(() => translateHeadingWithSpan(el, originalText));
        } else {
            updates.push(() => {
                const newText = isTamil
                    ? originalText
                    : translationData[originalText] || originalText;
                updateTextNode(el, newText);
            });
        }
    });

    updates.forEach(update => update());

    isTamil = !isTamil; 

    localStorage.setItem('isTamil', isTamil);
}


function applyTranslations() {
    const elements = document.querySelectorAll('[data-original]');
    elements.forEach(el => {
        const originalText = el.getAttribute('data-original');
        if (!originalText) return; 

        if (el.tagName.toLowerCase() === 'h3' && el.querySelector('span')) {
            translateHeadingWithSpan(el, originalText);
        } else {
            const translatedText = isTamil
                ? translationData[originalText] || originalText
                : originalText;
            updateTextNode(el, translatedText);
        }
    });
}

function translateHeadingWithSpan(element, originalText) {
    const span = element.querySelector('span');
    if (!span) return;

    const nonStyledText = originalText.split('<span>')[0].trim(); 
    const styledText = span.textContent.trim(); 

    if (isTamil) {
        const translatedNonStyled = translationData[nonStyledText] || nonStyledText;
        const translatedStyled = translationData[styledText] || styledText;

        element.firstChild.nodeValue = `${translatedNonStyled} `;
        span.textContent = translatedStyled; 
    } else {
        element.firstChild.nodeValue = `${nonStyledText} `;
        span.textContent = styledText;
    }
}

function updateTextNode(element, newText) {
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
            node.nodeValue = newText;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslationData();

    document.querySelector('#toggle-language-btn')?.addEventListener('click', toggleLanguage);
});
