﻿using GraduationProject.Domain.ValidationAttributes;
using System.ComponentModel.DataAnnotations;

namespace GraduationProject.Domain.DTOs
{
    public class AnswerDTO : IPostitionable
    {
        public int Id { get; set; }

        [Required]
        [StringLength(500)]
        [NotEmptyOrWhiteSpace]
        public string AnswerText { get; set; } = null!;
        public int Position { get; set; }
        public bool IsCorrect { get; set; }

    }
}
