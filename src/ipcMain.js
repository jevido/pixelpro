const { ipcMain, session } = require('electron');
const got = require('got');
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
	const res = await got.post('https://pixeldrain.com/api/file', {
		body: form,
		responseType: 'json',
		headers: { 
			...formHeaders 
		}
	}).on('uploadProgress', progress => {
	// Do something like updating the not-yet-made upload tracker
		console.log(Math.round(progress.percent * 100))
	});
	
	// Do something like updating the not-yet-made upload tracker
	console.debug('finito', res.body);
}