import os
from pymongo import MongoClient
from mailer import send_otp_mail
import random, string
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

# db connection
uri = os.environ['MONGODB_URI']
client = MongoClient(uri)
db = client['websitedata']
mails = db['mails']
tickets = db['tickets']


def generate_random_string():
  return ''.join(
      random.choice(string.ascii_letters + string.digits) for _ in range(8))


try:
  client.admin.command('ping')
  print('connected to MongoDB')
except Exception as e:
  print(e)

pending_mails = tickets.find({'type': 'external', 'uuid': ''})
for mail in pending_mails:
  code = generate_random_string()
  mailSent = send_otp_mail(mail['email'], mail['info']['name'], code)
  mails.delete_many({'email': mail['email']})
  mails.insert_one({'email': mail['email'], 'code': code, 'mailSent': mailSent, 'timestamp': str(datetime.now()) })
