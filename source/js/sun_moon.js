function switchNightMode() {
    document
        .querySelector("body")
        .insertAdjacentHTML(
            "beforeend",
            '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>'
        ),
        setTimeout(function () {
            document.querySelector("body").classList.contains("DarkMode")
                ? (document.querySelector("body").classList.remove("DarkMode"),
                    localStorage.setItem("isDark", "0"),
                    document
                        .getElementById("modeicon")
                        .setAttribute("xlink:href", "#icon-moon"))
                : (document.querySelector("body").classList.add("DarkMode"),
                    localStorage.setItem("isDark", "1"),
                    document
                        .getElementById("modeicon")
                        .setAttribute("xlink:href", "#icon-sun")),
                setTimeout(function () {
                    document.getElementsByClassName(
                        "Cuteen_DarkSky"
                    )[0].style.transition = "opacity 3s";
                    document.getElementsByClassName("Cuteen_DarkSky")[0].style.opacity =
                        "0";
                    setTimeout(function () {
                        document.getElementsByClassName("Cuteen_DarkSky")[0].remove();
                    }, 1e3);
                }, 2e3);
        });

    const willChangeMode =
        document.documentElement.getAttribute("data-theme") === "dark"
            ? "light"
            : "dark";

    if (willChangeMode === "dark") {
        btf.activateDarkMode();
        btf.saveToLocal.set("theme", willChangeMode, 2);
        // Snackbar 提示
        // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
        document.getElementById("modeicon").setAttribute("xlink:href", "#icon-sun");
    } else if (willChangeMode === "light") {
        btf.activateLightMode();
        btf.saveToLocal.set("theme", willChangeMode, 2);
        document.querySelector("body").classList.add("DarkMode");
        document
            .getElementById("modeicon")
            .setAttribute("xlink:href", "#icon-moon");
    }
    // 其他场景处理（评论组件等）
    if (typeof utterancesTheme === "function") utterancesTheme();
    if (typeof FB === "object") window.loadFBComment();
    if (
        window.DISQUS &&
        document.getElementById("disqus_thread").children.length
    ) {
        setTimeout(() => window.disqusReset(), 200);
    }
}
