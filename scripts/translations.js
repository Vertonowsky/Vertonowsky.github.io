document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('languageSelector');
    const elementsToTranslate = document.querySelectorAll('[data-key]');

    const loadLanguage = async (language) => {
        try {
            const response = await fetch(`/translations/language-${language}.json`);
            const translations = await response.json();

            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key]) {
                    element.textContent = translations[key];
                }
            });
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    };

    // Load default language
    loadLanguage('en');

    // Change language on flag click
    languageSelector.forEach(flag => {
        flag.addEventListener('click', () => {
            loadLanguage(flag.getAttribute('data-lang'));
        });
    });
});