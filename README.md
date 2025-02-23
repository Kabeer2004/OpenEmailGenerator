# Open Email Generator

Welcome to Open Email Generator, an open-source alternative to tools like [new.email](new.email). This project leverages AI to generate stylish email templates using React and JSX, offering real-time code/preview views and seamless email sending via Gmail—all wrapped in a modern, dark-mode SaaS interface.

## Motivation

The inspiration for this project came from the growing popularity of AI-driven tools like [new.email](new.email), which simplify email creation but remain closed-source. We wanted to build an open-source counterpart that offers:

- **Transparency**: Full access to the codebase for anyone to inspect, tweak, or enhance.
- **Customizability**: The ability to adapt the tool to specific workflows or integrate it into other applications.
- **Community Collaboration**: A platform for developers to contribute ideas, fix bugs, and push the tool forward.

## Target Users

This project is designed for:

- **Developers**: Seeking an AI-powered email generation tool or a foundation for building similar features in their own projects.
- **Startups and Small Businesses**: Needing a free, customizable way to craft and send professional emails.
- **Learners**: Students, hobbyists, or educators exploring AI integration, React, and full-stack development in a real-world application.

## Features

- **AI-Powered Email Generation**: Generate React JSX email templates using the Gemini API based on simple user prompts (e.g., "Create a welcome email with a header and button").
- **Real-Time Views**: Toggle between:
  - **Code View**: See the raw JSX generated by the AI.
  - **Preview View**: View a live rendering of the email design.
- **Gmail Integration**: Send generated emails directly to recipients using Nodemailer and Gmail.
- **Modern UI**: A basic, dark-mode interface styled with Tailwind CSS.
- **No Authentication Required**: Focus on simplicity—no user accounts or databases needed for core functionality.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Version 14 or later.
- **npm**: Version 6 or later.
- **Gemini API Key**: Get one from the [Google AI Studio](https://aistudio.google.com/).
- **Gmail Account**: Requires an App Password if 2FA is enabled. [Generate it here](https://myaccount.google.com/apppasswords).

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/open-email-generator.git
   cd open-email-generator
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env.local` file in the project root.
   - Add these variables:
     ```bash
     GEMINI_API_KEY=your_gemini_api_key
     GMAIL_USER=your_gmail_address
     GMAIL_PASS=your_gmail_app_password
     ```

### Running the Project

1. **Launch the Development Server:**

   ```bash
   npm run dev
   ```

2. **Access the App:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

### Generating Emails

1. **Chat with the AI**: In the UI, type a prompt like "Generate an email with a thank-you message and a footer."
2. **Click "Send"** to get the AI-generated JSX code.

### View the Output

- The generated JSX will appear in the chat window.

### Previewing and Sending Emails

1. **Toggle Views**:
   - Click "Code View" to inspect the JSX.
   - Click "Preview View" to see the email rendered live.
2. **Send the Email**:
   - Hit the "Send Email" button (bottom-right).
   - In the modal, enter the recipient’s email and subject.
   - Click "Send" to deliver it via Gmail.

## Technical Stack

- **Next.js**: For server-side rendering and routing.
- **React**: Powers the dynamic UI and email previews.
- **Gemini API**: Drives the AI email generation.
- **Nodemailer**: Handles email sending via Gmail.
- **Tailwind CSS**: Styles the modern, dark-mode interface.

## Contributing

We’d love your help to make this project even better! Here’s how to get started:

- **Fork the Repo**: Clone it to your own GitHub account.
- **Submit Issues**: Report bugs or suggest features via GitHub Issues.
- **Create Pull Requests**: Share your fixes or enhancements for review.

### Guidelines

- Write in JavaScript (no TypeScript).
- Match the existing code style and structure.
- Add comments to explain complex logic.

## Future Roadmap

Here’s what’s on the horizon:

- **User Authentication**: Add login support for managing email preferences.
- **More Email Providers**: Expand beyond Gmail to include Outlook, SMTP, etc.
- **Advanced AI Features**: Integrate additional AI models or allow custom prompts for more granular control.
- **Draft Storage**: Introduce a database to save chat histories and email drafts.
- **Email Templates**: Pre-Save Templates that can just be filled up with the required content.

Have ideas? Let us know in the Issues section!

## License

This project is released under the MIT License ([LICENSE](LICENSE.txt))—feel free to use, modify, and distribute it as you see fit.

## Acknowledgments

- Inspired by new.email and its innovative approach to email creation.
- Gratitude to the open-source community for tools like Next.js, Tailwind CSS, and Nodemailer.
- Thanks to everyone who contributes to making this project better!
