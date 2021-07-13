
using System;

namespace OhmsND.Core.Attributes
{
    public class IndexNameAttribute : Attribute
    {
        public string IndexName { get; }

        public IndexNameAttribute(string indexName)
        {
            IndexName = indexName;
        }
    }
}