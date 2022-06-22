function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight ||
            document.documentElement.clientHeight) /* or $(window).height() */ &&
        rect.right <=
        (window.innerWidth ||
            document.documentElement.clientWidth) /* or $(window).width() */
    );
}

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a) {
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                a
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                a.substr(0, 4)
            )
        )
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
if (!window.mobileAndTabletCheck()) {
    window.location.href = "/unsupported/";
}

function unsupported() {
    // window.location.href = "/unsupported/"
    // alert("unsupported");
}
var gdata = {};
var compass = 0;
var previousTop = 0;
var previousLeft = 0;
var glow = 0;
var lock = false;
var debug = 100;
var png_glow = 0;
var prev_arrow_1 = 0;
var prev_arrow_2 = 0;
var previous_beta = 0;
var fade_1 = false;

function checkUnsupported() {
    setTimeout(() => {
        if (unsupported_var) {
            unsupported();
        }
    }, 3000);
}

function Top1(beta) {
    let a = 3500 - parseInt(Math.abs(beta)).toFixed(2) * 35;
    // console.log("top", a)
    return a;
}

function Left1(compass) {
    let b = parseInt(compass) * 22;
    // console.log("left", b)
    return b;
}

function showLeftArrow() {
    document.getElementById("right").classList.add("display_none");
    document.getElementById("bottom").classList.add("display_none");
    document.getElementById("top").classList.add("display_none");
    document.getElementById("tosty").classList.remove("display_none");
    document.getElementById("left").classList.remove("display_none");
}

function showRightArrow() {
    document.getElementById("left").classList.add("display_none");
    document.getElementById("bottom").classList.add("display_none");
    document.getElementById("top").classList.add("display_none");
    document.getElementById("tosty").classList.remove("display_none");
    document.getElementById("right").classList.remove("display_none");
}

function showTopArrow() {
    document.getElementById("right").classList.add("display_none");
    document.getElementById("bottom").classList.add("display_none");
    document.getElementById("left").classList.add("display_none");
    document.getElementById("tosty").classList.remove("display_none");
    document.getElementById("top").classList.remove("display_none");
}

function showBottomArrow() {
    document.getElementById("right").classList.add("display_none");
    document.getElementById("left").classList.add("display_none");
    document.getElementById("top").classList.add("display_none");
    document.getElementById("tosty").classList.remove("display_none");
    document.getElementById("bottom").classList.remove("display_none");
}

