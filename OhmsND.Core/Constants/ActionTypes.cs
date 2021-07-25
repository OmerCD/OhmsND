using OhmsND.Core.Attributes;

namespace OhmsND.Core.Constants
{
    public enum ActionTypes
    {
        [ActionInfo("white")]
        None,
        [ActionInfo("green")]
        Check,
        [ActionInfo("blue")]
        ToHit,
        [ActionInfo("red")]
        Damage
    }
}