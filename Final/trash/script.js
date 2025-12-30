const MODEL_FOLDER = "./tm-my-image-model/";
const MODEL_URL = MODEL_FOLDER + "model.json";
const METADATA_URL = MODEL_FOLDER + "metadata.json";

const camera = document.getElementById("camera");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");
const modelStatusEl = document.getElementById("model-status");
const detectedLabel = document.getElementById("detected-label");
const confidenceText = document.getElementById("confidence");
const uploadImage = document.getElementById("upload-image");
const previewImage = document.getElementById("preview-image");
const btnResetUpload = document.getElementById("btn-reset-upload");

const barFills = {
  plastic: document.querySelector(".bar-plastic"),
  trash: document.querySelector(".bar-trash"),
  paper: document.querySelector(".bar-paper"),
  metal: document.querySelector(".bar-metal"),
  glass: document.querySelector(".bar-glass"),
  cardboard: document.querySelector(".bar-cardboard")
};

let tmModel = null;
let modelReady = false;
let mediaStream = null;
let autoDetectInterval = null;
let uploadedImg = null;

// 載入模型
async function loadModel() {
  modelStatusEl.textContent = "模型載入中…";
  tmModel = await tmImage.load(MODEL_URL, METADATA_URL);
  modelReady = true;
  modelStatusEl.textContent = "模型載入完成，請啟用攝影機或上傳圖片";
}

// 更新長條圖
function updateBars(predictions){
  // 先重置所有長條
  for(let key in barFills){
    const bar = barFills[key];
    bar.style.width = "0%";
    bar.textContent = "0%";
    bar.style.opacity = 0.7;
    bar.style.boxShadow = "none";
  }

  // 排序，找出最高機率
  predictions.sort((a,b)=>b.probability - a.probability);
  const top = predictions[0];

  predictions.forEach(pred => {
    const classKey = pred.className.toLowerCase();
    const bar = barFills[classKey];
    if(bar){
      const prob = (pred.probability*100).toFixed(1);
      bar.style.width = prob + "%";
      bar.textContent = prob + "%";

      if(pred === top){
        bar.style.opacity = 1;
        bar.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
      }
    }
  });
}

// 預測圖片
async function predictImage(imgElement){
  if(!modelReady) return;
  const predictions = await tmModel.predict(imgElement);

  console.log(predictions); // debug用，可看到每個類別機率

  // 顯示最高機率結果
  predictions.sort((a,b)=>b.probability - a.probability);
  const top = predictions[0];
  detectedLabel.textContent = top.className;
  confidenceText.textContent = `信心值 ${(top.probability*100).toFixed(1)}%`;

  updateBars(predictions);
}

// 啟用攝像頭
async function startCamera(){
  mediaStream = await navigator.mediaDevices.getUserMedia({ video:{facingMode:"environment"} });
  camera.srcObject = mediaStream;
  btnStart.disabled = true;
  btnStop.disabled = false;

  autoDetectInterval = setInterval(async()=>{ 
    if(modelReady) await predictImage(camera); 
  },500);
}

// 停止攝像頭
function stopCamera(){
  if(mediaStream) mediaStream.getTracks().forEach(t=>t.stop());
  camera.srcObject=null;
  btnStart.disabled=false;
  btnStop.disabled=true;

  // 重置長條
  for(let key in barFills){
    const bar = barFills[key];
    bar.style.width = "0%";
    bar.textContent = "0%";
    bar.style.opacity = 0.7;
    bar.style.boxShadow = "none";
  }

  if(autoDetectInterval) clearInterval(autoDetectInterval);
}

// 上傳圖片
uploadImage.addEventListener("change",(e)=>{
  const file=e.target.files[0];
  if(!file) return;

  uploadedImg = new Image();
  uploadedImg.src = URL.createObjectURL(file);
  previewImage.src = uploadedImg.src;
  previewImage.style.display = "block";
  btnResetUpload.disabled=false;

  uploadedImg.onload = async ()=>{
    if(modelReady) await predictImage(uploadedImg);
  }
});

// 重新辨識
btnResetUpload.addEventListener("click",()=>{
  uploadedImg=null;
  previewImage.src=""; 
  previewImage.style.display="none"; 
  uploadImage.value="";
  detectedLabel.textContent="尚未辨識";
  confidenceText.textContent="信心值 -";

  for(let key in barFills){
    const bar = barFills[key];
    bar.style.width = "0%";
    bar.textContent = "0%";
    bar.style.opacity = 0.7;
    bar.style.boxShadow = "none";
  }

  btnResetUpload.disabled=true;
});

btnStart.addEventListener("click",startCamera);
btnStop.addEventListener("click",stopCamera);
window.addEventListener("load",loadModel);
