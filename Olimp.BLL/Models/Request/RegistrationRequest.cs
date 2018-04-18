namespace Olimp.BLL.Models
{
    public class RegistrationRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string CommandName { get; set; }
        public string Mobile { get; set; }
        public int Code { get; set; }
    }
}