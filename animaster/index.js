addListeners();

function addListeners() {
    const {
        fadeIn,
        fadeOut,
        move,
        scale,
        moveAndHide,
        showAndHide,
        heartBeating,
    } = animaster();

    document
        .getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            fadeIn(block, 5000);
        });

    document
        .getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            fadeOut(block, 5000);
        });

    document.getElementById('movePlay').addEventListener('click', function () {
        const block = document.getElementById('moveBlock');
        move(block, 1000, { x: 100, y: 10 });
    });

    document.getElementById('scalePlay').addEventListener('click', function () {
        const block = document.getElementById('scaleBlock');
        scale(block, 1000, 1.25);
    });

    document
        .getElementById('moveAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            moveAndHide(block, 1000);
        });

    document
        .getElementById('showAndHide')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            showAndHide(block, 1000);
        });

    document
        .getElementById('heartBeating')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            block.heartBeating = heartBeating(block);
        });

    document
        .getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            block.heartBeating.stop();
        });
}

/**
 * Блок плавно появляется из прозрачного.
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 */

/**
 * Функция, передвигающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param translation — объект с полями x и y, обозначающими смещение блока
 */

/**
 * Функция, увеличивающая/уменьшающая элемент
 * @param element — HTMLElement, который надо анимировать
 * @param duration — Продолжительность анимации в миллисекундах
 * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
 */

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}

function animaster() {
    function fadeIn(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function fadeOut(element, duration) {
        element.style.transitionDuration = `${duration}ms`;
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function move(element, duration, translation) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(translation, null);
    }

    function scale(element, duration, ratio) {
        element.style.transitionDuration = `${duration}ms`;
        element.style.transform = getTransform(null, ratio);
    }

    function moveAndHide(element, duration) {
        const interval = duration * 0.4;

        move(element, interval, { x: 100, y: 20 });
        setTimeout(() => {
            fadeOut(element, duration * 0.6);
        }, interval);
    }

    function showAndHide(element, duration) {
        const interval = duration / 3;

        fadeIn(element, interval);
        setTimeout(() => {
            fadeOut(element, interval);
        }, interval * 2);
    }

    function heartBeating(element) {
        const interval = setInterval(() => {
            scale(element, 500, 1.4);
            setTimeout(() => scale(element, 500, 1), 500);
        }, 1000);

        return {
            stop() {
                clearInterval(interval);
            },
        };
    }

    return {
        fadeIn,
        fadeOut,
        move,
        scale,
        moveAndHide,
        showAndHide,
        heartBeating,
    };
}