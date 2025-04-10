import Mailer from 'react-native-mail';

const sendEmail = () => {
  Mailer.mail({
    subject: 'AI Survey Submission',
    recipients: ['your_email@example.com'],
    body: 'Survey results go here...',
    isHTML: false,
  }, (error, event) => {
    if (error) {
      console.log('Email sending failed:', error);
    }
  });
};
