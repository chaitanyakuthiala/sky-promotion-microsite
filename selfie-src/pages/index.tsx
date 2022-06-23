import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import styles from "../styles/Home.module.scss";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import React from "react";
import { saveAs } from "file-saver";

// import { Html } from "next/document";

function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const [bodypixnet, setBodypixnet] = useState<bodyPix.BodyPix>();
  const [prevClassName, setPrevClassName] = useState<string>();
  // const { locale } = useRouter();
  // const t = locale === "en" ? en : ja;

  const [show, setShow] = React.useState(true);
  const [showCam, setShowCam] = React.useState(true);
  const [showLoader, setShowLoader] = React.useState(true);

  useEffect(() => {
    bodyPix.load().then((net: bodyPix.BodyPix) => {
      setBodypixnet(net);
    });
  }, []);

  const takeSelfie = () => {
    html2canvas(document.getElementById("main") as HTMLInputElement).then(
      function (canvas) {
        (
          document.getElementById("canvasImage") as HTMLInputElement
        ).appendChild(canvas);
        showDiv();
      }
    );
  };

  function iOS() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  const downloadSelfie = () => {
    html2canvas(
      document.getElementById("canvasImage") as HTMLInputElement
    ).then(function (canvas) {
      canvas.toBlob(function (blob) {
        //debugger;
        //saveAs(blob!, "jetpuffed.png");
        //document.getElementById("downloadButton")!.innerHTML = "download";

        const newImgWrap = document.querySelector('#finalImageModal') as HTMLInputElement;
        const newImg = document.querySelector('#finalImage') as HTMLInputElement;
        const url = URL.createObjectURL(blob!);
        newImg.src = url;
        newImgWrap.classList.add("showModal");

      });
    });
  };

  function showDiv() {
    let hiddenDiv = document.querySelector("#image") as HTMLInputElement;
    //let hideEle = document.querySelectorAll("#logo, #videoContainer, #consImage");
    let hidevideoContainer = document.querySelector(
      "#videoContainer"
    ) as HTMLInputElement;
    let hideconsImage = document.querySelector(
      "#consImage"
    ) as HTMLInputElement;
    let hidelogo = document.querySelector("#logo") as HTMLInputElement;

    hiddenDiv.style.display =
      hiddenDiv.style.display === "block" ? "" : "block";
    //hideEle.style.display = hideEle.style.display === "none" ? "" : "none";
    hidevideoContainer.style.display =
      hidevideoContainer.style.display === "none" ? "" : "none";
    hideconsImage.style.display =
      hideconsImage.style.display === "none" ? "" : "none";
    hidelogo.style.display = hidelogo.style.display === "none" ? "" : "none";
  }

  const drawimage = async (
    webcam: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) => {
    //alert("hi");
    // create tempCanvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = webcam.videoWidth;
    tempCanvas.height = webcam.videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    (async function drawMask() {
      requestAnimationFrame(drawMask);
      // draw mask on tempCanvas
      const segmentation = await bodypixnet?.segmentPerson(webcam);
      const mask = bodyPix.toMask(segmentation!);
      tempCtx?.putImageData(mask, 0, 0);
      // draw original image
      context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
      // use destination-out, then only masked area will be removed
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      context.restore();
      document.getElementById("main")!.style.opacity = "1";
      setShowLoader(false);
    })();
  };

  const clickHandler = async (className: string) => {
    const webcam = webcamRef.current?.video as HTMLVideoElement;
    const canvas = canvasRef.current;
    if (canvas !== null) {
      webcam.width = canvas.width = webcam.videoWidth;
      webcam.height = canvas.height = webcam.videoHeight;
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height);
      if (prevClassName) {
        canvas.classList.remove(prevClassName);
        setPrevClassName(className);
      } else {
        setPrevClassName(className);
      }
      canvas.classList.add(className);
      if (bodypixnet) {
        drawimage(webcam, context!, canvas);
      }
    }
  };
  return (
    <div className={styles.container}>
      {/* <html lang="en"> */}
      <Head>
        <title>Discover Jet-Puffed S'morion</title>

        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="en" />
        {/* <meta name="viewport" content="viewport-fit=cover" /> */}
        {/* <meta name="description" content="Generated by create next app" /> */}
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0"
        /> */}
        {/* <link rel="icon" href="/static/logo.jpg" /> */}
      </Head>

      {/* <header className={styles.header}>
        <h1 className={styles.title}>{t.title}</h1>
      </header> */}
      {showLoader && (
        <div className={styles.loader} id="loader">
          <img
            style={{ marginTop: "calc(50vh - 30px)", width: "60px" }}
            src="./images/loading-img.gif"
            alt="loading.."
          />
        </div>
      )}
      <main id="main" style={{ opacity: 0 }} className={styles.main}>
        <div className={styles.logo} id="logo">
          <img src="./images/logo.png" />
        </div>

        <div className={styles.consImage} id="consImage">
          <img src="./images/constellation.png" />
        </div>

        <div
          className={`canvasblock ${show ? "showcanvas" : ""}`}
          id="videoContainer"
        >
          <div className={styles.videoContainer}>
            <canvas
              id="captured_canvas"
              ref={canvasRef}
              className={styles.canvas}
            />
            <button
              className={styles.camerabtn}
              onClick={(e) => {
                takeSelfie();
              }}
              data-html2canvas-ignore="true"
            >
              <img src={"./images/camera-button.svg"} />
            </button>
          </div>
        </div>

        <div className={`selfieblock ${show ? "hideblock" : ""}`}>
          <div className={styles.selfieWrapper}>
            <span className={styles.icon}>
              <img src={"./images/selfie-icon.svg"} />
            </span>
            <p className={styles.title}>Take a Selfie</p>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem
              ipsum
            </p>

            <button
              className={(styles.selfieButton, styles.btn)}
              onClick={() => {
                setShow(true);
                setShowCam(true);
              }}
            >
              take my photo!
            </button>
          </div>
        </div>

        <div id="image">
          <div className="mainHeading">
            you’re a <br />
            shooting star!
          </div>
          <div id="canvasImageWrap">
            <div id="canvasImage"></div>
          </div>

          <p className="desc">
            Share on Instagram with #GoSmoregazing #sweepstakes for a chance to
            win your very own S’moregazing kit. 
          </p>
          <button
            id="downloadButton"
            data-html2canvas-ignore="true"
            className={"btn"}
            onClick={(e) => {
              document.getElementById("downloadButton")!.innerHTML =
                "downloading...";
              downloadSelfie();
            }}
          >
            download
          </button>
          <button
            data-html2canvas-ignore="true"
            className={"btn borderedbtn"}
            onClick={() => window.location.reload()}
          >
            take again
          </button>
          <p className="note">
            NO PURCHASE NECESSARY. Restrictions apply. Sweepstakes subject in
            all respects to complete Official Rules. See Rules{" "}
            <a href="https://bit.ly/3MQmcb6" target={"_blank"}>
              https://bit.ly/3MQmcb6
            </a>
            . 
          </p>
        </div>

        <div className={styles.videoCam} data-html2canvas-ignore="true">
          {showCam && (
            <Webcam
              onLoadedData={() => {
                clickHandler(styles.jetpuffed);
              }}
              audio={false}
              ref={webcamRef}
              className={styles.video}
            />
          )}
        </div>

        <div id="finalImageModal">
          <img src="" alt="" id="finalImage" />
        </div>

      </main>
    </div>
  );
}

export default Home;
