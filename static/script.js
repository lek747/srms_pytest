document.addEventListener('DOMContentLoaded', function () {
  // HTML 요소 참조
  const codeElement = document.getElementById('python-code');
  const studentInput = document.getElementById('student-answer');
  const checkButton = document.getElementById('check-answer');
  const resultMessage = document.getElementById('result-message');
  const correctOutput = document.getElementById('correct-output');

  let correctAnswer = '';

  // 1. 문제 받아오기
  fetch('/get_question')
    .then(response => response.json())
    .then(data => {
      codeElement.textContent = data.code;
      correctAnswer = data.output.trim();  // 줄바꿈 포함 정답 저장
    })
    .catch(error => {
      codeElement.textContent = "문제를 불러오지 못했습니다.";
      console.error('문제 로드 실패:', error);
    });

  // 2. 정답 확인 버튼 클릭 시
  checkButton.addEventListener('click', function () {
    const userAnswer = studentInput.value.trim();

    if (userAnswer === '') {
      resultMessage.textContent = '❗ 예상 출력을 입력해주세요.';
      resultMessage.style.color = '#e74c3c';
      correctOutput.textContent = '';
      return;
    }

    if (userAnswer === correctAnswer) {
      resultMessage.textContent = '✅ 정답입니다! 잘했어요!';
      resultMessage.style.color = '#27ae60';
    } else {
      resultMessage.textContent = '❌ 틀렸습니다. 다시 생각해보세요!';
      resultMessage.style.color = '#c0392b';
    }

    correctOutput.textContent = correctAnswer;
  });
});
