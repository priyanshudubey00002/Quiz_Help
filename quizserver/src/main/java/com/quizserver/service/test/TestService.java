package com.quizserver.service.test;

import com.quizserver.DTO.*;
import com.quizserver.entities.Test;

import java.util.List;

public interface TestService {

    TestDTO createTest(TestDTO dto);
    QuestionDTO addQuestionInTest(QuestionDTO dto);
    List<TestDTO> getAllTests();

    TestDetailsDTO getAllQuestionsByTest(Long id);

    TestResultDTO submitTest(SubmitTestDTO request);

    List<TestResultDTO> getAllTestResults();

    List<TestResultDTO> getAllTestResultsOfUser(Long userId);
}
