This is a specification for a web app that simulates audio file transcription. The app should be a HTML 5 web site with a single HTML file supported by a single JavaScript file for code and a single CSS file for visual themes.

The web page should include an "Upload File" button that displays a simulated "Open File" interface listing the .wav files in the calls folder. This should not be a real "Open file" dialog box, but it should look like the user is uploading a local file from Windows.

When the user selects a file, the page should display an audio player that can be used to play the audio file.

Under the audio player, display the message "Analyzing audio..." for three seconds. Then display the following information for the selected file:

| Selected file | Transcript | Names and locations | Sentiment |
| -- | -- | -- | -- |
| call-1.wav | Hi! I'm calling to complain about the terrible service I received in your Seattle store last week. The assistant that served me was rude and unhelpful. I won't be returning. | Seattle | Negative |
|call-2.wav | Hi! This is Amanda. I'm just calling to say a big thank you to Matt Jones in your Bellevue location. He helped me find the right products, and even advised me on how to use them. Thanks for the really great customer service. | Amanda, Matt Jones, and Bellevue | Positive |

Show the file information by making the transcript appear as if being typed. Then list the names and locations, and finally show the sentiment with a thumbs up or thumbs down emoji as appropriate.

