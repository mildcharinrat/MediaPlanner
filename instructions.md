# Project Setup and Development Guide

This guide provides instructions for setting up the project for the first time, using the application, and continuing development.

## 🚀 Initial Setup

Follow these steps to get the project up and running on your local machine for the first time.

1.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd ai-qa-rag # Or the directory name of your cloned repository
    ```

2.  **Install Dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    The application requires a `GEMINI_API_KEY` for AI functionalities.
    *   Create a `.env.local` file in the root of the project.
    *   Obtain a Gemini API key from the [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Add the API key to your `.env.local` file:
        ```
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        ```
    *   **Important:** Replace `"YOUR_GEMINI_API_KEY"` with your actual API key. Do not commit `.env.local` to version control.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application should now be running at `http://localhost:3000`.

## 🖥️ Using the Application

The application guides you through a media planning process:

1.  **Start Screen**: Enter the client's name and initiate the analysis.
2.  **Wizard**: Answer a series of questions to define the media plan.
3.  **Processing**: The system analyzes your input.
4.  **Result**: View the generated media plan.

### 🤖 Chat with AI Feature

On the **Result** screen, you will find a "Chat with AI" button. Click this button to open a chat interface where you can ask the AI Assistant questions about your generated media plan. The AI is pre-fed with your plan details and conversation history to provide relevant insights.

## 🧑‍💻 Continuing Development

If you've already set up the project and want to continue development:

1.  **Navigate to the Project Directory:**
    ```bash
    cd /path/to/your/ai-qa-rag
    ```

2.  **Ensure Dependencies are Installed:**
    If you've pulled new changes or are working in a new environment, it's good practice to run:
    ```bash
    npm install
    ```

3.  **Ensure Environment Variables are Set:**
    Verify that your `.env.local` file exists and contains the `GEMINI_API_KEY`.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

### 🛠️ Key API Endpoints

*   `/api/planner`: Used for generating the initial media plan based on wizard answers.
*   `/api/gemini`: A direct interface for the Gemini AI model (used internally by `/api/chat`).
*   `/api/chat`: The main endpoint for AI chat interactions, providing context-aware responses about the media plan.

### 💡 Contributing Guidelines

*   **Follow existing conventions**: Adhere to the current code style, naming, and architectural patterns.
*   **Test your changes**: Write unit or integration tests for new features or bug fixes.
*   **Update documentation**: If you introduce new features or change existing ones, update relevant documentation.
*   **Descriptive commit messages**: Write clear and concise commit messages.

---
**Enjoy planning with AI!**