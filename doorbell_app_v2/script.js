// Image data based on spec mapping
const images = [
    {
        item: `09:05`,
        originalPath: "images/door-image-1.png",
        objectsPath: "images/door-image-1-objects.png",
        detectedObjects: "Two people standing on a sidewalk outside a house."
    },
    {
        item: `10:15`,
        originalPath: "images/door-image-2.png",
        objectsPath: "images/door-image-2-objects.png",
        detectedObjects: "Person holding a box, hat, lamp, leaves, door, trees"
    },
    {
        item: `11:30`,
        originalPath: "images/door-image-3.png",
        objectsPath: "images/door-image-3-objects.png",
        detectedObjects: "A woman wearing a straw hat and kneeling on a brick patio, plants, shovel, leaves"
    },
    {
        item: `15:45`,
        originalPath: "images/door-image-4.png",
        objectsPath: "images/door-image-4-objects.png",
        detectedObjects: "Two dogs sitting on a porch, plant, patio, garage,tree, bush"
    }
];

// DOM elements
const thumbnailGrid = document.getElementById('thumbnailGrid');
const imageDisplay = document.getElementById('imageDisplay');
const imageInfo = document.getElementById('imageInfo');
const itemNumber = document.getElementById('itemNumber');
const buttonContainer = document.getElementById('buttonContainer');
const analyzeButton = document.getElementById('analyzeButton');
const analyzingMessage = document.getElementById('analyzingMessage');
const detectedObjects = document.getElementById('detectedObjects');
const objectsList = document.getElementById('objectsList');

// Current selection
let currentSelection = null;
let analysisTimeout = null;

// Initialize the app
function init() {
    loadThumbnails();
}

// Load thumbnails in the left panel
function loadThumbnails() {
    thumbnailGrid.innerHTML = '';
    
    images.forEach((image, index) => {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        thumbnailItem.dataset.index = index;
        thumbnailItem.dataset.item = image.item;
        
        thumbnailItem.innerHTML = `
            <img src="${image.originalPath}" alt="Door Image ${image.item}" class="thumbnail-image">
            <div class="thumbnail-label">TimeStamp ${image.item}</div>
        `;
        
        thumbnailItem.addEventListener('click', () => selectImage(index));
        thumbnailGrid.appendChild(thumbnailItem);
    });
}

// Current image state
let isAnalyzed = false;

// Select and display an image
function selectImage(index) {
    // Update selection in the thumbnail grid
    if (currentSelection !== null) {
        const prevSelected = thumbnailGrid.querySelector(`[data-index="${currentSelection}"]`);
        if (prevSelected) {
            prevSelected.classList.remove('selected');
        }
    }
    
    currentSelection = index;
    const selectedItem = thumbnailGrid.querySelector(`[data-index="${index}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
    }
    
    const image = images[index];
    
    // Reset to original image state
    isAnalyzed = false;
    
    // Display the item number
    itemNumber.textContent = ` `;
    imageInfo.style.display = 'block';
    
    // Display the larger image (original)
    imageDisplay.innerHTML = `
        <img src="${image.originalPath}" alt="Door Image ${image.item} - Large View" class="main-image">
    `;
    
    // Clear any pending analysis timeout
    if (analysisTimeout) {
        clearTimeout(analysisTimeout);
        analysisTimeout = null;
    }
    
    // Reset the analyze button to initial state
    analyzeButton.disabled = false;
    analyzeButton.textContent = 'Analyze Image';
    
    // Show the analyze button and update status
    buttonContainer.style.display = 'block';
    detectedObjects.style.display = 'none'; // Hide detected objects for new selection
    updateImageStatus();
}

// Analyze the selected image
function analyzeImage() {
    if (currentSelection === null) return;
    
    const image = images[currentSelection];
    
    if (!isAnalyzed) {
        // Replace the original image with analyzing message
        imageDisplay.innerHTML = `
            <div class="analyzing-message-inline">
                <div class="spinner"></div>
                <p>Analyzing image...</p>
            </div>
        `;
        detectedObjects.style.display = 'none';
        
        // Disable button during analysis
        analyzeButton.disabled = true;
        analyzeButton.textContent = 'Analyzing...';
        
        // After 2 seconds, show the objects image and detected objects
        analysisTimeout = setTimeout(() => {
            // Switch to objects image
            imageDisplay.innerHTML = `
                <img src="${image.objectsPath}" alt="Door Image ${image.item} - Objects Detected" class="main-image">
            `;
            
            // Show detected objects text
            // objectsList.textContent = image.detectedObjects;
            // detectedObjects.style.display = 'block';
            itemNumber.textContent = `What's in the photo: ${image.detectedObjects}`;
            imageInfo.style.display = 'block';
            
            // Update button state
            isAnalyzed = true;
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Show Original';
            updateImageStatus();
            
            analysisTimeout = null;
        }, 2000);
        
    } else {
        // Switch back to original image
        imageDisplay.innerHTML = `
            <img src="${image.originalPath}" alt="Door Image ${image.item} - Large View" class="main-image">
        `;
        
        // Hide detected objects text
        detectedObjects.style.display = 'none';
        
        isAnalyzed = false;
        analyzeButton.textContent = 'Analyze Image';
        updateImageStatus();
    }
}

// Update the image status indicator
function updateImageStatus() {
    const imageStatus = document.getElementById('imageStatus');
    
    if (isAnalyzed) {
        imageStatus.textContent = 'Showing: Objects Analysis';
        imageStatus.className = 'image-status analyzed';
    } else {
        imageStatus.textContent = 'Showing: Original Image';
        imageStatus.className = 'image-status original';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Add event listener for analyze button
    const analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', analyzeImage);
});