using OlympusPortal.DateModel;
using OlympusPortal.Models;
using OlympusPortal.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Security;
using WebGrease.Css.Extensions;

namespace OlympusPortal.Assest
{
    public class DbHelper
    {
        private OlimpEntities context = new OlimpEntities();

        public string Login(AuthorizationRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.login == request.Login && x.password == request.Password)
                .FirstOrDefault();

            if (command == null)
                throw new ApplicationException("Неверный логин или пароль");

            FormsAuthentication.SetAuthCookie(command.id.ToString(), true);

            return command.command_name;
        }

        public string GetAccount(Guid UserId)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.id == UserId)
                .FirstOrDefault();

            if (command == null)
                throw new ApplicationException("Не найдена команда в системе. Обратитесь к администратору.");

            return command.command_name;
        }

        public List<NewsBriefly> GetNewsBriefly()
        {
            // IQueryable<news> query = context.news;

            // var news = query.ToList();

            var response = new List<NewsBriefly>();

            //if (news == null)
            //    return response;

            //foreach (var element in news)
            //{
            //    var urlVideo = string.Empty;
            //    var urlFoto = new List<string>();

            //    response.Add(new NewsBriefly(element.foto, element.title, element.text, element.date.ToShortDateString(), element.type, urlVideo, urlFoto));
            //}

            return response;
        }

        public void SaveUserCode(int code, string email)
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

        public void DeletUserCode(string email)
        {
            var emailCode = context.email_code
           .Where(x => x.email == email)
           .FirstOrDefault();
            if (emailCode == null)
                return;

            context.email_code.Remove(emailCode);
            context.SaveChanges();
        }

        public bool CheckKode(string email, int code)
        {
            var emailCode = context.email_code
           .Where(x => x.email == email && x.code_user == code)
           .FirstOrDefault();
            if (emailCode == null)
                return true;

            return false;
        }

        public void Registration(RegistrationRequest request)
        {
            command command = new command
            {
                id = Guid.NewGuid(),
                login = request.Login,
                password = request.Password,
                command_name = request.CommandName,
                email = request.Email,
                mobile = request.Mobile,
                foto = null
            };

            context.commands.Add(command);
            context.SaveChanges();

            FormsAuthentication.SetAuthCookie(command.id.ToString(), false);
        }

        public void ReplacePassvord(RegistrationRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.email == request.Email && x.login == request.Login)
                .FirstOrDefault();

            command.password = request.Password;

            context.SaveChanges();
        }

        public void CheckLodinInEmail(SingCodeToEmailRequest request)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.email == request.Email && x.login == request.Login)
                .FirstOrDefault();

            if (command == null)
                throw new ApplicationException("Почта не привязана к данному акаунту");
        }

        public GetAccountInfoResponse GetAccountInfo(Guid Id)
        {
            IQueryable<command> query = context.commands;

            var command = query
                .Where(x => x.id == Id)
                .FirstOrDefault();

            var foto = command.foto == null ? "url(./content/img/ava.png)" : command.foto;

            return new GetAccountInfoResponse(foto, command.command_name, command.mobile, command.email, GetPlayerForCommand(Id));
        }

        public List<Player> GetPlayerForCommand(Guid Id)
        {
            IQueryable<player> query = context.players;

            var players = query.Where(x => x.id_command == Id);

            List<Player> player = new List<Player>();

            if (players.Any())
            {
                players.ForEach(x =>
                {
                    player.Add(new Player(x.id.ToString(), x.name, x.surname, x.middleName, x.number));
                });
            }

            player.Sort((a, b) => a.Number <= b.Number ? -1 : 1);

            return player;
        }

        public ElementResponse AddPlayer(Guid Id, PlayerRequest request)
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

            return new ElementResponse(newPlayer.id.ToString());
        }

        public void DellPlayer(Guid Id)
        {
            IQueryable<player> query = context.players;

            var player = query.Where(x => x.id == Id).FirstOrDefault();

            if (player == null)
                return;

            context.players.Remove(player);
            context.SaveChanges();
        }

        public void GetImageAvatar(Guid Id, string url)
        {
            IQueryable<command> query = context.commands;

            var command = query.Where(x => x.id == Id).FirstOrDefault();

            if (command == null)
                return;

            command.foto = url;
            context.SaveChanges();
        }

        public void EditAccountInfo(Guid id, EditAccountRequest account)
        {
            IQueryable<command> query = context.commands;

            var command = query.Where(x => x.id == id).FirstOrDefault();

            if (command == null)
                return;

            command.command_name = account.Name;
            command.email = account.Email;
            command.mobile = account.Phone;

            context.SaveChanges();

            if (account.Command.Any())
                EditPlayertInfo(account.Command);
        }

        public void EditPlayertInfo(List<Player> players)
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

        public GetCommandsResponse GetCommand()
        {
            IQueryable<command> query = context.commands;

            var command = query.ToList();

            var commands = new List<Command>();

            foreach (command item in command)
            {
                Command commandElement = new Command
                {
                    Name = item.command_name,
                    Foto = item.foto,
                    Players = GetPlayerForCommand(item.id)
                };
                
                commands.Add(commandElement);
            }

            return new GetCommandsResponse(commands);
        }

        public GetCommandFilterResponse GetCommandFilter()
        {
            IQueryable<command> query = context.commands;

            var command = query.ToList();

            var commandFilter = new List<CommandFilter>();

            foreach (command item in command)
            {
                CommandFilter commandElement = new CommandFilter
                {
                    Name = item.command_name,
                   Id = item.id.ToString()
                };

                commandFilter.Add(commandElement);
            }

            return new GetCommandFilterResponse(commandFilter);
        }
    }
}