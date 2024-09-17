## The Art of Storytelling: Multi-Agent Generative AI for Dynamic Multimodal Narratives

### 1. Running the Server
**Note:** The server is tested on Python 3.10.
1. Install the requirements in server/requirements
   `pip install -r requirements`
2. You may need to upgrade the TTS library
   `pip install -U TTS`
3. Run the server using
   `uvicorn server:app`

### 2. Running the Client
1. In the config.js file in the directory client/src change the API endpoint for the server
2. Install the dependencies `npm install`
3. Start the client `npm start`
