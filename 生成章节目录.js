onload = () => {
    // 查找TOC 若不存在则创建
    let toc = document.querySelector('#TOC');
    if (!toc) {
        toc = document.createElement("div");
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    // 查找所有的标题元素
    let headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6');

    // 保存章节号
    let nums = new Array(6).fill(0);
    for (let h = 0; h < headings.length; h++) {
        let heading = headings[h];
        if (heading.parentNode == toc) continue; // 跳过在TOC中的标题元素
        // 判定标题级别
        let lv = parseInt(heading.tagName.charAt(1));
        if (isNaN(lv) || lv < 1 || lv > 6) continue;

        nums[lv - 1]++; // 增加该级别的章节数
        for (let i = lv; i < 6; i++) nums[i] = 0;

        num = nums.slice(0, lv).join('.'); // 生成章节号

        let span = document.createElement('span');
        // span.className = "TOCSectNum"; // 可以设置样式
        span.innerHTML = num;
        heading.insertBefore(span, heading.firstChild);

        // 生成锚点
        let anchor = document.createElement('a');
        anchor.name = "TOC" + num;
        heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading);

        // 为当前章节创建链接
        let link = document.createElement('a');
        link.href = "#TOC" + num;
        link.innerHTML = heading.innerHTML;

        let entry = document.createElement('div');
        // entry.className = "TOCEntry TOCLevel" + lv; // 设置样式
        entry.appendChild(link);
        toc.appendChild(entry);
    }
};