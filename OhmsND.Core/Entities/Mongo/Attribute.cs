using MongoDB.Bson.Serialization.Attributes;

namespace OhmsND.Core.Entities.Mongo
{
    public class Attribute
    {
        public byte Score { get; set; }

        [BsonIgnore]
        public int Modifier => Score / 2 - 5;
    }
}