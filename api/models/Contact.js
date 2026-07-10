import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;

import { Resend } from 'resend';

const resend = new Resend('re_RaTkNwUY_AW3tvhGCd3xANMqYjzw6EWem');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'neevachi41@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
