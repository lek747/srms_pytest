from flask import Flask, render_template, jsonify
import random
import io
import contextlib

app = Flask(__name__)

# 문제 리스트 (파이썬 코드와 출력 결과를 함께 정의)
questions = [
    {
        "code": "print('Hello')",
        "output": "Hello"
    },
    {
        "code": "print(3 + 5)",
        "output": "8"
    },
    {
        "code": "for i in range(3):\n    print(i)",
        "output": "0\n1\n2"
    },
    {
        "code": "a = 'Python'\nprint(a[0])",
        "output": "P"
    },
    {
        "code": "print('A' * 3)",
        "output": "AAA"
    }
    # 필요 시 더 추가 가능
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_question')
def get_question():
    # 무작위 문제 선택
    question = random.choice(questions)
    return jsonify({
        "code": question["code"],
        "output": question["output"]
    })

if __name__ == '__main__':
    app.run(debug=True)
