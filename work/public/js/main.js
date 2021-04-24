"use strict";

{
  console.log("こんにちは！");
  const token = document.querySelector("main").dataset.token;
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

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