function gyroListener(event) {
    // debugger;
    try {
        // var a;
        // if (lock === true) {
        //     return null;
        // }
        if (!(event.alpha === null)) {
            unsupported_var = false;
            gdata.alpha_gyro = event.alpha;
            gdata.beta = event.beta;
            gdata.gamma = event.gamma;
        } else {
            unsupported();
            return;
            // document.getElementById("orient").innerHTML = 'No Gyro';
        }

        let parent = document.getElementById("main-div");
        var left = parseInt(event.alpha).toFixed(2) * 22;
        var Ebeta = event.beta - 90;
        if (event.beta < 90) {
            Ebeta = event.beta;
            document.getElementById("consta").classList.add("display_none");
        } else {
            document.getElementById("consta").classList.remove("display_none");
        }

        var top = Top1(Ebeta);
        // console.log(top, parseInt(event.beta).toFixed(2));
        var leftAlpha = parseInt(event.alpha).toFixed(2);
        if (compass !== 0) {
            left = Left1(compass);
            leftAlpha = parseInt(compass);
        }
        // console.log(
        //     event.alpha.toFixed(2),
        //     compass.toFixed(2),
        //     event.beta.toFixed(2),
        //     top,
        //     left,
        //     Math.abs(previousLeft - left),
        //     Math.abs(previousLeft - left)
        // );
        if (
            Math.abs(previousLeft - left) < 50 &&
            Math.abs(previousTop - top) < 65
        ) {
            return;
        }
        previousLeft = left;
        previousTop = top;
        glow++;
        if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
            parent.scrollTo({
                top: top,
                left: left,
                behavior: "smooth",
            });
        } else {
            parent.scrollTo({
                top: top,
                left: left,
            });
        }
        parent.scrollTo({
            top: top,
            left: left,
        });
        // alt azi

        const alt = star1values[1].toFixed(0);
        const azi = star1values[0].toFixed(0);

        leftAlpha = parent.scrollLeft;
        rightBeta = parent.scrollTop;
        // a = "alt = " + alt + "  ;azi = " + azi + "  ;leftAlpha = " + leftAlpha + "  ;rightBeta = " + rightBeta + "  ;top = " + top + "  ;left = " + left;
        // document.getElementById("test1").innerHTML = a;
        // console.log(Math.abs(azi - leftAlpha), Math.abs(alt - event.beta) > 10)
        // console.log(azi, leftAlpha);
        if (event.beta < 90) {
            showTopArrow();
            if (glow > 20) {
                if (previous_beta - event.beta > 0) {
                    document.getElementById("arrow-title").innerHTML = "getting colder";
                } else {
                    document.getElementById("arrow-title").innerHTML = "getting toasty";
                }
            }
        } else {
            if (Math.abs(alt - rightBeta) > 400) {
                if (alt - rightBeta > 0) {
                    showBottomArrow();
                } else {
                    showTopArrow();
                }
                if (glow > 20 && prev_arrow_2 - Math.abs(alt - rightBeta) < 0) {
                    document.getElementById("arrow-title").innerHTML = "getting colder";
                } else {
                    document.getElementById("arrow-title").innerHTML = "getting toasty";
                }
                prev_arrow_2 = Math.abs(alt - rightBeta);
            } else {
                if (Math.abs(azi - leftAlpha) > 400) {
                    if (azi - leftAlpha > 0) {
                        if (
                            typeof window.DeviceOrientationEvent.requestPermission ===
                            "function"
                        ) {
                            showRightArrow();
                        } else {
                            showLeftArrow();
                        }

                        // if (
                        //     typeof window.DeviceOrientationEvent.requestPermission === "function"
                        // ) {

                        // } else {
                        //     showLeftArrow();
                        // }
                    } else {
                        // if (
                        //     typeof window.DeviceOrientationEvent.requestPermission === "function"
                        // ) {
                        if (
                            typeof window.DeviceOrientationEvent.requestPermission ===
                            "function"
                        ) {
                            showLeftArrow();
                        } else {
                            showRightArrow();
                        }

                        // } else {
                        //     showRightArrow();
                        // }
                    }
                } else {
                    document.getElementById("tosty").classList.add("display_none");
                }
                if (glow > 20 && event.beta > 90) {
                    if (prev_arrow_1 - Math.abs(azi - leftAlpha) < 0) {
                        document.getElementById("arrow-title").innerHTML = "getting colder";
                    } else {
                        document.getElementById("arrow-title").innerHTML = "getting toasty";
                    }
                }
                prev_arrow_1 = Math.abs(azi - leftAlpha);
            }
            // if (lock) {
            //     return null;
            // }
            var heightS = window.screen.height * 0.50;
            var widthS = window.screen.width * 0.50;
            if (
                Math.abs(azi - leftAlpha) < widthS &&
                Math.abs(alt - rightBeta) < heightS
            ) {
                png_glow++;
                if (png_glow > 2) {
                    // document.getElementById("const_gif").classList.add("display_none");
                    // if (!fade_1) {
                    //     document.getElementById("const_gif").style.animation = "fadeIn 2s";
                    //     fade_1 = true;
                    // }

                    document.getElementById("const_gif").classList.add("gif_change");
                    document.getElementById("const_gif").src = "./constellation.gif";
                    // document.getElementById("const_gif").classList.remove("display_none");
                    document.getElementById("tosty").classList.add("display_none");
                    // document.getElementById("const_png").classList.add("display_none");
                    // document.getElementById("shooting_s").classList.remove("display_none");
                    // document.getElementById("const_gif").classList.remove("display_none");
                    document
                        .getElementById("learn_more")
                        .classList.remove("display_none");
                }

                // if (
                //     typeof window.DeviceOrientationEvent.requestPermission === "function"
                // ) {
                //     parent.scrollTo({
                //         top: rightBeta +
                //             (window.innerHeight || document.documentElement.clientHeight / 2),
                //         left: leftAlpha +
                //             (window.innerWidth || document.documentElement.clientWidth) / 2,
                //         behavior: "smooth",
                //     });
                // } else {
                //     parent.scrollTo({
                //         top: rightBeta +
                //             (window.innerHeight || document.documentElement.clientHeight / 2),
                //         left: leftAlpha +
                //             (window.innerWidth || document.documentElement.clientWidth) / 2,
                //     });
                // }
                // lock = true;
            } else {
                png_glow = 0;
                document.getElementById("const_gif").classList.remove("gif_change");
                // document.getElementById("const_gif").classList.add("display_none");
                document.getElementById("const_gif").src = "./marshmellow-blank.png";
                // document.getElementById("const_gif").style.animation = "fadeIn 2s";
                // document.getElementById("const_gif").classList.remove("display_none");
                document.getElementById("tosty").classList.remove("display_none");
                document.getElementById("shooting_s").classList.add("display_none");
                document.getElementById("learn_more").classList.add("display_none");
                // document.getElementById("const_png").classList.remove("display_none");
                // document.getElementById("const_gif").classList.add("display_none");
            }
        }
        previous_beta = event.beta;

        // if (-50 < alt - event.beta &&
        //     alt - event.beta < 50 &&
        //     -50 < azi - leftAlpha &&
        //     azi - leftAlpha < 50
        // ) {
        //     document.getElementById("tosty").classList.add("display_none");
        //     document.getElementById("showgif").classList.remove("display_none");
        //     lock = true;
        // } else {
        //     document.getElementById("showgif").classList.add("display_none");
        // }
        var a = 0;
        if (azi - leftAlpha > 0 && azi - leftAlpha > 180) {
            a = 180;
        }

        // if (glow > 20) {
        //     if (a === 0) {
        //         if (Math.abs(azi - leftAlpha) - a > 100) {
        //             document.getElementById("arrow-title").innerHTML = "Getting colder";
        //             // } else if (Math.abs(azi - leftAlpha) - a > 120 && Math.abs(azi - leftAlpha) - a < 150) {
        //             //     document.getElementById("arrow-title").innerHTML = "Getting colder";

        //             // } else if (Math.abs(azi - leftAlpha) - a > 100 && Math.abs(azi - leftAlpha) - a < 120) {
        //             //     document.getElementById("arrow-title").innerHTML = "Getting toasty";
        //         } else {
        //             document.getElementById("arrow-title").innerHTML = "Getting toasty";
        //         }
        //     } else {
        //         if (Math.abs(azi - leftAlpha) - a > 100) {
        //             document.getElementById("arrow-title").innerHTML = "Getting toasty";
        //             // } else if (Math.abs(azi - leftAlpha) - a > 120 && Math.abs(azi - leftAlpha) - a < 150) {
        //             //     document.getElementById("arrow-title").innerHTML = "Getting toasty";

        //             // } else if (Math.abs(azi - leftAlpha) - a > 100 && Math.abs(azi - leftAlpha) - a < 120) {
        //             //     document.getElementById("arrow-title").innerHTML = "Getting colder";
        //         } else {
        //             document.getElementById("arrow-title").innerHTML = "Getting colder";
        //         }
        //     }
        // }

        // console.log(alt - event.beta, azi - leftAlpha, event.beta, leftAlpha);
        // formatValue("ang_a", event.alpha);
        // formatValue("ang_b", event.beta);
        // formatValue("ang_g", event.gamma);
    } catch (error) {
        // myGeo();
    }
}

