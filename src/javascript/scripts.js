function handleTreeBtn() {
  isTimeToDraw = false;
  clear();
  drawTree(thestring);
}

function handleRealTimeBtn() {
  currentangle = 0;
  clear();
  if (!isLooping()) loop();
  isTimeToDraw = true;
  whereinstring = 0;
}

function handleSavePNGBtn() {
  save(cnv, `Compilers_Image_${Date.now()}.png`);
}

function handleChangeSlide() {
  const elem = document.getElementById('angle');
  const value = elem.value;

  document.getElementById('angleSmallTag').innerHTML = '&nbsp' + value;

  // just to avoid stuck
  angle = Number(value);

  isTimeToDraw ? isTimeToDraw : handleTreeBtn();
}
