using System.Net;
using System.Net.Mail;

namespace Olimp.BLL.Assest
{
    public class SendEmailBLL
    {
        public static void SendEmail(string subject, string body, string email)
        {
            MailAddress from = new MailAddress("Olimp-Portal@yandex.ru", "Olimp");
            MailAddress to = new MailAddress(email);
            MailMessage mail = new MailMessage(from, to);
            mail.Subject = subject;
            mail.Body = body;

            SmtpClient client = new SmtpClient();
            client.Host = "smtp.yandex.ru";
            client.Port = 587;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("Olimp-Portal@yandex.ru", "olimp2portal2ru");
            client.Send(mail);
        }
    }
}