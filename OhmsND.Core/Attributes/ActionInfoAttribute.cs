using System;

namespace OhmsND.Core.Attributes
{
    public class ActionInfoAttribute : Attribute
    {
        public string Color { get; set; }

        public ActionInfoAttribute(string color)
        {
            Color = color;
        }
    }
}