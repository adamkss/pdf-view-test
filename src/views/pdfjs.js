import { useRef, useEffect, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import styled, { css } from "styled-components";

import PDFHolder from "../components/PDFHolder";
import workerURL from "../pdfjs/pdf.worker.min.data";

// A workaround to trick create-react-app putting pdf.worker.min.js in /build/static/media
// so pdf.worker.min.js can be cached by the default service-worker.
pdfjsLib.GlobalWorkerOptions.workerSrc = workerURL;

const moveLeft = (array, index) => {
  return [
    ...array.slice(0, index - 1),
    array[index],
    array[index - 1],
    ...array.slice(index + 1, array.length),
  ];
};

const moveRight = (array, index) => {
  return [
    ...array.slice(0, index),
    array[index + 1],
    array[index],
    ...array.slice(index + 2, array.length),
  ];
};

const PDFJSHolder = styled.div`
  h2 {
    padding: 1em;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.6em;
  padding: 1em;
`;

const ActiveButtonStyles = css`
  background-color: rgba(0, 0, 200, 0.2);
  color: black;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 200, 0.15);
  }
  &:active {
    background-color: rgba(0, 0, 200, 0.25);
  }
  &:focus {
    outline: 1px solid blue;
  }
`;

const Button = styled.button`
  border: 0;
  outline: none;
  padding: 0.7em;
  color: gray;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: not-allowed;

  ${(p) => !p.inactive && ActiveButtonStyles}
`;

const CanvasesHolder = styled.div`
  display: flex;
  padding: 1em;
  gap: 1em;
`;

const Canvas = styled.canvas`
  border: ${(p) => (p.selected ? "2px solid blue" : "2px dashed black")};
  cursor: pointer;
`;

const PDFJS = ({ documentURL = "" }) => {
  const pdfDoc = useRef(null);
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [selectedPageNumber, setSelectedPageNumber] = useState(null);
  const [selectedPageIndex, setSelectedPageIndex] = useState(null);

  const renderPage = useCallback(async (pageNumber, canvas) => {
    const page = await pdfDoc.current.getPage(pageNumber);

    //For High DPI stuff consider this:
    // const scales = { 1: 3.2, 2: 4 },
    //   defaultScale = 3,
    //   scale = scales[window.devicePixelRatio] || defaultScale;

    // const viewport = page.getViewport({ scale: scale });
    // canvas.height = viewport.height;
    // canvas.width = viewport.width;

    // const displayWidth = 1.5;
    // canvas.style.width = `${(viewport.width * displayWidth) / scale}px`;
    // canvas.style.height = `${(viewport.height * displayWidth) / scale}px`;

    const scale_required = canvas.width / page.getViewport({ scale: 1 }).width;

    // Get viewport of the page at required scale
    const viewport = page.getViewport({ scale: scale_required });

    // Set canvas height
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: canvas.getContext("2d"),
      viewport: viewport,
    };

    // Render the page contents in the canvas
    await page.render(renderContext);
  }, []);

  const loadPDFPages = useCallback(async () => {
    const pdf = await pdfjsLib.getDocument({ url: documentURL }).promise;
    pdfDoc.current = pdf;
    setPages(
      [...Array(pdf.numPages)].map((_, id) => ({
        pageNumber: id + 1,
        id: Math.random(),
      }))
    );
  }, [renderPage]);

  useEffect(() => {
    loadPDFPages();
  }, [loadPDFPages]);

  const onPageSelection = useCallback(
    (event) => {
      const pressedUponPageNumber = event.target.dataset.pageNumber;
      pressedUponPageNumber != selectedPageNumber
        ? setSelectedPageNumber(pressedUponPageNumber)
        : setSelectedPageNumber(null);
    },
    [selectedPageNumber]
  );

  useEffect(() => {
    if (selectedPageNumber) {
      const selectedPageIndex = pages.findIndex(
        ({ pageNumber }) => pageNumber == selectedPageNumber
      );
      setSelectedPageIndex(selectedPageIndex);
    } else {
      setSelectedPageIndex(null);
    }
  }, [selectedPageNumber]);

  useEffect(() => {
    if (pdfDoc.current) {
      pages.forEach(({ pageNumber }, index) => {
        return renderPage(
          pageNumber,
          document.querySelector(`[data-page-number="${pageNumber}"]`)
        );
      });
    }
  }, [pages]);

  const onMoveLeft = useCallback(() => {
    setPages(moveLeft(pages, selectedPageIndex));
    setSelectedPageIndex(selectedPageIndex - 1);
  }, [pages, selectedPageIndex]);

  const onMoveRight = useCallback(() => {
    setPages(moveRight(pages, selectedPageIndex));
    setSelectedPageIndex(selectedPageIndex + 1);
  }, [pages, selectedPageIndex]);

  const moveLeftButtonActive = selectedPageIndex > 0;
  const moveRightButtonActive =
    selectedPageIndex != null && selectedPageIndex < pages.length - 1;

  return (
    <PDFJSHolder>
      <PDFHolder
        title="Mozilla's PDF.js lib (renderer)"
        observations={[
          "✅ Works well on all browsers (mobile, desktop)",
          "✅ Possibility of embedding in our document structure",
          "❓ Might be slower than other solutions at rendering",
          "❓ Might need manual maintenance/ library bump",
        ]}
      >
        <iframe
          title="PDF"
          src={`/pdfjs-2.5.207-es5-dist/web/viewer.html?file=${documentURL}`}
          width="100%"
          height="100%"
        ></iframe>
      </PDFHolder>

      <h2>Moving Pages (POC)</h2>
      <ButtonsWrapper>
        <Button
          inactive={!moveLeftButtonActive}
          onClick={moveLeftButtonActive ? onMoveLeft : null}
        >
          Move Left
        </Button>
        <Button
          inactive={!moveRightButtonActive}
          onClick={moveRightButtonActive ? onMoveRight : null}
        >
          Move Right
        </Button>
      </ButtonsWrapper>
      <CanvasesHolder>
        {pages.map(({ id, pageNumber }, index) => {
          return (
            <Canvas
              selected={selectedPageNumber == pageNumber}
              key={id}
              data-page-number={pageNumber}
              onClick={onPageSelection}
            ></Canvas>
          );
        })}
      </CanvasesHolder>
    </PDFJSHolder>
  );
};

export default PDFJS;
