"use strict";

{
  const token = document.querySelector("main").dataset.token;
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const input = document.querySelector('[name="title"]');

  input.focus(); //画面更新時にformにfocus()メソッドを実行し、focusが当たるようにする。

  const addTodo = function (id, titleValue) {
    //DOM操作で作成したいtodoの要素は下記の通り
    //<li data-id="">
    //<input type="checkbox">
    //<span></span>
    //<span class="delete" >x</span>
    //</li>

    //要素の生成
    const li = document.createElement("li");
    li.dataset.id = id;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const title = document.createElement("span");
    title.textContent = titleValue;
    const deleteSpan = document.createElement("span");
    deleteSpan.textContent = "x";
    deleteSpan.classList.add("delete");
    //要素を組み立てる
    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(deleteSpan);
    //ulの最初の子要素として追加する。
    const ul = document.querySelector("ul");
    ul.insertBefore(li, ul.firstChild);
  };

  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = input.value;//todoに追加する値をfetchするより先に取得しておく（非同期処理の円滑化）
    const url = "?action=add"; //fetchするデータを定義
    const option = {
      method: "POST",
      body: new URLSearchParams({
        title: title,
        token: token,
      }),
    };
    fetch(url, option)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.id);
        addTodo(json.id, title);
      }); //JSのfetch()メソッドを使用。php側でidの送信を終えた後、生成したidを取得する。
    input.value = "";
    input.focus();
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const url = "?action=toggle"; //fetchするデータを定義
      const option = {
        method: "POST",
        body: new URLSearchParams({
          id: checkbox.parentNode.dataset.id,
          token: token,
        }),
      }; //fetchデータを作成、post形式でidとtokenを送信しているため、内容をオブジェクト形式で渡す。
      fetch(url, option); //JSのfetch()メソッドを使用。
    });
  });

  const deletes = document.querySelectorAll(".delete");
  deletes.forEach((span) => {
    span.addEventListener("click", () => {
      if (!confirm("Are You Sure ?")) {
        return;
      }
      const url = "?action=delete";
      const option = {
        method: "POST",
        body: new URLSearchParams({
          id: span.parentNode.dataset.id,
          token: token,
        }),
      };
      fetch(url, option);
      span.parentNode.remove();
    });
  });

  const purge = document.querySelector(".purge");
  purge.addEventListener("click", () => {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    const url = "?action=purge";
    const option = {
      method: "POST",
      body: new URLSearchParams({
        token: token,
      }),
    };
    fetch(url, option);
    const lis = document.querySelectorAll("li");
    lis.forEach((li) => {
      if (li.children[0].checked) {
        li.remove();
      }
    });
  });
}
