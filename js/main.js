'use scrict';
{
  function setWord(){
    // 配列からランダムに選んで代入
    //spliceは一個ずつ消していくので、出題の重複がなくなる
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];

    // ターゲットに表示
    target.textContent = word;
    // locのリセット
    loc = 0;
  }

  const words = [
    'red',
    'blue',
    'pink',
    'green',
    'yellow',
    'black',
    'white',
    'orange',
    'gold',
    'silver',
  ]
  let word;
  // 何文字目を打っているかの確認変数
  let loc = 0;
  // ゲームを開始した時間
  let startTime;
  //プレイ中かどうか
  let isPlaying = false;
  // タイプミスのカウント
  let missTimes = 0;
  // 出題数
  let questions = 0;
  
  const target = document.getElementById('target');
  const start = document.getElementById('start');
  const reset = document.getElementById('reset');

  start.addEventListener('click', ()=>{
    if(isPlaying){
      return;
    }
    isPlaying = true;
    target.classList.add('no-cursor');
    start.classList.add('none');
    reset.classList.remove('none');
    startTime = Date.now();
    setWord();
  })
  

  document.addEventListener('keydown', e => {
    //打ったキーが間違っていたらそれ以降の処理は行わない
    if(e.key !== word[loc]){
      missTimes++;
      return;
    }
    // キーが合っていた場合
    // if(e.key === word[loc])の条件分岐は省略できる
    loc++;
    //loc回ぶん '_'リピートし、loc番目以降の文字を取り出す
    target.textContent = '_'.repeat(loc) + word.substring(loc);
    

    // 次の文字のセット
    if(loc === word.length){
      questions++;
      // 単語を5問出題し切ったら
      if(questions === 5){
        // 時間の算出
        const elapseTime = ((Date.now() - startTime)/1000).toFixed(2);
        const result = document.getElementById('result');
        // 時間の表示
        result.textContent = `Finised! ${elapseTime} seconds!`;
        // ミスの回数の表示
        const miss = document.getElementById('miss');
        miss.textContent = `miss: ${missTimes} times.`;
        //ボタンの文字の書き換え
        reset.textContent = 'One more';

        return;
      }

      setWord();
    }
  });
}