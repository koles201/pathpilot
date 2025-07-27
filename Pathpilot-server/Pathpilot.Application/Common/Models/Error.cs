namespace Pathpilot.Application.Common.Models;

public record Error(string Code, string Description);

public class ErrorOr<TValue>
{
    private readonly TValue? _value;
    private readonly List<Error>? _errors;

    private ErrorOr(TValue value)
    {
        _value = value;
        IsError = false;
    }

    private ErrorOr(List<Error> errors)
    {
        _errors = errors;
        IsError = true;
    }

    public bool IsError { get; }
    public TValue Value => IsError ? throw new InvalidOperationException() : _value!;
    public List<Error> Errors => !IsError ? throw new InvalidOperationException() : _errors!;

    public static implicit operator ErrorOr<TValue>(TValue value) => new(value);

    public static implicit operator ErrorOr<TValue>(Error error) => new(new List<Error> { error });

    public static implicit operator ErrorOr<TValue>(List<Error> errors) => new(errors);
}
