export const resultList = {
  0: { en: 'Pending', cn: '系统忙，你的答案在排队等待', type: 'info' },
  1: { en: 'Pending Rejudge', cn: '因为数据更新或其他原因，系统将重新判你的答案', type: 'info' },
  2: { en: 'Compiling', cn: '正在编译', type: 'info' },
  3: { en: 'Running & Judging', cn: '正在运行和判断', type: 'info' },
  4: { en: 'Accepted', cn: '程序通过!', type: 'success' },
  5: { en: 'Presentation Error', cn: '答案基本正确，但是格式不对', type: 'warning' },
  6: { en: 'Wrong Answer', cn: '答案不对，仅仅通过样例数据的测试并不一定是正确答案，一定还有你没想到的地方', type: 'danger' },
  7: { en: 'Time Limit Exceeded', cn: '运行超出时间限制，检查下是否有死循环，或者应该有更快的计算方法', type: 'danger' },
  8: { en: 'Memory Limit Exceeded', cn: '超出内存限制，数据可能需要压缩，检查内存是否有泄露', type: 'danger' },
  9: { en: 'Output Limit Exceeded', cn: '输出超过限制，你的输出比正确答案长了两倍', type: 'danger' },
  10: { en: 'Runtime Error', cn: '运行时错误，非法的内存访问，数组越界，指针漂移，调用禁用的系统函数。请点击后获得详细输出', type: 'danger' },
  11: { en: 'Compile Error', cn: '编译错误，请点击后获得编译器的详细输出', type: 'danger' },
};

export const language = {
  0: 'C',
  1: 'C++',
  3: 'JAVA',
};
