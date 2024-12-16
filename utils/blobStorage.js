// azureBlobStorage.js
const { BlobServiceClient } = require('@azure/storage-blob');

// Use the connection string from the Azure portal
const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName =process.env.CONTAINER_NAME; 
// const accountName=process.env.ACCOUNT_NAME;
// Create a container client
const containerClient = blobServiceClient.getContainerClient(containerName);

// Upload image to a folder based on model name
async function uploadImageToFolder(modelName, filePath, blobName) {
  const folderName = `${modelName}/`;  // The folder name is the model name
  const fullBlobName = folderName + blobName;  // Virtual folder path

  const blockBlobClient = containerClient.getBlockBlobClient(fullBlobName);
  await blockBlobClient.uploadFile(filePath);
  console.log(`File uploaded to folder: ${folderName} in Azure Blob Storage: ${blobName}`);
  return `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`;
 // Return the full path
}

// Get the public URL of the uploaded image
// function getImageUrl(blobName) {
//   return `https://${blobServiceClient.accountName}.blob.core.windows.net/${containerName}/${blobName}`;
// }

module.exports = { uploadImageToFolder };
