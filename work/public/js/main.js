"use strict";

{
  console.log("こんにちは！");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const url = "?action=toggle"; //fetchするデータを定義
      const option = {
        method: "POST",
        body: new URLSearchParams({
          id: checkbox.dataset.id,
          token: checkbox.dataset.token,
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
      span.parentNode.submit();
    });
  });
  const purge = document.querySelector(".purge");
  purge.addEventListener("click", () => {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    purge.parentNode.submit();
  });
}
