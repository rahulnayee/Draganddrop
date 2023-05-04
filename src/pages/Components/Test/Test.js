import React, { useEffect, useRef } from "react";
import { ZoomPan } from "react-zoom-pan/lib.cjs";

const Test = () => {
  useEffect(() => {
    const div = document.getElementById("band");
    if (div) {
      const secondDiv = div.getElementsByTagName("div")[0];
      if (secondDiv) {
        secondDiv.onwheel = (e) => {
          e.stopPropagation();
          div.dispatchEvent(new WheelEvent("wheel", e));
        };
      }
    }
  }, []);

  const imgUrl =
    "https://user-images.githubusercontent.com/4661784/" +
    "56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png";

  return (
    <div style={{ backgroundColor: "red", height: "700px", width: "100%" }}>
      <ZoomPan>
        <div x={0} y={0} h={0} w={0} className="chickenyu"></div>

        <div
          className="testing"
          x={0}
          y={0}
          w={1920}
          h={1080}
          style={{ backgroundColor: "blue", width: "1920px", height: "1080px" }}
          id="band"
          onMouseDown={(e) => {
            console.log("=============================");
            e.stopPropagation();
          }}
          onMouseMove={(e) => {
            const rubberband = document.getElementById('Rubberband');
            const div0 = document.querySelector(
              "#band #viewport div:first-child"
            );
            if (div0) {
                div0.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
            }
            if (rubberband) {
                rubberband.setAttribute('transform', 'matrix(1, 0, 0, 1, 0, 0)')
            }
          }}
        >
          <ZoomPan>
            <div x={0} y={0} h={0} w={0} className="chickenyu"></div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 2
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 3
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 4
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 5
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 6
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 7
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 8
            </div>
            <div
              style={{
                fontSize: "30px",
                color: "white",
                backgroundColor: "gray",
              }}
            >
              test 9
            </div>
          </ZoomPan>
        </div>
      </ZoomPan>
    </div>
  );
};

export default Test;
