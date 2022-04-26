# Argenti - Typescript Poker Challenge

This is the poker challenge app.

This app requires yarn and hence also requires node.js to run, 
To download node.js click on this link and follow the instructions https://nodejs.org/en/
To obtain yarn, open a terminal and do ``` yarn install ``` further instruction is provided below
This app works better in bash (MingW) rather than powershell

# How to run
1. Click the code button on the top button. A drop down menu will be displayed. The app can be opened through IDE such as visual studio, or if there are no IDE installed in the computer, the app can be downloaded by clicking Download ZIP
2. Once the app is downloaded. Open the terminal in the IDE or if without IDE, extract the file and into a folder and open the folder, then in the address bar of the folder, clear the exisiting path and type cmd and click enter. A terminal (black screen) will appear. 
3. A sample .txt file is available in this app. It is located in the bin folder, and the file name is: poker-hands.txt
4. To run the app using the provided .txt file sample, Type ``` yarn start < bin/poker-hands.txt```
5. Simply create another custom .txt file with strings of input to be tested and save it in the bin folder, and replace the file name in the instruction above with the name of the new custom file.
6. The file has to contain at least one line of card sequence that consists of 10 cards, separated by space, for example: 2S 3S 9D TH 4H 5S 3C 7S TS JC

