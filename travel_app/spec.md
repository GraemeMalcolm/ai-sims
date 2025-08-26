This is a specification for a company's internal web app for a travel agency called Margie's Travel. The web app simulates audio file transcription. The app should be a HTML 5 web site with a single HTML file supported by a single JavaScript file for code and a single CSS file for visual themes.
 
The web page should include a simulated file folder. The app should display a simulated interface listing the .wav files in the media folder. This should not be a real file folder, but it should look like the user is looking at local files from Windows. The .wav files in the media folder should be listed in thein the simulated file folder with an appropriate icon.

This web page has a toggle button at the top of the page to switch the language of the page from English to 中文. 

If the toggle is set to English: 

Display the wav files in the media folder that begin with voice-memo.  

When the user selects a file, the page should display an audio player that can be used to play the audio file. Under the audio player, display the message "Analyzing audio..." for three seconds. Then display the following information for the selected file:
 
| Selected file | Transcript | Text Summary | Named Entities | Sentiment |
| -- | -- | -- | -- | -- | 
|voice-memo-1.wav | Hi there! I’m planning a solo trip to Portugal next month and I’d love some advice. I’m into local culture and food, and I want to avoid super touristy spots. Do you have recommendations for places that are safe but still authentic? Also, any tips on getting around without renting a car?|Planning a solo trip to Portugal, seeking advice on authentic, safe places and transportation without a car.| Portugal, next month, local culture, food, touristy spots, car | Positive – curious, excited, open-minded | 
|voice-memo-2.wav | Hi, I’m organizing a business trip to Tokyo and I’d appreciate help with logistics. I’ll need a hotel near the Shibuya area, preferably with good Wi-Fi and meeting facilities. Also, could you advise on airport transfers and whether I should get a local SIM or pocket Wi-Fi? | Organizing a business trip to Tokyo, needs hotel near Shibuya with Wi-Fi and meeting space, plus help with airport transfers and connectivity. | Tokyo, Shibuya, hotel, Wi-Fi, meeting facilities, airport transfers, SIM, pocket Wi-Fi | Neutral to Positive – professional, focused, planning-oriented | 
|voice-memo-3.wav | Hey there! My girlfriends and I are planning a getaway to Greece! We’re thinking Santorini, but we’re open to other islands too. We want beaches and maybe a little adventure. What’s the best time to go for good weather but fewer crowds? And can you help us find a cute villa? | Planning a girls’ getaway to Greece, considering Santorini and other islands, looking for beaches, adventure, and a cute villa. | Greece, Santorini, islands, beaches, villa, good weather, crowds | Positive – enthusiastic, playful, adventurous | 

 
Show the file information by making the transcript appear as if being typed. Then list the text summary, named entities, and finally show the sentiment with a thumbs up or thumbs down emoji as appropriate.

If the toggle is set to 中文: 

Display the wav files in the media folder that begin with translated.  

When the user selects a file, the page should display an audio player that can be used to play the audio file. Under the audio player, display the message "分析音频..." for three seconds. Then display the following information for the selected file:

| 所选文件 | 抄本 |文本摘要 | 命名实体 | 情绪 |  
| -- | -- | -- | -- | -- |
|translated-1.wav | 你好！我计划下个月独自去葡萄牙旅行，我希望得到一些建议。我喜欢当地的文化和美食，我想避开超级旅游景点。您对安全但仍然真实的地方有建议吗？另外，有什么关于不租车出行的提示吗？|计划独自前往葡萄牙，寻求有关真实、安全的地方和无车交通的建议。| 葡萄牙， 下个月， 当地文化， 美食， 旅游景点， 汽车 | 积极 – 好奇、兴奋、思想开放 | 
|translated-2.wav | 嗨，我正在组织一次去东京的商务旅行，我将不胜感激后勤方面的帮助。我需要一家靠近涩谷地区的酒店，最好有良好的 Wi-Fi 和会议设施。另外，您能否就机场接送以及我是否应该购买本地 SIM 卡或袖珍 Wi-Fi 提供建议？ | 组织前往东京的商务旅行，需要涩谷附近的酒店，提供 Wi-Fi 和会议空间，以及机场接送和连接方面的帮助。| 东京， 涩谷， 酒店， Wi-Fi， 会议设施， 机场接送， SIM 卡， 袖珍 Wi-Fi | 中性到积极 – 专业、专注、以规划为导向 | 
|translated-3.wav | 嘿！我和我的朋友们正计划去希腊度假！我们考虑的是圣托里尼岛，但我们也对其他岛屿持开放态度。我们想要海滩，也许还有一点冒险。天气好但人群较少的最佳时间是什么时候？你能帮我们找到一栋可爱的别墅吗？ | 计划朋友去希腊度假，考虑圣托里尼岛和其他岛屿，寻找海滩、冒险和可爱的别墅。 | 希腊， 圣托里尼岛， 岛屿， 海滩， 别墅， 好天气， 人群 | 积极 – 热情、俏皮、冒险 | 