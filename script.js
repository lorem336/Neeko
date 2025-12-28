function animateValue(obj, start, end, duration, prefix = "", suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentVal;
        if (end % 1 !== 0) {
            currentVal = (progress * (end - start) + start).toFixed(1);
        } else {
            currentVal = Math.floor(progress * (end - start) + start);
        }
        obj.innerHTML = prefix + currentVal + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.innerHTML = prefix + end + suffix;
        }
    };
    window.requestAnimationFrame(step);
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const counterElement = entry.target.querySelector('.counter');
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (counterElement) {
                const target = parseFloat(counterElement.getAttribute('data-target'));
                const prefix = counterElement.getAttribute('data-prefix') || "";
                const suffix = counterElement.getAttribute('data-suffix') || "";
                animateValue(counterElement, 0, target, 2000, prefix, suffix);
            }
        } else {
            entry.target.classList.remove('active');
            if (counterElement) {
                const prefix = counterElement.getAttribute('data-prefix') || "";
                const suffix = counterElement.getAttribute('data-suffix') || "";
                counterElement.innerHTML = prefix + "0" + suffix;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));