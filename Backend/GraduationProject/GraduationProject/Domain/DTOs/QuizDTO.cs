﻿using GraduationProject.Domain.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace GraduationProject.Domain.DTOs
{
    public class QuizDTO : IPostitionable
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [NotEmptyOrWhiteSpace]
        public string Title { get; set; } = null!;
        [Required]
        [NotEmptyOrWhiteSpace]
        [StringLength(1000)]
        public string Description { get; set; } = null!;    
        public int Position { get; set; }
        [Required]
        [NotEmptyOrWhiteSpace]
        public string VideoUrl { get; set; } = null!;

        [Required]
        [UniquePostition]
        [NotEmptyCollection]
        [MinLength(1)]
        public List<QuestionDTO> Questions { get; set; } = new List<QuestionDTO>();


    }
}
