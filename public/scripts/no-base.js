
document.querySelectorAll("a[data-local]")
    .forEach(a => {
        const ref = a.getAttribute("href");
        a.href = `${location.href}${ref}`
    });