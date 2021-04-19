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
        upload(file);
      }
    }  } else if (isFile) {
    upload(filePath);
  }
  
})

// Single file upload
function upload(file) {
  const form = new FormData();
  let fileName = path.parse(file).name;
  
  let fileData = fs.createReadStream(file);
  form.append('file', fileData, fileName)
  
  axios.post('https://pixeldrain.com/api/file', form, {
    headers: form.getHeaders()
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}