const { series, watch } = require("gulp");
const { exec } = require("child_process");
const { unlink } = require("fs");

function compileTex(cb) {
    exec("pdflatex -halt-on-error main.tex", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log("main.tex compiled successfully!");
        console.log("deleting main.aux");
        unlink('main.aux', function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
        console.log("deleting main.log");
        unlink('main.log', function (err) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });
    cb()
}

exports.compile = series( compileTex )
exports.default = () => { watch("./*.tex", compileTex) }
