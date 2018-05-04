using Olimp.DAL.DTO;
using Olimp.DAL.Enum;
using Olimp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Olimp.DAL.Assest
{
    public class DbHelper
    {
        public static account SignInUser(AuthorizationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.login == request.Login && x.password == request.Password)
                    .FirstOrDefault();

                return account;
            }
        }

        public static admin SignInAdmin(AuthorizationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<admin> query = context.admins;

                var admin = query
                    .Where(x => x.login == request.Login && x.password == request.Password)
                    .FirstOrDefault();

                return admin;
            }
        }

        public static List<news> GetAllNews()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var allNews = query.ToList();

                return allNews;
            }
        }

        public static List<news> GetNewsActive(bool isTop)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var topNews = query.Where(x => isTop ? x.top == true && x.active == true : x.active == true).ToList();

                return topNews;
            }
        }

        public static news GetNews(Guid id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                return news;
            }
        }

        public static void SaveUserCode(int code, string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                DeletUserCode(email);

                email_code emailCode = new email_code
                {
                    id = Guid.NewGuid(),
                    email = email,
                    code_user = code
                };

                context.email_code.Add(emailCode);
                context.SaveChanges();
            }
        }

        public static void DeletUserCode(string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var emailCode = context.email_code
           .Where(x => x.email == email)
           .FirstOrDefault();
                if (emailCode == null)
                    return;

                context.email_code.Remove(emailCode);
                context.SaveChanges();
            }
        }

        public static bool CheckKode(string email, int code)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var emailCode = context.email_code
           .Where(x => x.email == email && x.code_user == code)
           .FirstOrDefault();
                if (emailCode == null)
                    return true;

                return false;
            }
        }

        public static account Registration(RegistrationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                account account = new account
                {
                    id = Guid.NewGuid(),
                    login = request.Login,
                    password = request.Password,
                    command_name = request.CommandName,
                    email = request.Email,
                    mobile = request.Mobile
                };

                context.accounts.Add(account);
                context.SaveChanges();

                return account;
            }
        }

        public static void ReplacePassvord(RegistrationRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.email == request.Email && x.login == request.Login)
                    .FirstOrDefault();

                account.password = request.Password;

                context.SaveChanges();
            }
        }

        public static void CheckLodinInEmail(SingCodeToEmailRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.email == request.Email && x.login == request.Login)
                    .FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Почта не привязана к данному акаунту");
            }
        }

        public static account GetAccountInfo(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.id == Id)
                    .FirstOrDefault();

                return account;
            }
        }

        public static string GetAccountAvatar(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<avatar> query = context.avatars;

                var avatar = query
                    .Where(x => x.account_id == Id)
                    .FirstOrDefault();

                return avatar == null ? "url(./content/img/avatar.png)": avatar.url_bd;
            }
        }

        public static List<player> GetPlayerForCommand(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var players = query.Where(x => x.id_command == Id).ToList();

                return players;
            }
        }

        public static string AddPlayer(Guid Id, PlayerRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                player newPlayer = new player
                {
                    id = Guid.NewGuid(),
                    name = request.Name,
                    surname = request.Surname,
                    middleName = request.MiddleName,
                    number = request.Number,
                    id_command = Id
                };

                context.players.Add(newPlayer);
                context.SaveChanges();

                return newPlayer.id.ToString();
            }
        }

        public static void DellPlayer(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id == Id).FirstOrDefault();

                if (player == null)
                    return;

                context.players.Remove(player);
                context.SaveChanges();
            }
        }

        public static void AddImageAvatar(Guid Id, string urlBd, string urlDir)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                avatar avatar = new avatar
                {
                    id = Guid.NewGuid(),
                    url_bd = urlBd,
                    url_dir = urlDir,
                    account_id = Id
                };

                context.avatars.Add(avatar);
                context.SaveChanges();
            }
        }

        public static void DellImageAvatar(Guid id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<avatar> query = context.avatars;

                var avatar = query.Where(x => x.account_id == id).FirstOrDefault();

                if (avatar == null)
                    return;

                context.avatars.Remove(avatar);
                context.SaveChanges();

                FileHelper.DellFile(avatar.url_dir);
            }
        }

        public static void EditAccountInfo(Guid id, EditAccountRequest accountInfo)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id == id).FirstOrDefault();

                if (account == null)
                    return;

                account.command_name = accountInfo.Name;
                account.email = accountInfo.Email;
                account.mobile = accountInfo.Phone;

                context.SaveChanges();

                if (accountInfo.Command.Any())
                    EditPlayertInfo(accountInfo.Command);
            }
        }

        public static void EditPlayertInfo(List<Player> players)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                foreach (Player item in players)
                {
                    var id = Guid.Parse(item.PlayerId);
                    var player = query.Where(x => x.id == id).FirstOrDefault();

                    if (player == null)
                        continue;

                    player.number = item.Number;

                    context.SaveChanges();
                }
            }
        }

        public static List<account> GetCommand()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var accounts = query.ToList();
                return accounts;
            }
        }

        public static string AddNews(ElementRequest request)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                news news = new news
                {
                    id = Guid.NewGuid(),
                    date = DateTime.Now.Date,
                    type = Convert.ToInt32(request.Txt),
                    top = false,
                    active = false
                };

                context.news.Add(news);
                context.SaveChanges();

                return news.id.ToString();
            }
        }

        public static void SaveNews(string newsId, string title, string text, bool top, string CommandOne, string CommandTwo)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(newsId);

                IQueryable<news> query = context.news;

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                news.title = title;
                news.text = text;
                news.top = top;
                news.date = DateTime.Now.Date;
                if (CommandOne.Any())
                {
                    news.command_one = Guid.Parse(CommandOne);
                    BindingCommandForFoto(news.id,Guid.Parse(CommandOne), CommandNumber.One);
                }

                if (CommandTwo.Any())
                {
                    news.command_two = Guid.Parse(CommandTwo);
                    BindingCommandForFoto(news.id, Guid.Parse(CommandTwo), CommandNumber.Two);
                }

                context.SaveChanges();
            }
        }

        public static void BindingCommandForFoto(Guid newsId, Guid CommandId, CommandNumber number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                foreach(var photo in photos)
                {
                    switch (number)
                    {
                        case CommandNumber.One:
                            photo.id_command_one = CommandId;
                            break;
                        case CommandNumber.Two:
                            photo.id_command_two = CommandId;
                            break;
                    }
                }

                context.SaveChanges();
            }
        }

        public static List<img_for_news> GetPhotoForNews(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                return photos;
            }
        }

        public static string GetVideoForNews(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<video_for_news> query = context.video_for_news;

                var video = query.Where(x => x.id_news == newsId).FirstOrDefault();

                return video == null ? String.Empty : video.url_bd;
            }
        }

        public static List<string> GetPhotoForNewsDir(Guid newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.Where(x => x.id_news == newsId).ToList();

                var urls = new List<string>();

                if (!photos.Any())
                    return urls;

                foreach (var photo in photos)
                {
                    urls.Add(photo.url_dir);
                    context.img_for_news.Remove(photo);
                    context.SaveChanges();
                }

                return urls;
            }
        }

        public static img_for_news AddImgForNews(string newsId, string urlDir, string urlBd)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                img_for_news img = new img_for_news
                {
                    id = Guid.NewGuid(),
                    id_news = Guid.Parse(newsId),
                    url_dir = urlDir,
                    url_bd = urlBd
                };

                context.img_for_news.Add(img);
                context.SaveChanges();

                return img;
            }
        }

        public static string AddVideoForNews(string videoId, string urlDir, string urlBd)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                video_for_news video = new video_for_news
                {
                    id = Guid.NewGuid(),
                    id_news = Guid.Parse(videoId),
                    url_dir = urlDir,
                    url_bd = urlBd
                };

                context.video_for_news.Add(video);
                context.SaveChanges();

                return video.url_bd;
            }
        }

        public static int DellNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var id = Guid.Parse(newsId);

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                context.news.Remove(news);
                context.SaveChanges();

                return news.type;
            }
        }

        public static void DellPhotoForNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var id = Guid.Parse(newsId);

                var photos = query.Where(x => x.id_news == id).ToList();

                if (!photos.Any())
                    return;

                foreach (var photo in photos)
                {
                    FileHelper.DellFile(photo.url_dir);
                    context.img_for_news.Remove(photo);
                    context.SaveChanges();
                }
            }
        }

        public static void DellVideoForNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<video_for_news> query = context.video_for_news;

                var id = Guid.Parse(newsId);

                var videos = query.Where(x => x.id_news == id).ToList();

                if (!videos.Any())
                    return;

                foreach (var video in videos)
                {
                    FileHelper.DellFile(video.url_dir);
                    context.video_for_news.Remove(video);
                    context.SaveChanges();
                }
            }
        }

        public static void DellPhoto(string photoId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var id = Guid.Parse(photoId);

                var photo = query.Where(x => x.id == id).FirstOrDefault();

                if (photo == null)
                    throw new ApplicationException("Фото не найдено");

                FileHelper.DellFile(photo.url_dir);
                context.img_for_news.Remove(photo);
                context.SaveChanges();
            }
        }

        public static bool ActiveNews(string newsId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<news> query = context.news;

                var id = Guid.Parse(newsId);

                var news = query.Where(x => x.id == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдено");

                news.active = !news.active;

                context.SaveChanges();

                return news.active;
            }
        }

        public static List<img_for_news> GetPhoto()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var photos = query.ToList();
                return photos;
            }
        }
    }
}
