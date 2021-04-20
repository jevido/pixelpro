const { ipcMain, session } = require('electron');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');


ipcMain.on('logout', (event, arguments) => {
	session.defaultSession.clearStorageData();
})

// Can be anything either a file or folder
ipcMain.on('upload', async (event, filePath) => {
  let isDirectory = fs.lstatSync(filePath).isDirectory();
  let isFile = fs.lstatSync(filePath).isFile();

  if (isDirectory) {
    let files = fs.readdirSync(filePath);
    for (let file of files) {
      if (fs.lstatSync(filePath +'/'+ file).isFile()) {
        upload(filePath +'/'+ file);
      }
    }  
  } else if (isFile) {
    upload(filePath);
  }  
})

// Single file upload
async function upload(file) {
  const form = new FormData();
  let fileName = path.parse(file).base;

  // Append file to formdata
  let fileData = fs.createReadStream(file);
  form.append('file', fileData, fileName)
  
  // Get some pixelKeys
  let pdKey = await session.defaultSession.cookies.get({ name: 'pd_auth_key' })
  let formHeaders = form.getHeaders();
  if (pdKey.length > 0) {
    pdKey = pdKey[0].value;
    // Apply key to formheader
    formHeaders = Object.assign(formHeaders, {
      cookie: 'pd_auth_key='+pdKey
    })
  }

  

  // Send request
  axios.post('https://pixeldrain.com/api/file', form, {
    withCredentials: true,
    onUploadProgress: (ev) => {
      // Do something with the progress like a loading bar or something
      // For now i'm not sure if this works for my environment
      let percentCompleted = Math.round((ev.loaded * 100) / ev.total);
      console.debug('Percent Completed:' + percentCompleted);
    },
    headers: formHeaders,
    // Get rid of weak upload limits in formdata
    maxContentLength: Infinity,
    maxBodyLength: Infinity
  })
  .then(res => {
    console.debug(res.data)
    // Do something like
    // win.webContents.send('file-uploaded', res.data);
  })
  .catch(err => console.log(err))
}