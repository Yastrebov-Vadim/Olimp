//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Olimp.DAL.DTO
{
    using System;
    using System.Collections.Generic;
    
    public partial class video_for_news
    {
        public System.Guid id_video_for_news { get; set; }
        public System.Guid id_news { get; set; }
        public Nullable<System.Guid> id_command_one { get; set; }
        public Nullable<System.Guid> id_command_two { get; set; }
        public string url_bd { get; set; }
        public string url_dir { get; set; }
    }
}
