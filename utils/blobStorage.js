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
  // Get the block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(fullBlobName);

  // Upload the file buffer directly to Azure Blob Storage
  await blockBlobClient.uploadData(fileBuffer);

  console.log(`File uploaded to Azure Blob Storage: ${fullBlobName}`);
  return `/${fullBlobName}`;
}


async function updateImageToFolder(imageBuffer, blobName) {
  blobName = blobName.startsWith('/') ? blobName.slice(1) : blobName;
  // Get the block blob client for the specified blob name
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    // Check if the blob exists
    const exists = await blockBlobClient.exists();

    if (!exists) {
      throw new Error(`The file at path ${blobName} does not exist.`);
    }

    // Overwrite the existing file with the new image buffer
    await blockBlobClient.uploadData(imageBuffer, {
      overwrite: true, // Ensure the file is overwritten
    });

    console.log(`File successfully updated in Azure Blob Storage: ${blobName}`);
    return `/${blobName}`; // Return the location of the updated file
  } catch (error) {
    console.error(`Error updating file at path ${blobName}: ${error.message}`);
    throw new Error('Failed to update file in Azure Blob Storage.');
  }
}

module.exports = { uploadImageToFolder,updateImageToFolder };
