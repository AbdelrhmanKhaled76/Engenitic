﻿using GraduationProject.Domain.Models;
using GraduationProject.Infrastructure.Data.Repositories.Base;
using GraduationProject.Infrastructure.Data.Repositories.interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GraduationProject.Infrastructure.Data.Repositories
{

    public class UserLoginRepository : Repository<IdentityUserLogin<int>>, IUserLoginRepository
    {

        public UserLoginRepository(AppDbContext context) : base(context) { }

        public async Task<bool> ContainsLoginProvider(int userId, string provider)
        {
            return await _dbSet.Where(x => x.UserId == userId)
                .Select(x => x.LoginProvider)
                .ContainsAsync(provider);
        }
    }
}
