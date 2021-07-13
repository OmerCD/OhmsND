using MongoORM4NetCore.Interfaces;

namespace OhmsND.Core.Entities.Mongo
{
    public class Player : DbObject
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}