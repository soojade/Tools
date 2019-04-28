/**
 * 对唧唧下载后的文件重命名
 * 目录名不要有空格
 */
const fs = require('fs');
const path = require('path');

// 通过命令行输入目录
let dir = path.resolve(process.argv[2]);
// jj下载时不新建文件夹会把文件夹作为前缀
let sub = process.argv.slice(3);
if (sub) {
    sub = sub.join(' ');
}
let reg = /\d+\.|\(Av\d+,P\d+\)| 00_00_00-00_\d+_\d+/g; // 要修改的正则

rename(dir, reg);

function rename(dir, reg) {
    let state = fs.statSync(dir);
    if (state.isDirectory()) {

        let files = fs.readdirSync(dir);
        let newName = '';
        files.forEach(file => {
            newName = file.replace(sub, '').replace(reg, '');
            fs.renameSync(path.join(dir, file), path.join(dir, newName));
        })
    }
    console.log('+++++++++++++重命名结束+++++++++++++');

}
