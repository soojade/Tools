function draw() {
    let elts = document.querySelectorAll(".sparkline");
    main: for (let e = 0; e < elts.length; e++) {
        let elt = elts[e];
        // 获取元素内容并转换成一个包含数字的数组，若转换失败，则跳过该元素
        let content = elt.textContent || elt.innerText; // 元素内容
        content = content.replace(/^\s+|\s+$/g, ""); // 去除空客
        let text = content.replace(/#.*$/gm, ""); // 去除注释
        text = text.replace(/[\n\r\t\v\f]/g, " "); // 将\n等转换成空格
        let data = text.split(/\s+|\s*,\s*/); // 以空格或逗号分隔，获取数据
        for (let i = 0; i < data.length; i++) {
            data[i] = Number(data[i]);
            if (isNaN[i]) continue main;
        }

        // 根据数据和元素的data-属性以及元素的计算样式，计算迷你图的颜色、宽度、高度和y轴的范围
        let style = getComputedStyle(elt, null);
        let color = style.color;
        let height = parseInt(elt.getAttribute("data-height")) || parseInt(style.fontSize) || 20;
        let width = parseInt(elt.getAttribute("data-width")) || data.length * (parseInt(elt.getAttribute("data-dx")) || height / 6);
        let ymin = parseInt(elt.getAttribute("data-ymin")) || Math.min.apply(Math, data);
        let ymax = parseInt(elt.getAttribute("data-ymax")) || Math.max.apply(Math, data);
        if (ymin >= ymax) ymax = ymin + 1;

        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.title = content;
        elt.innerHTML = "";
        elt.appendChild(canvas);
        let context = canvas.getContext('2d');
        for (let i = 0; i < data.length; i++) {
            let x = width * i / data.length; // 缩放i倍
            let y = (ymax - data[i]) * height / (ymax - ymin); // 缩放data[i]
            context.lineTo(x, y);
        }
        context.strokeStyle = color;
        context.stroke();
    }
}