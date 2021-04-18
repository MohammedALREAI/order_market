import{Config}  from './../../../config';
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Nodemailer, NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { MailingData } from '../../../commons/interfaces/mailing-data.interface';
import * as nodeMailer from 'nodemailer';
import { ContactMessageDto } from '../../dto/contact-message.dto';

AWS.config.update({
  accessKeyId: Config.Aws.ACCESS_KEY_ID,
  secretAccessKey: Config.Aws.SECRET_ACCESS_KEY,
  region:Config.Aws.region,
});

@Injectable()
export class EmailSenderService {
  transporter;

  constructor(private nodeMailerService: Nodemailer<NodemailerDrivers.SMTP>) {
    this.transporter = nodeMailer.createTransport(Config.NodeMailerOptions);
  }

  async sendEmailMessage(data: MailingData) {
    const {text, html, subject, to } = data;
    const mailOptions = {
      from: Config.Email.from,
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendContactMessage(payload: ContactMessageDto) {
    const { email, message, subject } = payload;
    const mailOptions = {
      from: email,
      to: Config.Email.to,
      subject,
      text: message,
    };
    return this.transporter.sendMail(mailOptions);
  }

  // sendEmail(from: string, to: string, subject: string, message: string) {
  //   const ses = new AWS.SES({ apiVersion: '2010-12-01' });
  //   const params = {
  //     Destination: {
  //       ToAddresses: [to],
  //     },
  //     Message: {
  //       Body: {
  //         Html: {
  //           Charset: 'UTF-8',
  //           Data: message,
  //         },
  //         Text: {
  //           Charset: 'UTF-8',
  //           Data: message,
  //         },
  //       },
  //       Subject: {
  //         Charset: 'UTF-8',
  //         Data: subject,
  //       },
  //     },
  //     Source: 'mqaderi44@gmail.com',
  //   };
  //
  //   ses.sendEmail(params, (err, data) => {
  //     if (err) {
  //       return console.log(err, err.stack);
  //     } else {
  //       console.log('Email sent.', data);
  //     }
  //   }).promise().then(() => {
  //     console.log('hey');
  //   });
  // };
}
