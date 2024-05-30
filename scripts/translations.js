document.addEventListener('DOMContentLoaded', () => {
    const customSelect = document.querySelector('.custom-select');
    const elementsToTranslate = document.querySelectorAll('[data-key]');
    
    customSelect.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
    });
    
    document.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', () => {
            const selectedOption = option;
            customSelect.querySelector('.custom-option.selected').classList.remove('selected');
            selectedOption.classList.add('selected');
            customSelect.querySelector('.custom-select-trigger span').textContent = selectedOption.textContent;
            
            const language = selectedOption.getAttribute('data-lang');
            loadLanguage(language);
            setCookie('language', language, 30);
        });
    });
    
    const loadLanguage = async (language) => {
        try {
            const response = await fetch(`translations/language-${language}.json`);
            const translations = await response.json();
            
            elementsToTranslate.forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key])
                    element.textContent = translations[key];
            });
            
            customSelect.querySelector('.custom-select-trigger span').textContent = language;
        } catch (error) {
            console.error('Error loading translation:', error);
        }
    };
    
    const defaultLanguage = getCookie('language') || 'en';
    loadLanguage(defaultLanguage);
});

document.addEventListener('click', () => {
    const select = document.querySelector('.custom-select');
    if (select.classList.contains('open'))
        select.classList.remove('open');
});