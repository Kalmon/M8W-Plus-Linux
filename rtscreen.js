const { spawn } = require('child_process');

var monitor_sensor = spawn("monitor-sensor");
var block = null;
monitor_sensor.stdout.on("data", data => {
    console.log(data.toString());
    block = data.toString();
    if (data.toString().includes("changed:")) {
        sleep(2000).then(() => {
            if (block == data.toString()) {
                let position,
                    touchmatrix;
                if (data.toString().includes("normal")) {
                    position = "normal";
                    touchmatrix = "1 0 0 0 1 0 0 0 1";
                } else if (data.toString().includes("right-up")) {
                    position = "right";
                    touchmatrix = "0 1 0 -1 0 1 0 0 1";
                } else if (data.toString().includes("bottom-up")) {
                    position = "inverted";
                    touchmatrix = "-1 0 1 0 -1 1 0 0 1";
                } else if (data.toString().includes("left-up")) {
                    position = "left";
                    touchmatrix = "0 -1 1 1 0 0 0 0 1";
                }

                let xrandr = spawn("xrandr", ["-o", position]);
                let silead_ts = spawn("xinput", ["set-prop", "silead_ts", "--type=float",'"Coordinate Transformation Matrix"',touchmatrix]);
                silead_ts.on('error', (error) => {
                    console.log(`error: ${error.message}`);
                });

                silead_ts.on("close", async code => {
                    console.log("Monitor silead_ts end...");
                    console.log(code);
                });
            }
        })

    }
});

monitor_sensor.on('error', (error) => {
    console.log(`error: ${error.message}`);
});

monitor_sensor.on("close", async code => {
    console.log("Monitor sensor end...");
    console.log("code");
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}