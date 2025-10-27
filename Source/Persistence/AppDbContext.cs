using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<AppEvent> Events { get; set; }

    public required DbSet<AppEventAttendee> AppEventAttendees { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppEventAttendee>(x => x.HasKey(a => new { a.AppEventId, a.UserId }));

        builder.Entity<AppEventAttendee>()
            .HasOne(x => x.User)
            .WithMany(x => x.Events)
            .HasForeignKey(x => x.UserId);

        builder.Entity<AppEventAttendee>()
            .HasOne(x => x.AppEvent)
            .WithMany(x => x.Attendees)
            .HasForeignKey(x => x.AppEventId);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
