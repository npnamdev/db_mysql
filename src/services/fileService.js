const path = require('path');

const uploadSingleFile = async (fileObject) => {
    let uploadPath = path.resolve(__dirname, "../public/images/");

    const timestamp = Date.now(); //763347672387
    let extName = path.extname(fileObject.name); //jpg
    let baseName = path.basename(fileObject.name, extName);//avatar

    let finalName = `${baseName}-${timestamp}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: finalName,
            error: null
        }
    } catch (error) {
        console.log(">>>Check error: ", error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }
}



const uploadMultipleFiles = async (fileArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images");
        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < fileArr.length; i++) {
            let extName = path.extname(fileArr[i].name);
            let baseName = path.basename(fileArr[i].name, extName);
            let timestamp = Date.now();
            let finalName = `${baseName}-${timestamp}${extName}`;
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await fileArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: fileArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (error) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: fileArr[i].name,
                    error: JSON.stringify(error)
                })
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    uploadSingleFile, uploadMultipleFiles
}