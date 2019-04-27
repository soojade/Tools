/**
 * 对唧唧下载后的文件重命名
 * 目录名不要有空格
 */
const fs = require('fs');
const path = require('path');

// 通过命令行输入目录
let dir = path.resolve(process.argv[2]);

change(dir);

function change(dir) {
    let state = fs.statSync(dir);

    if (state.isDirectory()) {
        let files = fs.readdirSync(dir);
        files.forEach(fe => {
            let file = path.join(dir, fe);
            if (fs.statSync(file).isFile()) {
                fs.renameSync(file, file.replace(/\d+\./, '').replace(/\(Av\d+,P\d+\)/, ''), (err) => {
                    if (err) throw err;
                })
            }
        })
    }
    console.log('+++++++++++++重命名结束+++++++++++++');

}
