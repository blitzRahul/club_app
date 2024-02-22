import os
import smtplib
from email.mime.text import MIMEText


def send_otp_mail(email, name, code):
  try:
    sender = 'fusion@vitbhopal.ac.in'
    msg = MIMEText(f"Hi {name} 👋,\n\nDue to the unsafe nature of complex links, we are assigning a simple and safe URL that takes you to our official site -\n\n 🔗 https://thefusionclub.in/tokencity/verify?code={code} \n\nOn the page, you can use this temporary code to verify your registration - \n\n🔑 {code}\n\nThis code is valid for one day, if you don't verify within that time, you will receive a new code. If you didn't register, please ignore this email. If you have any queries, please contact us at fusion@vitbhopal.ac.in\n\n\nThank You,\n Tech Team @ The Fusion Club,\n VIT Bhopal University")
    msg['Subject'] = 'Verify your registration for Token City!'
    msg['From'] = 'The Fusion Club'
    msg['To'] = email
    smtp_server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    smtp_server.login(sender, os.environ['GMAIL_KEY'])
    smtp_server.sendmail(sender, email, msg.as_string())
    smtp_server.quit()
    return True

  except Exception as e:
    print(e)
    return False