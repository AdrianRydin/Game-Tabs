document.addEventListener('DOMContentLoaded', () => {
    const url = '/Main/PDF/IsabellasLullaby.pdf';
    let canvas = document.getElementById('pdf-canvas');
  
    if (canvas) {
      let ctx = canvas.getContext('2d');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdf.js/src/pdf.worker.js';
  
      pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        renderPage(pageNum);
      });
  
      function renderPage(num) {
        pdfDoc.getPage(num).then(page => {
          let viewport = page.getViewport({ scale: 1 });
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };
  
          page.render(renderContext);
        });
      }
    } else {
      console.error('Canvas element not found');
    }
  });