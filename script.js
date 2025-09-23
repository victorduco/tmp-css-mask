// Простая инициализация без интерактивности
document.addEventListener('DOMContentLoaded', () => {
    console.log('CSS маски с анимациями загружены');

    // Проверка поддержки CSS масок
    const testElement = document.createElement('div');
    const supportsWebkitMask = 'webkitMask' in testElement.style;
    const supportsMask = 'mask' in testElement.style;

    if (!supportsWebkitMask && !supportsMask) {
        console.warn('CSS маски не поддерживаются в этом браузере');

        // Показать уведомление пользователю
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff6b6b;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        warning.textContent = '⚠️ Ваш браузер не поддерживает CSS маски. Используйте современный браузер.';
        document.body.appendChild(warning);

        return;
    }

    // Уведомление об успешной загрузке
    const success = document.createElement('div');
    success.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0.9;
        transition: opacity 0.3s ease;
    `;
    success.innerHTML = '✨ CSS маски работают!<br>📱 Скролл работает нормально';
    document.body.appendChild(success);

    // Автоскрытие уведомления
    setTimeout(() => {
        success.style.opacity = '0';
        setTimeout(() => success.remove(), 300);
    }, 3000);
});