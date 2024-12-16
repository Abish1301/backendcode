const { BlobServiceClient } = require('@azure/storage-blob');
const fs = require('fs');
const path = require('path');

// Azure Blob Storage setup
const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName = process.env.CONTAINER_NAME; 
const containerClient = blobServiceClient.getContainerClient(containerName);

// Upload image to Azure Blob Storage
async function uploadImageToFolder(modelName, fileBuffer, blobName) {
  const folderName = `${modelName}/`;  // Folder name is model name
  const fullBlobName = folderName + blobName;  // Virtual folder path

  // Define the path for the temporary file
  const tempDirPath = path.join(__dirname, 'temp');
  const tempFilePath = path.join(tempDirPath, blobName);

  // Ensure the temp directory exists
  await fs.promises.mkdir(tempDirPath, { recursive: true });

  // Save the buffer as a file on the server temporarily
  await fs.promises.writeFile(tempFilePath, fileBuffer);

  const blockBlobClient = containerClient.getBlockBlobClient(fullBlobName);
  await blockBlobClient.uploadFile(tempFilePath);

  // Clean up the temporary file after uploading
  await fs.promises.unlink(tempFilePath);

  console.log(`File uploaded to Azure Blob Storage: ${fullBlobName}`);
  return `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${fullBlobName}`;
}

module.exports = { uploadImageToFolder };
