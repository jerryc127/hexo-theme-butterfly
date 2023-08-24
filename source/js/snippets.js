((container) => {
    container = document.querySelector(container);

    function layout(container) {
        let containerWidth = container.offsetWidth;
        container.style.position = 'relative';

        let items = container.children;
        let itemWidth = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginLeft) + parseFloat(getComputedStyle(items[0]).marginRight);
        let itemWidthWithoutMarginRight = items[0].offsetWidth + parseFloat(getComputedStyle(items[0]).marginLeft);
        let columns = Math.floor(containerWidth / itemWidth);
        if (containerWidth % itemWidth >= itemWidthWithoutMarginRight) {
            columns += 1;
        }

        let columnHeights = [];
        for (let i = 0; i < columns; i++) {
            columnHeights[i] = 0;
        }

        for (let i = 0; i < items.length; i++) {
            let columnIndex = 0;
            let minColumnHeight = columnHeights[0];
            for (let j = 1; j < columnHeights.length; j++) {
                if (columnHeights[j] < minColumnHeight) {
                    columnIndex = j;
                    minColumnHeight = columnHeights[j];
                }
            }

            items[i].style.position = 'absolute';
            items[i].style.top = minColumnHeight + 'px';
            items[i].style.left = (columnIndex * itemWidth) + 'px';

            columnHeights[columnIndex] += items[i].offsetHeight + parseFloat(getComputedStyle(items[i]).marginTop) + parseFloat(getComputedStyle(items[i]).marginBottom);
        }

        let maxHeight = Math.max.apply(null, columnHeights);
        container.style.height = maxHeight + 'px';
    }

    window.addEventListener('resize', function() {
        layout(container);
    });
    window.addEventListener('load', function() {
        layout(container);
    });

    layout(container);
})("#snippets");
((elementId) => {
    const element = document.getElementById(elementId);

    const timeTags = element.getElementsByTagName('time');
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentDay = now.toISOString().split('T')[0];

    for (let i = 0; i < timeTags.length; i++) {
        const tag = timeTags[i];
        const datetimeStr = tag.getAttribute('datetime');
        if (!datetimeStr) {
            continue;
        }

        const datetime = new Date(datetimeStr);
        const year = datetime.getFullYear();
        const month = datetime.getMonth() + 1;
        const day = datetime.getDate();
        const hours = datetime.getHours();
        const minutes = datetime.getMinutes();

        if (datetimeStr > now.toISOString()) {
            tag.innerHTML = `${year}/${month}/${day}`;
        } else if (datetimeStr.startsWith(currentDay)) {
            tag.innerHTML = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        } else if (year === currentYear) {
            tag.innerHTML = `${month}/${day}`;
        } else {
            tag.innerHTML = `${year}/${month}/${day}`;
        }
    }
})("snippets");