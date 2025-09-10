This is a specification for a web app that maintains a collection of photo's that are taken when someone is detected at your door in your absence. The user can view the photos, and any faces they contain should be shown with a bounding box.

The web app simulates face recognition. The app should be a HTML 5 web site with a single HTML file supported by a single JavaScript file for code and a single CSS file for visual themes.
 
The web page should include an "Upload File" button. When this button is clicked, the app should display a simulated "Open File" interface listing the images in the "images" folder. This should not be a real "Open file" dialog box, but it should look like the user is uploading a local file from Windows. The image files in the "images" folder should be listed in the Open File dialog with an appropriate icon.
 
When the user selects a file, the page should display the message "Analyzing image..." for three seconds. Then display the following information for the selected file:

|Original Image|Face Analysis|Detected attributes|Objects detected|
|--|--|--|
|door-image-1.png | door-image-1-ai.png | Face #1: Face mask: no. Face#2: Face mask: no.|door-image-1-objects.png|
|door-image-2.png | door-image-2-ai.png | Face #1: Face mask: no. |door-image-2-objects.png|
|door-image-3.png | door-image-3-ai.png | Face #1: Face mask: no. |door-image-3-objects.png|
|door-image-4.png | door-image-4.png | - |door-image-4-objects.png|


 