function deviceOrientationListenerIOS(event) {
    if (!(event.webkitCompassHeading === null)) {
        compass = event.webkitCompassHeading;
    } else {
        compass = 0;
    }
    // formatValue("ang_c", event.webkitCompassHeading);
}

function deviceOrientationListener(event) {
    if (!(event.alpha === null)) {
        compass = event.alpha;
    } else {
        compass = 0;
    }
    // formatValue("ang_c", event.alpha);
}

function setupiOSOrientationEvents() {
    if (window.DeviceOrientationEvent) {
        if ("ondeviceorientation" in window) {
            window.addEventListener(
                "deviceorientation",
                deviceOrientationListenerIOS
            );
            window.addEventListener("deviceorientation", gyroListener);
            checkUnsupported();
            // compassMode();
        } else {
            unsupported();
        }
    } else {
        unsupported();
    }
}

function setupOrientationEvents() {
    if (window.DeviceOrientationEvent) {
        if ("ondeviceorientationabsolute" in window) {
            window.addEventListener(
                "deviceorientationabsolute",
                deviceOrientationListener
            );
            window.addEventListener("deviceorientation", gyroListener);
            checkUnsupported();
            // compassMode(); // gdata.alpha_user_offset = 0; gdata.alpha = gdata.compass_alpha;
        } else if ("ondeviceorientation" in window) {
            window.addEventListener("deviceorientation", gyroListener);
            checkUnsupported();
        } else {
            unsupported();
        }
    } else {
        unsupported();
    }
}

function iOSOrientation() {
    //Notification.requestPermission().then(response => {
    DeviceOrientationEvent.requestPermission()
        .then((response) => {
            if (response == "granted") {
                setupiOSOrientationEvents();
                myGeo();
            }
        })
        .catch((error) => {
            alert(error);
        });

    // @todo add expection handling here
}

// function setupGyros() {
//     //if (typeof window.Notification.requestPermission === 'function') {
//     if (typeof window.DeviceOrientationEvent.requestPermission === "function") {
//         // iOSOrientation();
//     } else {
//         setupOrientationEvents();
//     }
// }