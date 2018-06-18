using Olimp.DAL.DTO;
using Olimp.DAL.Enum;
using Olimp.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
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

                var news = query.Where(x => x.id_news == id).FirstOrDefault();

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
                    id_email_code = Guid.NewGuid(),
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
                    id_account = Guid.NewGuid(),
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

        public static void CheckLodinInEmail(string login, string email)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query
                    .Where(x => x.email == email && x.login == login)
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
                    .Where(x => x.id_account == Id)
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
                    .Where(x => x.id_account == Id)
                    .FirstOrDefault();

                return avatar == null ? "url(./content/img/avatar.png)" : avatar.url_bd;
            }
        }

        public static List<player> GetPlayerForCommand(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var players = query.Where(x => x.id_account == Id).ToList();

                return players;
            }
        }

        public static string AddPlayer(Guid Id, string middleName, string name, string surname, int number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                player newPlayer = new player
                {
                    id_player = Guid.NewGuid(),
                    name = name,
                    surname = surname,
                    middleName = middleName,
                    number = number,
                    id_account = Id
                };

                context.players.Add(newPlayer);
                context.SaveChanges();

                return newPlayer.id_player.ToString();
            }
        }

        public static void CheckAddPlayer(Guid commandId, int number)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_account == commandId && x.number == number).FirstOrDefault();

                if (player != null)
                    throw new ApplicationException("Игрок с таким номером уже существует");

            }
        }

        public static void DellPlayer(Guid Id)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_player == Id).FirstOrDefault();

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
                    id_avatar = Guid.NewGuid(),
                    url_bd = urlBd,
                    url_dir = urlDir,
                    id_account = Id
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

                var avatar = query.Where(x => x.id_account == id).FirstOrDefault();

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

                var account = query.Where(x => x.id_account == id).FirstOrDefault();

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
                    var player = query.Where(x => x.id_player == id).FirstOrDefault();

                    if (player == null)
                        continue;

                    player.name = item.Name;
                    player.middleName = item.MiddleName;
                    player.surname = item.Surname;
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

        public static string AddNews(int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                news news = new news
                {
                    id_news = Guid.NewGuid(),
                    date = DateTime.Now.Date,
                    type = type,
                    top = false,
                    active = false
                };

                context.news.Add(news);
                context.SaveChanges();

                return news.id_news.ToString();
            }
        }

        public static void SaveNews(string newsId, string title, string text, bool top, string CommandOne, string CommandTwo)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(newsId);

                IQueryable<news> query = context.news;

                var news = query.Where(x => x.id_news == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                news.title = title;
                news.text = text;
                news.top = top;
                news.date = DateTime.Now.Date;
                if (CommandOne.Any())
                {
                    news.id_command_one = Guid.Parse(CommandOne);
                    BindingCommandForFoto(news.id_news, Guid.Parse(CommandOne), CommandNumber.One);
                }

                if (CommandTwo.Any())
                {
                    news.id_command_two = Guid.Parse(CommandTwo);
                    BindingCommandForFoto(news.id_news, Guid.Parse(CommandTwo), CommandNumber.Two);
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

                foreach (var photo in photos)
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
                    id_img_for_news = Guid.NewGuid(),
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
                    id_video_for_news = Guid.NewGuid(),
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

                var news = query.Where(x => x.id_news == id).FirstOrDefault();

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

                var photo = query.Where(x => x.id_img_for_news == id).FirstOrDefault();

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

                var news = query.Where(x => x.id_news == id).FirstOrDefault();

                if (news == null)
                    throw new ApplicationException("Новость не найдена");

                news.active = !news.active;

                context.SaveChanges();

                return news.active;
            }
        }

        public static Tuple<List<img_for_news>, int, int> GetPhoto(int page, string commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<img_for_news> query = context.img_for_news;

                var pageSize = 20;
                int totalPages;
                var photos = new List<img_for_news>();

                if (commandId == null)
                {
                    totalPages = (int)(Math.Ceiling(query.Count() / (decimal)pageSize));
                    photos = query.OrderBy(x => x.id_img_for_news).Skip((page - 1) * pageSize).Take(pageSize).ToList();
                }
                else
                {
                    var id = Guid.Parse(commandId);
                    totalPages = (int)(Math.Ceiling(query.Where(c => c.id_command_one == id || c.id_command_two == id).Count() / (decimal)pageSize));
                    photos = query.Where(c => c.id_command_one == id || c.id_command_two == id).OrderBy(x => x.id_img_for_news).Skip((page - 1) * pageSize).Take(pageSize).ToList();

                }

                return Tuple.Create(photos, totalPages, page);
            }
        }

        public static turnament AddTurnament(int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                turnament turnament = new turnament
                {
                    id_turnament = Guid.NewGuid(),
                    type = type,
                    state_code = true,
                    step = 0,
                    name = "Новый турнир",
                    description = string.Empty,
                    сontribution_game = 0,
                    сontribution_tournament = 0
                };

                context.turnaments.Add(turnament);
                context.SaveChanges();

                return turnament;
            }
        }

        public static List<turnament> GetAllTurnament()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnaments = query.ToList();

                return turnaments;
            }
        }

        public static void DellTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id_turnament == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                context.turnaments.Remove(turnament);
                context.SaveChanges();
            }
        }

        public static turnament GetTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;
                var turnament = query.Where(x => x.id_turnament == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                return turnament;
            }
        }

        public static void SaveTurnamentInfo(string turnamentId, string name, string description, int type, int contribution_tournament, int contribution_game, DateTime? dateStart)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(turnamentId);

                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id_turnament == id).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                turnament.name = name;
                turnament.description = description;
                turnament.сontribution_game = contribution_game;
                turnament.сontribution_tournament = contribution_tournament;
                turnament.type = type;
                turnament.date_start = dateStart;

                context.SaveChanges();
            }
        }

        public static void ChangeStep(string turnamentId, int step)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var id = Guid.Parse(turnamentId);

                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id_turnament == id).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                turnament.step = step;

                context.SaveChanges();
            }
        }

        public static List<turnament> GetTurnaments(int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                return query.Where(x => x.step == type).ToList();
            }
        }

        public static List<turnament> GetTurnamentsForUser(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var query = from tr in context.turnaments.Where(x => x.step == 3)
                            join ac in context.command_for_turnament.Where(x => x.id_account == accountId) on tr.id_turnament equals ac.id_turnament into ps
                            from ac in ps.DefaultIfEmpty()
                            select new
                            {
                                tr.id_turnament,
                                tr.name,
                                tr.description,
                                tr.date_start,
                                tr.type,
                            };

                var turnaments = query.ToList();

                var response = new List<turnament>();

                foreach (var item in turnaments)
                {
                    var tur = new turnament
                    {
                        id_turnament = item.id_turnament,
                        name = item.name,
                        description = item.description,
                        date_start = item.date_start,
                        type = item.type,
                    };

                    response.Add(tur);

                }

                return response;
            }
        }

        public static void DeclareTournament(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_account == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament != null)
                    throw new ApplicationException("Ошибка: повторная заявка на турнир");

                command_for_turnament item = new command_for_turnament
                {
                    id_command_for_turnament = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    id_account = commandId,
                    status = false
                };

                context.command_for_turnament.Add(item);
                context.SaveChanges();
            }
        }

        public static List<Command> GetCommandForTurnament(Guid turnamentId, bool state)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var query = from cm in context.command_for_turnament.Where(x => x.id_turnament == turnamentId)
                            join ac in context.accounts on cm.id_account equals ac.id_account into ps
                            from ac in ps.DefaultIfEmpty()
                            select new
                            {
                                ac.id_account,
                                ac.command_name,
                                cm.status
                            };

                var commands = query.ToList();

                var response = new List<Command>();

                foreach (var command in commands)
                {
                    if (!state)
                        if (!command.status)
                            continue;

                    var item = new Command
                    {
                        Id = command.id_account.ToString(),
                        Name = command.command_name,
                        Status = command.status
                    };

                    response.Add(item);

                }

                return response;
            }
        }

        public static void CheckCountCommand(Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_account == commandId).ToList();

                if (player.Count < 7)
                    throw new ApplicationException("Колличество игроков не соответствует регламенту");
            }
        }

        public static string GetEmail(Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id_account == commandId).FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Команда не найдена");

                return account.email;
            }
        }

        public static string GetTurnamentName(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<turnament> query = context.turnaments;

                var turnament = query.Where(x => x.id_turnament == turnamentId).FirstOrDefault();

                if (turnament == null)
                    throw new ApplicationException("Турнир не найден");

                return turnament.name;
            }
        }

        public static string GetTurnamentNameForGroup(Guid grouptId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<group_for_turnament> query = context.group_for_turnament;

                var group = query.Where(x => x.id_group_for_turnament == grouptId).FirstOrDefault();

                if (group == null)
                    throw new ApplicationException("Группа не найдена");

                return GetTurnamentName(group.id_turnament);
            }
        }

        public static string GetTurnamentNameForPlayOff(Guid playOffId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<circle_for_turnament> query = context.circle_for_turnament;

                var playOff = query.Where(x => x.id_circle_for_turnament == playOffId).FirstOrDefault();

                if (playOff == null)
                    throw new ApplicationException("PlayOff не найден");

                return GetTurnamentName(playOff.id_turnament);
            }
        }

        public static string GetAccountEmail(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<account> query = context.accounts;

                var account = query.Where(x => x.id_account == accountId).FirstOrDefault();

                if (account == null)
                    throw new ApplicationException("Команда не найдена");

                return account.email;
            }
        }

        public static void AcceptDeclare(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_account == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament == null)
                    throw new ApplicationException("Команда не найдена");

                commandForTurnament.status = true;

                context.SaveChanges();
            }
        }

        public static void RemoveDeclare(Guid turnamentId, Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<command_for_turnament> query = context.command_for_turnament;

                var commandForTurnament = query.Where(x => x.id_account == commandId && x.id_turnament == turnamentId).FirstOrDefault();

                if (commandForTurnament == null)
                    throw new ApplicationException("Турнир не найден");

                context.command_for_turnament.Remove(commandForTurnament);
                context.SaveChanges();
            }
        }

        public static void CreatePositionCommand(List<Command> commands, Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var index = 1;

                foreach (var command in commands)
                {
                    position_command_for_turnament position = new position_command_for_turnament
                    {
                        id_position_command_for_turnament = Guid.NewGuid(),
                        command_name = command.Name,
                        id_account = Guid.Parse(command.Id),
                        id_turnament = turnamentId,
                        position = index,
                        fake_code = command.FakeCode
                    };

                    index++;

                    context.position_command_for_turnament.Add(position);
                    context.SaveChanges();
                }
            }
        }

        public static void CreatePositionCommand(position_command_for_turnament command, Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                position_command_for_turnament position = new position_command_for_turnament
                {
                    id_position_command_for_turnament = Guid.NewGuid(),
                    command_name = command.command_name,
                    id_account = command.id_account,
                    id_turnament = turnamentId,
                    position = 0,
                    fake_code = false
                };

                context.position_command_for_turnament.Add(position);
                context.SaveChanges();
            }
        }

        public static void CreateGameForTurnament(Guid turnamentId, Guid commandOneId, Guid commandTwoId, string commandOneName, string commandTwoName, int tour, bool fakeCode)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                if (!fakeCode)
                {
                    game_for_turnament game = new game_for_turnament
                    {
                        id_game_for_turnament = Guid.NewGuid(),
                        id_turnament = turnamentId,
                        id_command_one = commandOneId,
                        id_command_two = commandTwoId,
                        command_one_name = commandOneName,
                        command_two_name = commandTwoName,
                        number_tour = tour,
                        command_one_points = 0,
                        command_two_points = 0,
                        state_code = false,
                        status_code = 0
                    };

                    context.game_for_turnament.Add(game);
                    context.SaveChanges();
                }
            }
        }

        public static List<position_command_for_turnament> GetPositionCommand(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId).ToList();
            }
        }

        public static List<game_for_turnament> GetGameForTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId).ToList();
            }
        }

        public static void DivideForDay(Guid turnamentId, int tour, List<DateTime> days, List<string> arens)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();

                int i = 0;
                var splits = from item in game
                             group item by i++ % days.Count into part
                             select part.ToList();

                var gameDays = splits.ToList();
                var j = 0;

                gameDays.ForEach(x =>
                {
                    x.ForEach(y =>
                    {
                        y.date_start = days[j];
                        y.id_game_arena = Guid.Parse(arens[j]);
                        context.SaveChanges();
                    });

                    j++;
                });
            }
        }

        public static List<game_arena> GetArens()
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_arena> query = context.game_arena;

                return query.ToList();
            }
        }

        public static void ChangeArena(Guid turnamentId, int tour, DateTime? startDate, Guid arena)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;
                var game = new List<game_for_turnament>();

                if (startDate == null)
                    game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();
                else
                    game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour && x.date_start == startDate).ToList();

                game.ForEach(x =>
                {
                    x.id_game_arena = arena;
                    context.SaveChanges();
                });
            }
        }

        public static void ChangeDate(Guid turnamentId, int tour, DateTime? startDate, DateTime NewStartDate)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;
                var game = new List<game_for_turnament>();

                if (startDate == null)
                    game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();
                else
                    game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour && x.date_start == startDate).ToList();

                game.ForEach(x =>
                {
                    x.date_start = NewStartDate;
                    context.SaveChanges();
                });
            }
        }

        public static void ChangeStatusTour(Guid turnamentId, int tour, int step)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();

                game.ForEach(x =>
                {
                    x.status_code = step;
                    context.SaveChanges();
                });
            }
        }

        public static List<game_for_turnament> GetGameForTout(Guid turnamentId, int tour)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();
            }
        }

        public static string GetArenaName(Guid? arenaId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                if (arenaId == null)
                    return string.Empty;

                IQueryable<game_arena> query = context.game_arena;

                var arena = query.Where(x => x.id_game_arena == arenaId).FirstOrDefault();

                if (arena == null)
                    throw new ApplicationException("Арена не найдена");

                return arena.name;
            }
        }

        public static void CompleteGame(Guid turnamentId, Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_game_for_turnament == gameId).FirstOrDefault();

                var commandOneGoals = GetGoalsCommandForTurnament(turnamentId, game.id_command_one, gameId);
                var commandTwoGoals = GetGoalsCommandForTurnament(turnamentId, game.id_command_two, gameId);

                game.command_one_points = commandOneGoals.Count == commandTwoGoals.Count ? 1 : commandOneGoals.Count > commandTwoGoals.Count ? 3 : 0;
                game.command_two_points = commandOneGoals.Count == commandTwoGoals.Count ? 1 : commandOneGoals.Count < commandTwoGoals.Count ? 3 : 0;
                game.status_code = 2;

                context.SaveChanges();

                EditPoints(turnamentId, game.id_command_one, game.command_one_points);
                EditPoints(turnamentId, game.id_command_two, game.command_two_points);
            }
        }

        public static void EditPoints(Guid turnamentId, Guid commandId, int points)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                var position = query.Where(x => x.id_turnament == turnamentId && x.id_account == commandId).FirstOrDefault();

                if (position == null)
                    throw new ApplicationException("Позиция не найдена");

                position.points += points;

                context.SaveChanges();
            }
        }

        public static List<game_for_turnament> CloseTour(Guid turnamentId, int tour)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == turnamentId && x.number_tour == tour).ToList();

                game.ForEach(x =>
                {
                    x.status_code = 3;
                    context.SaveChanges();
                });

                return game;
            }
        }

        public static List<game_for_turnament> CloseTour(Guid circleId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<circle_for_turnament> query = context.circle_for_turnament;

                var circle = query.Where(x => x.id_circle_for_turnament == circleId).FirstOrDefault();

                if (circle == null)
                    throw new ApplicationException("Тур плей-офф не найден");

                circle.state_code = true;
                context.SaveChanges();

                return CloseGameForTour(circleId);
            }
        }

        public static List<game_for_turnament> CloseGameForTour(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == turnamentId).ToList();

                game.ForEach(x =>
                {
                    x.status_code = 3;
                    context.SaveChanges();
                });

                return game;
            }
        }

        public static void SavePlaceCommand(Guid turnamentId, Guid commandId, int place)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                var position = query.Where(x => x.id_turnament == turnamentId && x.id_account == commandId).FirstOrDefault();

                position.place = place;
                context.SaveChanges();
            }
        }

        public static List<group_for_turnament> GetTurnamentGroups(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<group_for_turnament> query = context.group_for_turnament;

                var groups = query.Where(x => x.id_turnament == turnamentId).ToList();

                if (groups == null)
                    return new List<group_for_turnament>();

                return groups;
            }
        }

        public static List<group_for_turnament> CreateGroupForTurnament(Guid turnamentId, int countGroup)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var groupsTurnament = new List<group_for_turnament>();

                for (var i = 1; i <= countGroup; i++)
                {
                    group_for_turnament group = new group_for_turnament
                    {
                        id_group_for_turnament = Guid.NewGuid(),
                        id_turnament = turnamentId,
                        position = i
                    };

                    groupsTurnament.Add(group);
                    context.group_for_turnament.Add(group);
                    context.SaveChanges();
                }

                return groupsTurnament;
            }
        }

        public static List<position_command_for_turnament> GetPositionTopForGroup(Guid turnamentId, Guid groupId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                var position = query.Where(x => x.id_turnament == groupId).ToList();
                position.Sort((a, b) => a.place <= b.place ? -1 : 1);
                var topPosition = position.Take(2).ToList();

                return topPosition;
            }
        }

        public static Guid AddCircleForTurmament(Guid turnamentId, int index)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var circle = new circle_for_turnament
                {
                    id_circle_for_turnament = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    numbr_circle = index
                };

                context.circle_for_turnament.Add(circle);
                context.SaveChanges();

                return circle.id_circle_for_turnament;
            }
        }

        public static List<circle_for_turnament> GetCircleForTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<circle_for_turnament> query = context.circle_for_turnament;

                return query.Where(x => x.id_turnament == turnamentId).ToList();
            }
        }

        public static List<Command> GetCommandGoNewTour(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == turnamentId).ToList();

                var commands = new List<Command>();

                game.ForEach(x =>
                {
                    var commandOne = DbHelper.GetGoalsCommandForTurnament(turnamentId, x.id_command_one, x.id_game_for_turnament);
                    var commandTwo = DbHelper.GetGoalsCommandForTurnament(turnamentId, x.id_command_two, x.id_game_for_turnament);

                    if (commandOne.Count > commandTwo.Count)
                    {
                        commands.Add(new Command
                        {
                            Id = x.id_command_one.ToString(),
                            Name = x.command_one_name
                        });
                    }
                    if (commandOne.Count < commandTwo.Count)
                    {
                        commands.Add(new Command
                        {
                            Id = x.id_command_two.ToString(),
                            Name = x.command_two_name
                        });
                    }
                });

                return commands;
            }
        }

        public static void SetCommandForNewTour(Guid circleNextId, List<Command> commands)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_turnament == circleNextId).ToList();

                commands.ForEach(c =>
                {
                    for (var i = 0; i < game.Count; i++)
                    {
                        if (game[i].id_command_one == Guid.Empty)
                        {
                            game[i].id_command_one = Guid.Parse(c.Id);
                            game[i].command_one_name = c.Name;
                            context.SaveChanges();
                            break;
                        }
                        if (game[i].id_command_two == Guid.Empty)
                        {
                            game[i].id_command_two = Guid.Parse(c.Id);
                            game[i].command_two_name = c.Name;
                            context.SaveChanges();
                            break;
                        }
                    };
                });
            }
        }

        public static void SetPositionCommandForNewTour(Guid circleNextId, List<Command> commands)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<position_command_for_turnament> query = context.position_command_for_turnament;

                var position = query.Where(x => x.id_turnament == circleNextId).ToList();

                commands.ForEach(c =>
                {
                    for (var i = 0; i < position.Count; i++)
                    {
                        if (position[i].id_account == Guid.Empty)
                        {
                            position[i].id_account = Guid.Parse(c.Id);
                            position[i].command_name = c.Name;
                            context.SaveChanges();
                            break;
                        }
                    };
                });
            }
        }

        public static List<goal> GetGoalsCommandForTurnament(Guid turnamentId, Guid accountId, Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<goal> query = context.goals;

                return query.Where(x => x.id_turnament == turnamentId && x.id_account == accountId && x.id_game_for_turnament == gameId).ToList();
            }
        }

        public static List<foul_card> GetCardCommandForTurnament(Guid turnamentId, Guid accountId, Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<foul_card> query = context.foul_card;

                return query.Where(x => x.id_turnament == turnamentId && x.id_account == accountId && x.id_game_for_turnament == gameId).ToList();
            }
        }

        public static List<PlayerAdmin> GetPlayerForTurnament(Guid turnamentId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var query = from cm in context.command_for_turnament.Where(x => x.id_turnament == turnamentId)
                            join ac in context.accounts on cm.id_account equals ac.id_account into ps
                            from ac in ps.DefaultIfEmpty()
                            join p in context.players on ac.id_account equals p.id_account into pl
                            from p in pl.DefaultIfEmpty()
                            select new
                            {
                                p.id_player,
                                p.surname,
                                commandId = ac.id_account
                            };

                var players = query.ToList();

                var response = new List<PlayerAdmin>();

                foreach (var player in players)
                {
                    var item = new PlayerAdmin
                    {
                        PlayerId = player.id_player.ToString(),
                        CommandId = player.commandId.ToString(),
                        Surname = player.surname
                    };

                    response.Add(item);
                }

                return response;
            }
        }

        public static void AddGoals(Guid turnamentId, Guid commandId, Guid playerId, Guid gameId, int time)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var adversaryId = GetAdversary(gameId, commandId);

                var goal = new goal
                {
                    id_goal = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    id_account = commandId,
                    id_player = playerId,
                    id_game_for_turnament = gameId,
                    time = time,
                    id_adversary = adversaryId
                };

                context.goals.Add(goal);
                context.SaveChanges();
            }
        }

        public static Guid GetAdversary(Guid gameId,  Guid commandId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_game_for_turnament == gameId).FirstOrDefault();

                if (game.id_command_one == commandId)
                    return game.id_command_two;
                
                return game.id_command_one;
            }
        }

        public static void AddCard(Guid turnamentId, Guid commandId, Guid playerId, Guid gameId, int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var card = new foul_card
                {
                    id_foul_card = Guid.NewGuid(),
                    id_turnament = turnamentId,
                    id_account = commandId,
                    id_player = playerId,
                    id_game_for_turnament = gameId,
                    type = type
                };

                context.foul_card.Add(card);
                context.SaveChanges();
            }
        }

        public static bool CheckCommandSkip(Guid turnamentId, Guid commandId, Guid playerId, int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<foul_card> query = context.foul_card;

                var card = query.Where(x => x.id_turnament == turnamentId && x.id_account == commandId && x.id_player == playerId && x.type == type).ToList();

                if (card != null && (card.Count % 2) != 0)
                    return true;

                return false;
            }
        }

        public static void CommandSkip(Guid turnamentId, Guid commandId, Guid playerId, Guid gameId, int type)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var skipMatch = new skip_match();

                switch (type)
                {
                    case 1:
                        if (CheckCommandSkip(turnamentId, commandId, playerId, type))
                        {
                            skipMatch = new skip_match
                            {
                                id_skip_match = Guid.NewGuid(),
                                id_turnament = turnamentId,
                                id_account = commandId,
                                id_player = playerId,
                                date_appointment = GetDateGame(gameId).Value
                            };

                            context.skip_match.Add(skipMatch);
                        }
                        break;
                    case 2:
                        skipMatch = new skip_match
                        {
                            id_skip_match = Guid.NewGuid(),
                            id_turnament = turnamentId,
                            id_account = commandId,
                            id_player = playerId,
                            date_appointment = GetDateGame(gameId).Value
                        };

                        context.skip_match.Add(skipMatch);
                        break;
                }

                context.SaveChanges();
            }
        }

        public static void RemoveSkip(Guid turnamentId, Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var commandsId = GetCommandForGame(gameId);

                IQueryable<skip_match> query = context.skip_match;

                var skip = query.Where(x => x.id_turnament == turnamentId && (x.id_account == commandsId.Item1 || x.id_account == commandsId.Item2)).ToList();

                var skipMatchs = skip.Where(x => x.date_appointment.Date < GetDateGame(gameId)).ToList();

                if (skipMatchs.Count == 0)
                    return;

                skipMatchs.ForEach(x =>
                {
                    context.skip_match.Remove(x);
                    context.SaveChanges();
                });
            }
        }

        public static DateTime? GetDateGame(Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var commandsId = GetCommandForGame(gameId);

                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_game_for_turnament == gameId).FirstOrDefault();

                return game.date_start;
            }
        }


        public static Tuple<Guid, Guid> GetCommandForGame(Guid gameId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => x.id_game_for_turnament == gameId).FirstOrDefault();

                return Tuple.Create(game.id_command_one, game.id_command_two);
            }
        }

        public static string AddArena(string name)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                var arena = new game_arena
                {
                    id_game_arena = Guid.NewGuid(),
                    name = name,
                };

                context.game_arena.Add(arena);
                context.SaveChanges();

                return arena.id_game_arena.ToString();
            }
        }

        public static string GetPlayerName(Guid playerId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_player == playerId).FirstOrDefault();

                if (player == null)
                    throw new ApplicationException("Игрок не найден");

                return player.surname;
            }
        }

        public static player GetPlayer(Guid playerId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<player> query = context.players;

                var player = query.Where(x => x.id_player == playerId).FirstOrDefault();

                if (player == null)
                    throw new ApplicationException("Игрок не найден");

                return player;
            }
        }

        public static void DellArena(Guid arenaId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_arena> query = context.game_arena;

                var arena = query.Where(x => x.id_game_arena == arenaId).FirstOrDefault();

                if (arena == null)
                    throw new ApplicationException("Арена не найдена");

                context.game_arena.Remove(arena);
                context.SaveChanges();
            }
        }

        public static List<skip_match> GetSkip(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<skip_match> query = context.skip_match;

                var skipMatch = query.Where(x => x.id_account == accountId).ToList();

                return skipMatch;
            }
        }

        public static int GetScoreGoals(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<goal> query = context.goals;

                var goal = query.Where(x => x.id_account == accountId).ToList();

                return goal.Count;
            }
        }

        public static int GetMissedGoals(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<goal> query = context.goals;

                var goal = query.Where(x => x.id_adversary == accountId).ToList();

                return goal.Count;
            }
        }

        public static List<game_for_turnament> GetGameForCommand(Guid accountId)
        {
            using (OlimpEntities context = new OlimpEntities())
            {
                IQueryable<game_for_turnament> query = context.game_for_turnament;

                var game = query.Where(x => (x.id_command_one == accountId || x.id_command_two == accountId) && x.status_code == 3).ToList();

                return game;
            }
        }
    }
}