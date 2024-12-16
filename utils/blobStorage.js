const { BlobServiceClient } = require('@azure/storage-blob');

// Azure Blob Storage setup
const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerName = process.env.CONTAINER_NAME;
const containerClient = blobServiceClient.getContainerClient(containerName);

// Upload image to Azure Blob Storage
async function uploadImageToFolder(modelName, fileBuffer, blobName) {
  const folderName = `${modelName}/`; // Folder name is model name
  const fullBlobName = folderName + blobName; // Virtual folder path
  console.log(fullBlobName, 'fullBlobName');

  // Get the block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(fullBlobName);

  // Upload the file buffer directly to Azure Blob Storage
  await blockBlobClient.uploadData(fileBuffer);

  console.log(`File uploaded to Azure Blob Storage: ${fullBlobName}`);
  return `/${fullBlobName}`;
}

module.exports = { uploadImageToFolder };
