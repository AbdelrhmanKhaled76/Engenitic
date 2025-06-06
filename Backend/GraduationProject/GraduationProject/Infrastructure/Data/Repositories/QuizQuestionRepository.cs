﻿using GraduationProject.Common.Extensions;
using GraduationProject.Domain.DTOs;
using GraduationProject.Domain.Models;
using GraduationProject.Infrastructure.Data.Repositories.Base;
using GraduationProject.Infrastructure.Data.Repositories.interfaces;
using Microsoft.EntityFrameworkCore;

namespace GraduationProject.Infrastructure.Data.Repositories
{

    public class QuizQuestionRepository : BulkRepository<QuizQuestion, int>, IQuizQuestionRepository
    {
        public QuizQuestionRepository(AppDbContext context) : base(context)
        {
            
        }

        public async Task<Dictionary<int, UserAnswerDTO>> GetQuizWithQuestionsByIdAsync(int quizId)
        {
            return await _dbSet
                .Include(q => q.Answers)
                .Where(x => x.QuizId == quizId)
                .QuestionWithAnswer()
                .AsSingleQuery()
                .ToDictionaryAsync((x) => x.QuestionId);
        }

    }
}
