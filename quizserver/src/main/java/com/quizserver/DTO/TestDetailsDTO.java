package com.quizserver.DTO;

import lombok.Data;

import java.util.List;

@Data
public class TestDetailsDTO {
    private  TestDTO testDTO;
    private List<QuestionDTO> questions;

}
